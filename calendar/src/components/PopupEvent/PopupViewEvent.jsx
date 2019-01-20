import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import '../../css/popupevent.css';

class PopupViewEvent extends Component {
    onCloseEvent = () => {
        this.props.closeViewEvent();
    }

    render() {
        const { viewEvent } = this.props;
        const { onCloseEvent } = this;

        return (
            <div className={`popup-event-wrap transition ${ viewEvent ? 'show' : ''}`}>
                <div className="event-header">
                    <FaTimes
                        className="icon"
                        onClick = {() => onCloseEvent()}
                    />
                    <h4>Просмотр события</h4>
                    {/*<FaCheck className="icon"/>*/}
                </div>
                kkljljkjkjjk
            </div>
        );
    }
}

export default PopupViewEvent;