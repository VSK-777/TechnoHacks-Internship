package com.vskconnect.controller;

import com.vskconnect.ai.AIChatService;
import com.vskconnect.dto.ApiDto.MessageDto;
import com.vskconnect.dto.ApiDto.RoomDto;
import com.vskconnect.dto.ApiDto.UserDto;
import com.vskconnect.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final AIChatService aiChatService;

    // --- MESSAGE ENDPOINTS ---
    
    @GetMapping("/api/messages/room/{roomId}")
    public ResponseEntity<List<MessageDto>> getRoomMessages(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.getRoomMessages(roomId));
    }

    // --- ROOM ENDPOINTS ---

    @GetMapping("/api/rooms/user/{username}")
    public ResponseEntity<List<RoomDto>> getUserRooms(@PathVariable String username) {
        return ResponseEntity.ok(chatService.getUserRooms(username));
    }

    @PostMapping("/api/rooms/private")
    public ResponseEntity<RoomDto> getOrCreatePrivateRoom(@RequestBody Map<String, Long> payload) {
        Long user1Id = payload.get("user1Id");
        Long user2Id = payload.get("user2Id");
        return ResponseEntity.ok(chatService.getOrCreatePrivateRoom(user1Id, user2Id));
    }

    @GetMapping("/api/rooms/ai")
    public ResponseEntity<RoomDto> getOrCreateAIRoom(java.security.Principal principal) {
        return ResponseEntity.ok(chatService.getOrCreateAIRoom(principal.getName()));
    }

    @PostMapping("/api/rooms/group")
    public ResponseEntity<RoomDto> createGroupRoom(@RequestBody Map<String, Object> payload) {
        String name = (String) payload.get("name");
        List<Integer> userIdsInt = (List<Integer>) payload.get("userIds");
        List<Long> userIds = userIdsInt != null ? userIdsInt.stream().map(Integer::longValue).toList() : List.of();
        return ResponseEntity.ok(chatService.createRoom(name, true, userIds));
    }

    @PostMapping("/api/rooms")
    public ResponseEntity<RoomDto> createRoom(@RequestBody Map<String, Object> payload, java.security.Principal principal) {
        String name = (String) payload.get("name");
        String description = (String) payload.get("description");
        Boolean isPrivate = (Boolean) payload.get("isPrivate");
        
        UserDto currentUser = chatService.getUserProfile(principal.getName());
        
        boolean isGroup = (isPrivate == null || !isPrivate);
        return ResponseEntity.ok(chatService.createRoom(name, isGroup, List.of(currentUser.getId())));
    }

    @GetMapping("/api/rooms")
    public ResponseEntity<List<RoomDto>> getAllRooms(java.security.Principal principal) {
        return ResponseEntity.ok(chatService.getAllRooms(principal.getName()));
    }

    @PutMapping("/api/rooms/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String description = payload.get("description");
        return ResponseEntity.ok(chatService.updateRoom(id, name, description));
    }

    @DeleteMapping("/api/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        chatService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/api/rooms/clear-all")
    public ResponseEntity<Void> clearAllChats() {
        chatService.clearAllChats();
        return ResponseEntity.noContent().build();
    }

    // --- USER ENDPOINTS ---

    @GetMapping("/api/users/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String query) {
        return ResponseEntity.ok(chatService.searchUsers(query));
    }

    @GetMapping("/api/users/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(chatService.getAllUsers());
    }

    @GetMapping("/api/users/{username}")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable String username) {
        return ResponseEntity.ok(chatService.getUserProfile(username));
    }

    // --- AI ENDPOINTS ---

    @PostMapping("/api/ai/chat")
    public ResponseEntity<String> chatWithAI(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        String username = payload.get("username");
        String response = aiChatService.getAIResponse(message, username);
        return ResponseEntity.ok(response);
    }
}
