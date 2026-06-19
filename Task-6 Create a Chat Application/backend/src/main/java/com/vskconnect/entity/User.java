package com.vskconnect.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private UserStatus status = com.vskconnect.entity.UserStatus.ONLINE;

    private LocalDateTime createdAt;

    private LocalDateTime lastSeen;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (avatarUrl == null) {
            avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + username;
        }
    }
}
