import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <a className="navbar-brand" href="/">Student Management System</a>
                <ul className="navbar-nav mb-lg-0">
                    <li className="nav-item">
                        <Link className='btn btn-outline-light' to="/addstudent">Add Student</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
