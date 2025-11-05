import React from 'react';
import { eventsData } from '../data';
import styles from '../styles/scss/List.module.scss';

const Events = () => {
    return (
        <div>
            <h1 className="page-title">Events</h1>
            <div className={styles.listView}>
                {eventsData.map(event => (
                    <div key={event.id} className={styles.listItem}>
                        <h3>{event.title}</h3>
                        <div className={styles.listItemMeta}>
                            <span>Date: {event.date}</span> | <span>Location: {event.location}</span>
                        </div>
                        <p>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
