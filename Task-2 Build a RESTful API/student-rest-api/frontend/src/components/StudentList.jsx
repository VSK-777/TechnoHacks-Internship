import React, { useState } from "react";
import StudentService from "../services/studentService";
import ConfirmationModal from "./ConfirmationModal";

const StudentList = ({ students, fetchStudents, editStudent, showToast }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (id) => {
    setStudentToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await StudentService.deleteStudent(studentToDelete);
      showToast("Student Deleted Successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student", error);
      alert("Could not delete student.");
    } finally {
      setIsDeleting(false);
      setModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search-container" style={{ position: "relative" }}>
        <span className="input-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search students by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <span>🎓</span>
                    {searchQuery ? "No matching students found." : "No students yet. Add your first student to get started."}
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-warning"
                        onClick={() => editStudent(student)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => confirmDelete(student.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message={isDeleting ? "Deleting..." : "This action cannot be undone. Do you really want to remove this student?"}
      />
    </div>
  );
};

export default StudentList;
