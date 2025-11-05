import React from 'react';
import { labsData } from '../data';
import styles from '../styles/scss/List.module.scss';

const Labs = () => {
    return (
        <div>
            <h1 className="page-title">Labs & Projects</h1>
            <div className={styles.listView}>
                {labsData.map(lab => (
                    <div key={lab.id} className={styles.listItem}>
                        <h3>{lab.title}</h3>
                        <div className={styles.listItemMeta}>
                            <span>Supervisor: {lab.supervisor}</span>
                        </div>
                        <p>{lab.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Labs;
