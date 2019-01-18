import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const MONTH = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];

class BlockCalendarMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            monthName: '',

        };
    }

    getRefTbody = (node) => { this.calendarRef = node }

    componentDidMount() {
        this.calendar("calendar2", this.state.year, this.state.month);
    }

    nextMonth = () => {

    }

    prevMonth = () => {

    }

    calendar = (id, year, month) => {
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
            innerHTML: calendar,
            monthName: MONTH[D.getMonth()] +' '+ D.getFullYear()
        });
        const calendarRef = ReactDOM.findDOMNode(this.calendarRef);
        calendarRef.innerHTML = calendar;
        // document.querySelector('#'+id+' tbody').innerHTML = calendar;
        // document.querySelector('#'+id+' thead td:nth-child(1)').innerHTML = MONTH[D.getMonth()] +' '+ D.getFullYear();
        // document.querySelector('#'+id+' thead td:nth-child(1)').dataset.month = D.getMonth();
        // document.querySelector('#'+id+' thead td:nth-child(1)').dataset.year = D.getFullYear();
    }

    render() {
        const { calendar, getRefTbody, nextMonth, prevMonth } = this;
        const { innerHTML, monthName } = this.state;

        return (
            <div className="">
                <section>
                    <table>
                        <thead>
                        <tr>
                            <td className="title" colSpan="5">{monthName}</td>
                            <td className="prev" onClick={prevMonth} />
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
                        <tbody ref = {getRefTbody}>
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

export default BlockCalendarMonth;