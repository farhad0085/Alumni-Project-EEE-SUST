import React from 'react';
import FacultyList from '../components/FacultyList';

const FacultyStaff = () => {
    return (
        <div>
            <h1 className="page-title">Our Faculty & Staff</h1>
            <p>Our department is proud to have a team of dedicated and experienced faculty members who are experts in their respective fields.</p>
            <br />
            <FacultyList />
        </div>
    );
};

export default FacultyStaff;
