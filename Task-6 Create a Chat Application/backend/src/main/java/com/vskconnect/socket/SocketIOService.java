package com.vskconnect.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.vskconnect.ai.AIChatService;
import com.vskconnect.dto.ApiDto.MessageDto;
import com.vskconnect.entity.User;
import com.vskconnect.repository.UserRepository;
import com.vskconnect.security.JwtUtil;
import com.vskconnect.service.ChatService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "socketio.enabled", havingValue = "true", matchIfMissing = true)
public class SocketIOService {

    private final SocketIOServer server;
    private final ChatService chatService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AIChatService aiChatService;

    private final Map<String, String> clientUserMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void startServer() {
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("join_room", String.class, onJoinRoom());
        server.addEventListener("leave_room", String.class, onLeaveRoom());
        server.addEventListener("send_message", MessageDto.class, onSendMessage());

        server.start();
    }

    @PreDestroy
    public void stopServer() {
        server.stop();
    }

    private ConnectListener onConnected() {
        return client -> {
            String token = client.getHandshakeData().getSingleUrlParam("token");
            if (token != null && !token.isEmpty()) {
                try {
                    String username = jwtUtil.extractUsername(token);
                    clientUserMap.put(client.getSessionId().toString(), username);
                    chatService.updateUserStatus(username, true);
                    server.getBroadcastOperations().sendEvent("user_status", Map.of("username", username, "isOnline", true));
                } catch (Exception e) {
                    client.disconnect();
                }
            }
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            String username = clientUserMap.remove(client.getSessionId().toString());
            if (username != null) {
                chatService.updateUserStatus(username, false);
                server.getBroadcastOperations().sendEvent("user_status", Map.of("username", username, "isOnline", false));
            }
        };
    }

    private DataListener<String> onJoinRoom() {
        return (client, room, ackSender) -> {
            client.joinRoom(room);
        };
    }

    private DataListener<String> onLeaveRoom() {
        return (client, room, ackSender) -> {
            client.leaveRoom(room);
        };
    }

    private DataListener<MessageDto> onSendMessage() {
        return (client, data, ackSender) -> {
            MessageDto savedMessage = chatService.saveMessage(data);
            server.getRoomOperations(data.getRoomId().toString()).sendEvent("receive_message", savedMessage);

            // Fetch room to determine if it's a personal (Direct Message) room
            com.vskconnect.dto.ApiDto.RoomDto room = chatService.getRoom(data.getRoomId());

            // If it's a personal room (isGroup == false) and sender is not AI, AI should reply
            if (!room.isGroup()) {
                if (!"ai_agent".equals(savedMessage.getSenderName())) {
                    handleAIAgentMention(savedMessage);
                }
            }
        };
    }

    private void handleAIAgentMention(MessageDto userMessage) {
        new Thread(() -> {
            try {
                String aiResponse = aiChatService.getAIResponse(userMessage.getMessage(), userMessage.getSenderName());
                User aiUser = userRepository.findByUsername("ai_agent").orElseGet(() -> {
                    User newUser = User.builder()
                            .username("ai_agent")
                            .email("ai@vskconnect.com")
                            .password("auto-generated-password")
                            .status(com.vskconnect.entity.UserStatus.ONLINE)
                            .build();
                    return userRepository.save(newUser);
                });

                MessageDto aiMessageDto = MessageDto.builder()
                        .roomId(userMessage.getRoomId())
                        .senderId(aiUser.getId())
                        .senderName("ai_agent")
                        .message(aiResponse)
                        .createdAt(LocalDateTime.now())
                        .build();

                MessageDto savedAiMessageDto = chatService.saveMessage(aiMessageDto);

                server.getRoomOperations(userMessage.getRoomId().toString())
                        .sendEvent("receive_message", savedAiMessageDto);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
}
