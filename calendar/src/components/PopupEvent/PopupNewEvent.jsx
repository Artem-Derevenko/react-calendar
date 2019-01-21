import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Calendar from 'react-calendar/dist/entry.nostyle';
import '../../css/popupevent.css';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class PopupNewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            eventType: null
        };
    }

    onCloseNewEvent = () => {
        this.props.addNewEvent(false);
    }

    onChange = date => this.setState({ date: date })

    handleChange = (selectedOption) => {
        this.setState({ eventType: selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const { newEvent } = this.props;
        const { onCloseNewEvent, onChange, handleChange } = this;
        const { date, eventType } = this.state;

        return (
            <div className={`popup-event-wrap transition ${ newEvent ? 'show' : ''}`}>
                <div className="event-header">
                    <FaTimes
                        className="icon"
                        onClick = {onCloseNewEvent}
                    />
                    <h4>Создать</h4>
                    <FaCheck className="icon"/>
                </div>
                <div className='event-list'>
                    <div>
                        <p>Дата события:</p>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            locale={'ru-RU'}
                        />
                    </div>
                    <div>
                        <p>Катерогия события:</p>

                    </div>
                </div>
            </div>
        );
    }
}

export default PopupNewEvent;