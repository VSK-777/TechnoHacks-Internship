package com.vskconnect.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages", indexes = {
    @Index(name = "idx_message_room_id", columnList = "roomId")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;

    private String senderName;

    private Long roomId;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private MessageType messageType = MessageType.TEXT;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private MessageStatus status = MessageStatus.DELIVERED;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
