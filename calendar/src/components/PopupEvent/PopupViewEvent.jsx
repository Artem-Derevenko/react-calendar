import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import ids from 'shortid';
import '../../css/popupevent.css';

const MONTH = ["января","февраля","марта",
    "апреля","мая","июня",
    "июля","августа","сентября",
    "октября","ноября","декабря"];

class PopupViewEvent extends Component {
    onCloseEvent = () => {
        this.props.closeViewEvent();
    }

    onEditEvent = (data) => {
        this.props.onEditEvent(data);
    }

    onDeleteEvent = (key) => {
        this.props.onDeleteEvent(key);
    }

    render() {
        const { viewEvent, dayEventList } = this.props;
        const { onCloseEvent, onEditEvent, onDeleteEvent  } = this;

        return (
            <div className={`popup-event-wrap transition ${ viewEvent ? 'show' : ''}`}>
                <div className="event-header">
                    <FaTimes
                        className="icon"
                        onClick = {onCloseEvent}
                    />
                    <h4>Просмотр события</h4>
                </div>
                <div className='event-list dayEvent'>
                    {
                        dayEventList && dayEventList.length > 0 &&

                        dayEventList.map( (item) => {
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

export default PopupViewEvent;