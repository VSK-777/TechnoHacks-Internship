import React, { useState, useEffect } from "react";
import StudentService from "../services/studentService";

const StudentForm = ({ fetchStudents, currentStudent, clearEditing, showToast }) => {
  const [student, setStudent] = useState({ name: "", email: "", course: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentStudent) {
      setStudent(currentStudent);
    } else {
      setStudent({ name: "", email: "", course: "" });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (student.id) {
        await StudentService.updateStudent(student.id, student);
        showToast("Student Updated Successfully");
        clearEditing();
      } else {
        await StudentService.createStudent(student);
        showToast("Student Added Successfully");
      }
      setStudent({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student", error);
      const errMsg = error.response?.data?.error || "Error saving student.";
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <span className="input-icon">👤</span>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder=" "
          value={student.name}
          onChange={handleChange}
          required
        />
        <label className="form-label">Student Name</label>
      </div>

      <div className="form-group">
        <span className="input-icon">✉️</span>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder=" "
          value={student.email}
          onChange={handleChange}
          required
        />
        <label className="form-label">Email Address</label>
      </div>

      <div className="form-group">
        <span className="input-icon">📚</span>
        <input
          type="text"
          className="form-control"
          name="course"
          placeholder=" "
          value={student.course}
          onChange={handleChange}
          required
        />
        <label className="form-label">Course Name</label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (student.id ? "Updating..." : "Saving...") : (student.id ? "Update Student" : "Save Student")}
      </button>

      {student.id && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={clearEditing}
          style={{ marginTop: "10px" }}
          disabled={isLoading}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;
