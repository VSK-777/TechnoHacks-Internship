package com.technohacks.studentapi.repository;

import com.technohacks.studentapi.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
  java.util.Optional<Student> findByEmail(String email);
}
