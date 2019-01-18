import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const MONTH = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];

class BlockCalendarMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            monthName: ''
        };
    }

    getRefTbody = (node) => { this.calendarRef = node }

    componentDidMount() {
        this.calendar(this.state.year, this.state.month);
    }

    nextMonth = () => {
        this.calendar(this.state.year, this.state.month + 1);
    }

    prevMonth = () => {
        this.calendar(this.state.year, this.state.month - 1);
    }

    calendar = (year, month) => {
        let Dlast = new Date(year,month+1,0).getDate(),
            D = new Date(year,month,Dlast),
            DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
            DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
            calendar = '<tr>';

        if (DNfirst !== 0) {
            for(let  i = 1; i < DNfirst; i++) calendar += '<td class="empty-cell">';
        }else{
            for(let  i = 0; i < 6; i++) calendar += '<td>';
        }
        for(let  i = 1; i <= Dlast; i++) {
            if (i === new Date().getDate() && D.getFullYear() === new Date().getFullYear() && D.getMonth() === new Date().getMonth()) {
                calendar += '<td class="today">' + i;
            }else{
                calendar += '<td>' + i;
            }
            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() === 0) {
                calendar += '<tr>';
            }
        }
        for(let  i = DNlast; i < 7; i++) calendar += '<td class="empty-cell">&nbsp;';

        this.setState({
            monthName: MONTH[D.getMonth()] +' '+ D.getFullYear(),
            year: D.getFullYear(),
            month: D.getMonth()
        });
        const calendarRef = ReactDOM.findDOMNode(this.calendarRef);
        calendarRef.innerHTML = calendar;
    }

    render() {
        const { getRefTbody, nextMonth, prevMonth } = this;
        const { monthName } = this.state;

        return (
            <section className=''>
                <table className='calendar-month'>
                    <thead>
                    <tr>
                        <td className="prev" onClick={prevMonth} />
                        <td className="title" colSpan="5">{monthName}</td>
                        <td className="next" onClick={nextMonth} />
                    </tr>
                    <tr className="indent"></tr>
                    <tr>
                        <td>Пн</td>
                        <td>Вт</td>
                        <td>Ср</td>
                        <td>Чт</td>
                        <td>Пт</td>
                        <td>Сб</td>
                        <td>Нд</td>
                    </tr>
                    </thead>
                    <tbody ref={getRefTbody}>
                    </tbody>
                </table>
            </section>
        );
    }
}

export default BlockCalendarMonth;