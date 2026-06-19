package com.vskconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class ApiDto {

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class AuthRequest {
        private String username;
        private String email;
        private String password;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private Long userId;
        private String username;
        private String email;
        private String avatarUrl;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class UserDto {
        private Long id;
        private String username;
        private String email;
        private String name;
        private String avatarUrl;
        private String status;
        private LocalDateTime lastSeen;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class UserPreferenceDto {
        private Long id;
        private Long userId;
        private String theme;
        private boolean notificationsEnabled;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CreateRoomRequest {
        private String name;
        private String description;
        private boolean isPrivate;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RoomDto {
        private Long id;
        private String name;
        private String description;
        private boolean isPrivate;
        private boolean isGroup;
        private Long ownerId;
        private List<UserDto> users;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class MessageDto {
        private Long id;
        private String content;
        private String message;
        private Long senderId;
        private String senderUsername;
        private String senderName;
        private Long roomId;
        private String timestamp;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class AIRequest {
        private String prompt;
        private Long roomId;
        private String context;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class AIResponse {
        private String response;
        private String modelUsed;
        private long generationTimeMs;
    }
}
