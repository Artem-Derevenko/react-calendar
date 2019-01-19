import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import ids from 'short-id';

const MONTH = ["Январь","Февраль","Март",
    "Апрель","Май","Июнь",
    "Июль","Август","Сентябрь",
    "Октябрь","Ноябрь","Декабрь"];

class BlockCalendarDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstDayWeek: this.getMonday(new Date())
        };
    }

    getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1);
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

    render() {
        const { nextWeek, prevWeek } = this;
        const { firstDayWeek } = this.state;

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
                                return <td className={classToday} key={ids.generate()}>
                                    {day.getDate()}
                                </td>
                            })}
                        </tr>
                    </tbody>
                </table>
                <div className='table-day-time'>
                    <table>
                        <tbody>
                        {[...Array(24)].map((k, j) => {
                            return <tr key={ids.generate()}>
                                <td key={ids.generate()}>{`${j}:00`}</td>
                                <td key={ids.generate()}></td>
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