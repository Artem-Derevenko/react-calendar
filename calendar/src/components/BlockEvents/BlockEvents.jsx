import React, { Component } from 'react';
import '../../css/events.css';
import ids from "shortid";

const MONTH = ["января","февраля","марта",
    "апреля","мая","июня",
    "июля","августа","сентября",
    "октября","ноября","декабря"];

class BlockEvents extends Component {
    render() {
        const { eventList } = this.props;
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