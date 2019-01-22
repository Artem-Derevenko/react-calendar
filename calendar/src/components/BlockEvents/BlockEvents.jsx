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
    constructor(props) {
        super(props);
        this.state = {
            eventType: "all",
            eventList: []
        };
    }

    componentDidMount() {
        if (this.props.eventList) {
            this.setState({ eventList: this.props.eventList });
        }
    }

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

    handleChangeType = (e) => {
        let value = e.target.value;
        this.setState({ eventType: value });
    }

    filterEvent = (arr, type) => {
        let eventType = type;
        let eventList = arr;
        let filterEventList = [];
        if (arr && type) {
            if (eventType === 'all') {
                filterEventList = eventList;
            } else {
                filterEventList = eventList.filter((item) => item.eventType === eventType);
            }
        }
        return filterEventList;
    }

    render() {
        const { eventType } = this.state;
        const { eventList } = this.props;
        const { onEditEvent, onDeleteEvent, sortEventByDate, handleChangeType, filterEvent  } = this;
        let filterList = filterEvent(eventList, eventType);
        let sortListByDate = sortEventByDate(filterList);

        return (
            <div className='block-events'>
                <div className="event-header">
                    <h4>Расписание событий</h4>
                    <select className="select" name="eventType" value={eventType} onChange={handleChangeType}>
                        <option value="all" key={ids.generate()}>Все события</option>
                        <option value="meeting" key={ids.generate()}>Встреча</option>
                        <option value="holiday" key={ids.generate()}>Праздники</option>
                    </select>
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