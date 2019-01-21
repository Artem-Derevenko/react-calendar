import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Calendar from 'react-calendar/dist/entry.nostyle';
import ids from 'shortid';
import '../../css/popupevent.css';

class PopupNewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ids.generate(),
            date: new Date(),
            time: '',
            eventType: "meeting",
            eventTypeName: 'Встреча',
            text: ''
        };
    }

    onCloseNewEvent = () => {
        this.props.addNewEvent(false);
        this.setState({
            id: ids.generate(),
            date: new Date(),
            time: '',
            eventType: "meeting",
            eventTypeName: 'Встреча',
            text: ''
        });
    }

    onChange = date => this.setState({ date: date })

    onSendNewEvent = () => {
        let eventInfo = { ... this.state };
        this.props.onSendNewEvent(eventInfo);
        this.onCloseNewEvent();
    }

    handleChange = (e) => {
        let field, value;
        field = e.target.name;
        value = e.target.value;
        this.setState({ [field]: value });
    }

    handleChangeType = (e) => {
        let value = e.target.value;
        this.setState({
            eventType: value,
            eventTypeName: value === "meeting" ? 'Встреча' : 'Праздники'
        });
    }

    render() {
        const { newEvent } = this.props;
        const { onCloseNewEvent, onChange,
                handleChange, onSendNewEvent,
                handleChangeType } = this;
        const { date, eventType, text, time } = this.state;

        return (
            <div className={`popup-event-wrap transition ${ newEvent ? 'show' : ''}`}>
                <div className="event-header">
                    <FaTimes
                        className="icon"
                        onClick = {onCloseNewEvent}
                    />
                    <h4>Создать</h4>
                    {
                        text && (text.length > 0) && time && (time.length > 0) &&
                        <FaCheck
                            className="icon"
                            onClick = {onSendNewEvent}
                        />
                    }
                </div>
                <div className='event-list dayEvent'>
                    <div>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            locale={'ru-RU'}
                        />
                    </div>
                    <div className='wrap-block'>
                        <input className="input-time" name="time" value={time}
                               onChange={handleChange} placeholder='Время события' />
                        <select className="select" name="eventType" value={eventType} onChange={handleChangeType}>
                            <option value="meeting" key={ids.generate()}>Встреча</option>
                            <option value="holiday" key={ids.generate()}>Праздники</option>
                        </select>
                    </div>
                    <div>
                        <textarea className="textarea" onChange={handleChange} name="text" value={text} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupNewEvent;