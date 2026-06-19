package com.vskconnect.repository;

import com.vskconnect.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByName(String name);

    List<Room> findByIsDefaultTrue();

    List<Room> findAllByOrderByCreatedAtAsc();

    List<Room> findByUsersId(Long id);
}
