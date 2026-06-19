package com.vskconnect.repository;

import com.vskconnect.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findByRoomIdOrderByTimestampDesc(Long roomId, Pageable pageable);

    List<Message> findByRoomIdOrderByTimestampAsc(Long roomId);

    List<Message> findByRoomIdAndMessageContainingIgnoreCase(Long roomId, String keyword);

    void deleteByRoomId(Long roomId);
}
