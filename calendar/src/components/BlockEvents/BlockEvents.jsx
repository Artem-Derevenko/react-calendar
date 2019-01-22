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
    onEditEvent = (data) => {
        this.props.onEditEvent(data);
    }

    onDeleteEvent = (key) => {
        this.props.onDeleteEvent(key);
    }

    sortEventByDate = (arr) => {
        let n = arr.length;
        for (let i = 0; i < n-1; i++) {
            for (let j = 0; j < n-1-i; j++) {
                if (new Date(arr[j+1].date) < new Date(arr[j].date)) {
                    let t = arr[j+1]; arr[j+1] = arr[j]; arr[j] = t;
                }
            }
        }
        return arr;
    }

    render() {
        const { eventList } = this.props;
        const { onEditEvent, onDeleteEvent, sortEventByDate  } = this;
        const sortListByDate = sortEventByDate(eventList);

        return (
            <div className='block-events'>
                <div className="event-header">
                    <h4>Расписание событий</h4>
                </div>
                <div className='event-list'>
                    {
                        sortListByDate && sortListByDate.length > 0 &&

                        sortListByDate.map( (item) => {
                            return <div key={ids.generate()} className='event-item'>
                                <p className='date'>
                                    <span>{`${new Date(item.date).getDate()} ${MONTH[new Date(item.date).getMonth()]} ${new Date(item.date).getFullYear()}, ${item.time}`}</span>
                                    <span className='event-type'>{item.eventTypeName}</span>
                                    <span className='icon-button'>
                                        <FaPen
                                            className="icon"
                                            onClick={() => onEditEvent(item)}
                                        />
                                        <FaTrash
                                            className="icon"
                                            onClick={() => onDeleteEvent(item['.key'])}
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