package com.vskconnect.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    private String createdBy;

    private LocalDateTime createdAt;

    @Builder.Default
    private boolean isDefault = false;

    @Builder.Default
    private boolean isGroup = false;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "room_users",
        joinColumns = @JoinColumn(name = "room_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private java.util.List<User> users;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
