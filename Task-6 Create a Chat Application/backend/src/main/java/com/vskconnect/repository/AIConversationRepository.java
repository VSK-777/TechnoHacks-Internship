package com.vskconnect.repository;

import com.vskconnect.entity.AIConversation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AIConversationRepository extends JpaRepository<AIConversation, Long> {

    List<AIConversation> findByUserIdOrderByTimestampDesc(Long userId, Pageable pageable);

    List<AIConversation> findByUserIdAndConversationIdOrderByTimestampAsc(Long userId, String conversationId);

    long countByUserId(Long userId);
}
