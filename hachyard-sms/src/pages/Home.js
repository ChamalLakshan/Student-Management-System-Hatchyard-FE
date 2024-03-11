import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap";

export default function Home() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const response = await axios.get("http://localhost:8081/sms/students");
        setStudents(response.data);
        setFilteredStudents(response.data);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = students.filter(student =>
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
        setFilteredStudents(filtered);
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:8081/sms/student/${id}`);
        loadStudents();
        window.alert("Student Deleted Successfully");
    }

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="py-4"></div>
            <Container>
                <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    onChange={handleSearch}
                    placeholder="Search by first name, last name, email, etc."
                />
            </Container>

            <table className="table border shadow text-center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>
                                <Link className="btn btn-outline-primary mx-2" to={`/editstudent/${student.id}`}>Edit</Link>
                                <button className="btn btn-danger mx-2" onClick={() => deleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="page-link">{number}</button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
