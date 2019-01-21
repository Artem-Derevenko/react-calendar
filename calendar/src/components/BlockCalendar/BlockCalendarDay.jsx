import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import ids from 'shortid';
import firebase from "../../App";

const MONTH = ["января","февраля","марта",
    "апреля","мая","июня",
    "июля","августа","сентября",
    "октября","ноября","декабря"];

class BlockCalendarDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstDayWeek: this.getMonday(new Date()),
            day: new Date(),
            dayEventList: []
        };
    }

    componentDidMount() {
        this.getDayEventList(new Date());
    }

    getDayEventList = (day) => {
        if (this.props.eventList) {
            let eventList = this.props.eventList;
            let dayEventList = eventList.filter( (item) => {
                return (new Date(item.date).getMonth() === day.getMonth() &&
                    new Date(item.date).getFullYear() === day.getFullYear() &&
                    new Date(item.date).getDate() === day.getDate())
            });
            this.setState({
                dayEventList: dayEventList
            });
        }
    }

    getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6:1);
        return new Date(d.setDate(diff));
    }

    nextWeek = () => {
        let day = this.state.firstDayWeek;
        let dayNew = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 7);
        this.setState({
            firstDayWeek: dayNew
        });
    }

    prevWeek = () => {
        let day = this.state.firstDayWeek;
        let dayNew = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 7);
        this.setState({
            firstDayWeek: dayNew
        });
    }

    openEvent = (idList) => {
        if (idList.length > 0) {
            this.props.showEvent(idList);
        }
    }

    changeDay = (dayWeek) => {
        this.getDayEventList(dayWeek);
        this.setState({
            day: dayWeek
        });
    }

    render() {
        const { nextWeek, prevWeek, openEvent, changeDay } = this;
        const { firstDayWeek, day, dayEventList } = this.state;
        const { eventList } = this.props;

        return (
            <section>
                <div className='calendar-arrow'>
                    <div className="prev" onClick={prevWeek}>
                        <FaChevronLeft />
                    </div>
                    <div className="title">{day.getDate() +' '+ MONTH[day.getMonth()] +' '+ day.getFullYear()}</div>
                    <div className="next" onClick={nextWeek}>
                        <FaChevronRight />
                    </div>
                </div>
                <table cellSpacing="12" className='calendar-table day'>
                    <thead>
                        <tr>
                            <td />
                            <td>Пн</td>
                            <td>Вт</td>
                            <td>Ср</td>
                            <td>Чт</td>
                            <td>Пт</td>
                            <td>Сб</td>
                            <td>Вс</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='empty' />
                            {[...Array(7)].map((x, i) => {
                                let dayWeek = new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + i);
                                let classToday = (dayWeek.getDate() === day.getDate() &&
                                    dayWeek.getFullYear() === day.getFullYear() &&
                                    dayWeek.getMonth() === day.getMonth()) ? 'active' : '';
                                let eventIdList = [];
                                if (eventList) {
                                    eventList.map((item) => {
                                        if (new Date(item.date).getMonth() === dayWeek.getMonth() &&
                                            new Date(item.date).getFullYear() === dayWeek.getFullYear() &&
                                            new Date(item.date).getDate() === dayWeek.getDate()) {
                                            return eventIdList.push(item.id);
                                        }
                                    });
                                }
                                return <td className={`${classToday} ${(eventIdList.length > 0) ? 'event' : ''}`}
                                           key={ids.generate()}
                                           onClick={() => changeDay(dayWeek)}
                                >
                                    {dayWeek.getDate()}
                                </td>
                            })}
                        </tr>
                    </tbody>
                </table>
                <div className='table-day-time'>
                    <table>
                        <tbody>
                        {[...Array(24)].map((k, j) => {
                            let eventIdList = [];
                            let eventTextList = [];
                            if (dayEventList) {
                                dayEventList.map((item) => {
                                    if (Number(item.time.split(':')[0]) === j ) {
                                        eventIdList.push(item.id);
                                        eventTextList.push(item.text);
                                    }
                                });
                            }
                            return <tr key={ids.generate()}>
                                <td key={ids.generate()}>{`${j}:00`}</td>
                                <td
                                    className={`${(eventIdList.length > 0) ? 'event' : ''}`}
                                    key={ids.generate()}
                                    onClick={() => openEvent(eventIdList)}
                                >
                                    {eventTextList.join(", ")}
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default BlockCalendarDay;