package com.vskconnect.service;

import com.vskconnect.dto.ApiDto.MessageDto;
import com.vskconnect.dto.ApiDto.RoomDto;
import com.vskconnect.dto.ApiDto.UserDto;
import com.vskconnect.entity.Message;
import com.vskconnect.entity.Room;
import com.vskconnect.entity.User;
import com.vskconnect.repository.MessageRepository;
import com.vskconnect.repository.RoomRepository;
import com.vskconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final RoomRepository roomRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    // --- USER METHODS ---

    public List<UserDto> searchUsers(String query) {
        return userRepository.findByUsernameContainingIgnoreCase(query)
                .stream().map(this::mapUserToDTO).collect(Collectors.toList());
    }

    public void updateUserStatus(String username, boolean isOnline) {
        userRepository.findByUsername(username).ifPresent(user -> {
            user.setStatus(isOnline ? com.vskconnect.entity.UserStatus.ONLINE : com.vskconnect.entity.UserStatus.OFFLINE);
            userRepository.save(user);
        });
    }

    public UserDto getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapUserToDTO(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(u -> !u.getUsername().equals("ai_agent"))
                .map(this::mapUserToDTO)
                .collect(Collectors.toList());
    }

    private UserDto mapUserToDTO(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .status(user.getStatus().name())
                .build();
    }

    // --- ROOM METHODS ---

    public List<RoomDto> getUserRooms(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return roomRepository.findByUsersId(user.getId())
                .stream().map(this::mapRoomToDTO).collect(Collectors.toList());
    }

    public List<RoomDto> getAllRooms(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return roomRepository.findAll().stream()
                .filter(room -> room.isGroup() || room.getUsers().stream().anyMatch(u -> u.getId().equals(user.getId())))
                .map(this::mapRoomToDTO)
                .collect(Collectors.toList());
    }

    public RoomDto createRoom(String name, boolean isGroup, List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);
        Room room = Room.builder()
                .name(name)
                .isGroup(isGroup)
                .users(users)
                .createdAt(LocalDateTime.now())
                .build();
        return mapRoomToDTO(roomRepository.save(room));
    }

    public RoomDto getRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return mapRoomToDTO(room);
    }
    
    public RoomDto getOrCreatePrivateRoom(Long user1Id, Long user2Id) {
        List<Room> rooms = roomRepository.findByUsersId(user1Id);
        for (Room room : rooms) {
            if (!room.isGroup() && room.getUsers().size() == 2) {
                boolean hasUser2 = room.getUsers().stream().anyMatch(u -> u.getId().equals(user2Id));
                if (hasUser2) return mapRoomToDTO(room);
            }
        }
        return createRoom(null, false, List.of(user1Id, user2Id));
    }

    public RoomDto getOrCreateAIRoom(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        User aiUser = userRepository.findByUsername("ai_agent").orElseGet(() -> {
            User newUser = User.builder()
                    .username("ai_agent")
                    .email("ai@vskconnect.com")
                    .password("auto-generated-password")
                    .status(com.vskconnect.entity.UserStatus.ONLINE)
                    .build();
            return userRepository.save(newUser);
        });

        List<Room> rooms = roomRepository.findByUsersId(user.getId());
        for (Room room : rooms) {
            if (!room.isGroup() && room.getUsers().size() == 2) {
                boolean hasAI = room.getUsers().stream().anyMatch(u -> u.getId().equals(aiUser.getId()));
                if (hasAI) return mapRoomToDTO(room);
            }
        }
        
        Room room = Room.builder()
                .name("AI Assistant - " + username)
                .isGroup(false)
                .users(new java.util.ArrayList<>(List.of(user, aiUser)))
                .createdAt(LocalDateTime.now())
                .build();
        return mapRoomToDTO(roomRepository.save(room));
    }

    private RoomDto mapRoomToDTO(Room room) {
        return RoomDto.builder()
                .id(room.getId())
                .name(room.getName())
                .isGroup(room.isGroup())
                .users(room.getUsers().stream().map(this::mapUserToDTO).collect(Collectors.toList()))
                .build();
    }

    public RoomDto updateRoom(Long roomId, String name, String description) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        room.setName(name);
        // Room entity doesn't have a description field, but if it did, we'd set it here.
        // For now, just update the name.
        return mapRoomToDTO(roomRepository.save(room));
    }

    @org.springframework.transaction.annotation.Transactional
    public void deleteRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        messageRepository.deleteByRoomId(roomId);
        roomRepository.delete(room);
    }

    // --- MESSAGE METHODS ---

    public List<MessageDto> getRoomMessages(Long roomId) {
        return messageRepository.findByRoomIdOrderByTimestampAsc(roomId)
                .stream().map(this::mapMessageToDTO).collect(Collectors.toList());
    }

    public MessageDto saveMessage(MessageDto dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        User sender = userRepository.findById(dto.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Message message = Message.builder()
                .roomId(room.getId())
                .senderId(sender.getId())
                .senderName(sender.getUsername())
                .message(dto.getMessage())
                .timestamp(LocalDateTime.now())
                .build();

        return mapMessageToDTO(messageRepository.save(message));
    }

    private MessageDto mapMessageToDTO(Message message) {
        return MessageDto.builder()
                .id(message.getId())
                .roomId(message.getRoomId())
                .senderId(message.getSenderId())
                .senderName(message.getSenderName())
                .message(message.getMessage())
                .timestamp(message.getTimestamp().toString())
                .build();
    }

    public void clearAllChats() {
        messageRepository.deleteAll();
        roomRepository.deleteAll();
    }
}
