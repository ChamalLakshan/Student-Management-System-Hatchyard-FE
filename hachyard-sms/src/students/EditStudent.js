import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export const EditStudent = () => {

    let navigate = useNavigate()
    const{id} =useParams()

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const { firstName,lastName,email } = student;

    const onInputChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    useEffect(()=>{
        loadStudent();
    },[])
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/sms/student/${id}`, student)
        navigate("/");
    };

    const loadStudent =async ()=>{
        const response =await axios.get(`http://localhost:8081/sms/student/${id}`)
        setStudent( response.data);
    }
    return (
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
       <h2 className='text-center m-4'>Edit Student</h2>
            <Form onSubmit={onSubmit}>
                <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control name='firstName' placeholder="First Name" value={firstName} onChange={(e) => onInputChange(e)}
                    />
                </FloatingLabel>
                <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control name='lastName' placeholder="Last Name" value={lastName} onChange={(e) => onInputChange(e)}
                    />
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3" >
                    <Form.Control name='email' type="email" placeholder="Email" value={email} onChange={(e) => onInputChange(e)}
                    />
                </FloatingLabel>
                <Button className='btn btn-primary' type="submit">
                    Update
                </Button>
                <Link className='btn btn-danger mx-2' to={"/"}>
                    Cancel
                </Link>

            </Form>

        </div>
    )
}
export default EditStudent;