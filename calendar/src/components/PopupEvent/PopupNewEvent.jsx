import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import '../../css/popupevent.css';

class PopupNewEvent extends Component {
    onCloseNewEvent = () => {
        this.props.addNewEvent(false);
    }

    render() {
        const { newEvent } = this.props;
        const { onCloseNewEvent } = this;

        return (
            <div className={`popup-event-wrap transition ${ newEvent ? 'show' : ''}`}>
                <div className="event-header">
                    <FaTimes
                        className="icon"
                        onClick = {() => onCloseNewEvent()}
                    />
                    <h4>Создать</h4>
                    <FaCheck className="icon"/>
                </div>
                тип события - дата - время - текст
            </div>
        );
    }
}

export default PopupNewEvent;