import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import ids from "shortid";

const MONTH = ["Январь","Февраль","Март",
    "Апрель","Май","Июнь",
    "Июль","Август","Сентябрь",
    "Октябрь","Ноябрь","Декабрь"];

class BlockCalendarMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            dLast: '',
            d: new Date(),
            dNfirst: ''
        };
    }

    componentDidMount() {
        this.calendarStart(this.state.year, this.state.month);
    }

    nextMonth = () => {
        this.calendarStart(this.state.year, this.state.month + 1);
    }

    prevMonth = () => {
        this.calendarStart(this.state.year, this.state.month - 1);
    }

    calendarStart = (year, month) => {
        let dLast = new Date(year,month+1,0).getDate(),
            d = new Date(year,month,dLast),
            dNfirst = new Date(d.getFullYear(),d.getMonth(),1).getDay();

        this.setState({
            dLast: dLast,
            d: d,
            dNfirst: dNfirst,
            month: month
        });
    }

    openEvent = (idList) => {
        if (idList.length > 0) {
            this.props.showEvent(idList);
        }
    }

    render() {
        const { nextMonth, prevMonth, openEvent } = this;
        const { dLast, d, dNfirst } = this.state;
        const { eventList } = this.props;

        return (
            <section>
                <div className='calendar-arrow'>
                    <div className="prev" onClick={prevMonth}>
                        <FaChevronLeft />
                    </div>
                    <div className="title">{MONTH[d.getMonth()] +' '+ d.getFullYear()}</div>
                    <div className="next" onClick={nextMonth}>
                        <FaChevronRight />
                    </div>
                </div>
                <table cellSpacing="20" className='calendar-table'>
                    <thead>
                        <tr>
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
                        {[...Array(Math.ceil((dLast + dNfirst - 1)/7))].map((x, i) => {
                            return <tr key={ids.generate()}>
                                {
                                    [...Array(7)].map((y, k) => {
                                        let ind = i*7 + k + 1;
                                        let eventIdList = [];
                                        if (eventList) {
                                            eventList.map((item) => {
                                                if (new Date(item.date).getMonth() === d.getMonth() &&
                                                    new Date(item.date).getFullYear() === d.getFullYear() &&
                                                    new Date(item.date).getDate() === (ind - dNfirst + 1)) {
                                                    return eventIdList.push(item.id);
                                                }
                                            });
                                        }
                                        let classToday = ((ind - dNfirst + 1) === new Date().getDate() &&
                                            d.getFullYear() === new Date().getFullYear() &&
                                            d.getMonth() === new Date().getMonth()) ? 'today' : '';

                                        if ( (ind < dNfirst ) || ( (ind - dNfirst + 1) > dLast ) ) {
                                            return <td key={ids.generate()}/>
                                        } else {
                                            return <td
                                                className={`${classToday} ${(eventIdList.length > 0) ? 'event' : ''}`}
                                                key={ids.generate()}
                                                onClick={() => openEvent(eventIdList)}
                                            >
                                                {ind - dNfirst + 1}
                                            </td>
                                        }
                                    })
                                }
                            </tr>
                        })}
                    </tbody>
                </table>
            </section>
        );
    }
}

export default BlockCalendarMonth;