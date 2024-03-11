import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AddStudent = () => {
    let navigate = useNavigate()

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const { firstName, lastName, email } = student;

    const onInputChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Check if first name or last name or email is empty
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim()==="") {
            setErrorMessage("First name,last name and email are required.");
            return;
        }

        // If not empty, clear any existing error message
        setErrorMessage("Can not create Student");

        try {
            await axios.post("http://localhost:8081/sms/student", student);
            navigate("/");
        } catch (error) {
            console.error("Error submitting student data:", error);
        }
    }

    return (
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Register Student</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Form onSubmit={onSubmit}>
                <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control name='firstName' placeholder="First Name" value={firstName} onChange={onInputChange} />
                </FloatingLabel>
                <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control name='lastName' placeholder="Last Name" value={lastName} onChange={onInputChange} />
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3">
                    <Form.Control name='email' type="email" placeholder="Email" value={email} onChange={onInputChange} />
                </FloatingLabel>
                <Button className='btn btn-primary' type="submit">
                    Submit
                </Button>
                <Link className='btn btn-danger mx-2' to={"/"}>
                    Cancel
                </Link>
            </Form>
        </div>
    )
}

export default AddStudent;
