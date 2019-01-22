import React, { Component } from 'react';
import '../../css/events.css';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import ids from "shortid";

const MONTH = ["января","февраля","марта",
    "апреля","мая","июня",
    "июля","августа","сентября",
    "октября","ноября","декабря"];

class BlockEvents extends Component {
    onEditEvent = () => {

    }

    onDeleteEvent = () => {

    }

        render() {
        const { eventList } = this.props;
            const { onEditEvent, onDeleteEvent  } = this;
        return (
            <div className='block-events'>
                <div className="event-header">
                    <h4>Расписание событий</h4>
                </div>
                <div className='event-list'>
                    {
                        eventList && eventList.length > 0 &&

                        eventList.map( (item) => {
                            return <div key={ids.generate()} className='event-item'>
                                <p className='date'>
                                    <span>{`${new Date(item.date).getDate()} ${MONTH[new Date(item.date).getMonth()]} ${new Date(item.date).getFullYear()}, ${item.time}`}</span>
                                    <span className='event-type'>{item.eventTypeName}</span>
                                    <span className='icon-button'>
                                        <FaPen
                                            className="icon"
                                            onClick = {onEditEvent}
                                        />
                                        <FaTrash
                                            className="icon"
                                            onClick = {onDeleteEvent}
                                        />
                                    </span>
                                </p>
                                <p className='text'>{item.text}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default BlockEvents;