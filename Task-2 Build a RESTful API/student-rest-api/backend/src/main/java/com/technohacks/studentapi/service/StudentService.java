package com.technohacks.studentapi.service;

import com.technohacks.studentapi.exception.ResourceNotFoundException;
import com.technohacks.studentapi.model.Student;
import com.technohacks.studentapi.repository.StudentRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentService {

  private final StudentRepository studentRepository;

  public List<Student> getAllStudents() {
      return studentRepository.findAll();
  }

  public Student getStudentById(Long id) {
    return studentRepository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
  }

  public Student saveStudent(Student student) {
      java.util.Optional<Student> existingStudentOpt = studentRepository.findByEmail(student.getEmail());
      if (existingStudentOpt.isPresent()) {
          Student existingStudent = existingStudentOpt.get();
          String existingCoursesStr = existingStudent.getCourse();
          
          java.util.List<String> currentCourses = new java.util.ArrayList<>();
          if (existingCoursesStr != null && !existingCoursesStr.trim().isEmpty()) {
              for (String c : existingCoursesStr.split(",")) {
                  currentCourses.add(c.trim().toLowerCase());
              }
          }
          
          String newCourse = student.getCourse().trim();
          if (!currentCourses.contains(newCourse.toLowerCase())) {
              existingStudent.setCourse(existingCoursesStr + ", " + newCourse);
          }
          return studentRepository.save(existingStudent);
      }
      return studentRepository.save(student);
  }

  public Student updateStudent(Long id, Student studentDetails) {
    Student student =
        studentRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

    student.setName(studentDetails.getName());
    student.setEmail(studentDetails.getEmail());
    student.setCourse(studentDetails.getCourse());

    return studentRepository.save(student);
  }

  public void deleteStudent(Long id) {
    Student student =
        studentRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    studentRepository.delete(student);
  }
}
