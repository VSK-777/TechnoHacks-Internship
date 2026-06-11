import axios from "axios";

// Production Backend API URL
const API_URL = "https://technohacks-internship-production.up.railway.app/api/students";

class StudentService {
  getAllStudents() {
    return axios.get(API_URL);
  }

  createStudent(student) {
    return axios.post(API_URL, student);
  }

  getStudentById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updateStudent(id, student) {
    return axios.put(`${API_URL}/${id}`, student);
  }

  deleteStudent(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new StudentService();
