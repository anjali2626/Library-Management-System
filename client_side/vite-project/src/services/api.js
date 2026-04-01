import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

export const getBooks = () => API.get("/books");
export const addBook = (data) => API.post("/books", data);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export const reserveBook = (data) => API.post("/reserved-books", data);
export const getReservedBooks = () => API.get("/reserved-books");

export const getStudents = () => API.get("/students");
export const addStudent = (data) => API.post("/students", data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export default API;
