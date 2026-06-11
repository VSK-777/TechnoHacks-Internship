package com.technohacks.studentapi.controller;

import com.technohacks.studentapi.model.Student;
import com.technohacks.studentapi.service.StudentService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

  private final StudentService studentService;

  @GetMapping
  public ResponseEntity<List<Student>> getAllStudents() {

    return ResponseEntity.ok(studentService.getAllStudents());

  }

  @PostMapping
  public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {

    return new ResponseEntity<>(studentService.saveStudent(student), HttpStatus.CREATED);

  }

  @GetMapping("/{id}")
  public ResponseEntity<Student> getStudentById(@PathVariable Long id) {

    return ResponseEntity.ok(studentService.getStudentById(id));

  }

  @PutMapping("/{id}")
  public ResponseEntity<Student> updateStudent(
      @PathVariable Long id, @Valid @RequestBody Student studentDetails) {
    return ResponseEntity.ok(studentService.updateStudent(id, studentDetails));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {

    studentService.deleteStudent(id);
    return ResponseEntity.noContent().build();
    
  }
}
