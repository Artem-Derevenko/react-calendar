import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import ids from 'shortid';

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
            dayEventList: [],
            eventList: this.props.eventList ? this.props.eventList : []
        };
    }

    componentDidMount() {
        this.getDayEventList(this.props.eventList, new Date());
    }

    getDayEventList = (data, day) => {
        if (data) {
            let eventList = data;
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

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            eventList: nextProps.eventList,
            day: nextProps.day
        });
        this.getDayEventList(nextProps.eventList, nextProps.day);
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
            this.props.viewEvent(idList);
        }
    }

    changeDay = (dayWeek) => {
        this.props.changeDay(dayWeek);
    }

    render() {
        const { nextWeek, prevWeek, openEvent, changeDay } = this;
        const { firstDayWeek, day, dayEventList, eventList } = this.state;

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
                                            eventIdList.push(item.id);
                                        }
                                        return eventIdList;
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
                    <table cellSpacing="0">
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
                                    return eventTextList;
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