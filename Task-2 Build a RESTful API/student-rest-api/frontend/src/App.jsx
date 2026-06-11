import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import StudentService from "./services/studentService";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStudents = async () => {
    try {
      const response = await StudentService.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const editStudent = (student) => setCurrentStudent(student);
  const clearEditing = () => setCurrentStudent(null);

  // Statistics
  const totalStudents = students.length;
  const uniqueCourses = new Set(
    students.flatMap(s => s.course.split(',').map(c => c.trim().toLowerCase()).filter(c => c))
  ).size;
  const activeRecords = students.length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🎓 Student Management Dashboard</h1>
        <p>Manage student records efficiently</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-value">{totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Courses</h3>
          <div className="stat-value">{uniqueCourses}</div>
        </div>
        <div className="stat-card">
          <h3>Active Records</h3>
          <div className="stat-value">{activeRecords}</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="card">
          <h2 className="card-header">{currentStudent ? "✏️ Edit Student" : "➕ Add Student"}</h2>
          <StudentForm
            fetchStudents={fetchStudents}
            currentStudent={currentStudent}
            clearEditing={clearEditing}
            showToast={showToast}
          />
        </div>
        
        <div className="card">
          <h2 className="card-header">📋 Directory</h2>
          <StudentList
            students={students}
            fetchStudents={fetchStudents}
            editStudent={editStudent}
            showToast={showToast}
          />
        </div>
      </div>

      {toast && (
        <div className="toast-container">
          <div className="toast">✅ {toast}</div>
        </div>
      )}
    </div>
  );
}

export default App;
