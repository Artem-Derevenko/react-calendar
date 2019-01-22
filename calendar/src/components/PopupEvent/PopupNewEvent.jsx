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

    componentDidMount() {
        if (this.props.editEvent && Object.keys(this.props.editEvent).length > 0) {
            let data = this.props.editEvent;
            this.setState({
                id: data.id ? data.id : ids.generate(),
                date: data.date ? new Date(data.date) : new Date(),
                time: data.time ? data.time : '',
                eventType: data.eventType ? data.eventType : "meeting",
                eventTypeName: data.eventTypeName ? data.eventTypeName : 'Встреча',
                text: data.text ? data.text : ''
            });
        }
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
        let eventInfo = {...this.state};
        this.props.onSendNewEvent(eventInfo);
        this.onCloseNewEvent();
    }

    onUpdateEvent = () => {
        let eventInfo = {...this.state};
        this.props.onUpdateEvent(eventInfo);
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
        const { newEvent, editEvent } = this.props;
        const { onCloseNewEvent, onChange,
                handleChange, onSendNewEvent,
                handleChangeType, onUpdateEvent } = this;
        const { date, eventType, text, time } = this.state;

        return (
            <div className={`popup-event-wrap new transition ${ newEvent ? 'show' : ''}`}>
                <div className="event-header">
                    <FaTimes
                        className="icon"
                        onClick = {onCloseNewEvent}
                    />
                    <h4>{ (editEvent && Object.keys(editEvent).length > 0) ? "Редактирование события" : "Создать событие"}</h4>
                    {
                        text && (text.length > 0) && time && (time.length > 0) &&
                        <FaCheck
                            className="icon"
                            onClick={(editEvent && Object.keys(editEvent).length > 0) ? onUpdateEvent : onSendNewEvent}
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