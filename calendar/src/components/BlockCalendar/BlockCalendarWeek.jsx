import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import ids from 'shortid';

const MONTH = ["Январь","Февраль","Март",
    "Апрель","Май","Июнь",
    "Июль","Август","Сентябрь",
    "Октябрь","Ноябрь","Декабрь"];

class BlockCalendarWeek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstDayWeek: this.getMonday(new Date())
        };
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

    render() {
        const { nextWeek, prevWeek, openEvent } = this;
        const { firstDayWeek } = this.state;
        const { eventList } = this.props;

        return (
            <section>
                <div className='calendar-arrow'>
                    <div className="prev" onClick={prevWeek}>
                        <FaChevronLeft />
                    </div>
                    <div className="title">{MONTH[firstDayWeek.getMonth()] +' '+ firstDayWeek.getFullYear()}</div>
                    <div className="next" onClick={nextWeek}>
                        <FaChevronRight />
                    </div>
                </div>
                <table cellSpacing="12" className='calendar-table week'>
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
                            <td />
                            {[...Array(7)].map((x, i) => {
                                let day = new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + i);
                                let classToday = (day.getDate() === new Date().getDate() &&
                                    day.getFullYear() === new Date().getFullYear() &&
                                    day.getMonth() === new Date().getMonth()) ? 'today' : '';
                                let eventIdList = [];
                                if (eventList) {
                                    eventList.map((item) => {
                                        if (new Date(item.date).getMonth() === day.getMonth() &&
                                            new Date(item.date).getFullYear() === day.getFullYear() &&
                                            new Date(item.date).getDate() === day.getDate()) {
                                            eventIdList.push(item.id);
                                        }
                                        return eventIdList;
                                    });
                                }
                                return <td className={`${classToday} ${(eventIdList.length > 0) ? 'event' : ''}`} key={ids.generate()}>
                                    {day.getDate()}
                                </td>
                            })}
                        </tr>
                    </tbody>
                </table>
                <div className='table-week-time'>
                    <table cellSpacing="0">
                        <tbody>
                            {[...Array(24)].map((k, j) => {
                                return <tr key={ids.generate()}>
                                    <td>{`${j}:00`}</td>
                                    {[...Array(7)].map((x, k) => {
                                        let day = new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + k);
                                        let eventIdList = [];
                                        if (eventList) {
                                            eventList.map((item) => {
                                                if (new Date(item.date).getMonth() === day.getMonth() &&
                                                    new Date(item.date).getFullYear() === day.getFullYear() &&
                                                    new Date(item.date).getDate() === day.getDate() &&
                                                    Number(item.time.split(':')[0]) === j ) {
                                                    eventIdList.push(item.id);
                                                }
                                                return eventIdList;
                                            });
                                        }
                                        return <td
                                            className={`${(eventIdList.length > 0) ? 'event' : ''}`}
                                            key={ids.generate()}
                                            onClick={() => openEvent(eventIdList)}
                                        />
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default BlockCalendarWeek;