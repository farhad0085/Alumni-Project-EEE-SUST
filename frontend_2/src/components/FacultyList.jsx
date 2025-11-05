import React from 'react';
import { facultyData } from '../data';
import styles from '../styles/scss/Faculty.module.scss';

const FacultyList = () => (
    <div className={styles.facultyGrid}>
        {facultyData.map((member) => (
            <div key={member.id} className={styles.facultyCard}>
                <img src={member.imageUrl} alt={`${member.name}`} />
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                <a href="#">View Profile</a>
            </div>
        ))}
    </div>
);

export default FacultyList;
