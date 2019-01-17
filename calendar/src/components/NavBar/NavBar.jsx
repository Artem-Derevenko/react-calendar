import React, { Component } from 'react';
import { FaTasks } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaWindowMinimize } from 'react-icons/fa';
import { FaTh } from 'react-icons/fa';
import { FaThList } from 'react-icons/fa';
import '../../css/navbar.css';

class NavBar extends Component {
    switchPage = (page, activeMenu) => {
        this.props.switchPage(page, activeMenu);
    }

    onAddNewEvent = (value) => {
        this.props.addNewEvent(value);
    }

    render() {
        const { switchPage, onAddNewEvent } = this;
        const { activeMenu } = this.props;

        return (
            <div className = "navbar">
                <div className = 'transition'
                     onClick = {() => onAddNewEvent(true)}>
                    <p><FaPlus /></p>
                    создать
                </div>
                <div className = {activeMenu === 'month' ? 'active transition' : 'transition'}
                     onClick = {() => switchPage('calendar', 'month')}>
                    <p><FaTh /></p>
                    месяц
                </div>
                <div className = {activeMenu === 'week' ? 'active transition' : 'transition'}
                     onClick = {() => switchPage('calendar', 'week')}>
                    <p><FaThList /></p>
                    неделя
                </div>
                <div className = {activeMenu === 'day' ? 'active transition' : 'transition'}
                     onClick = {() => switchPage('calendar', 'day')}>
                    <p><FaWindowMinimize /></p>
                    день
                </div>
                <div className = {activeMenu === 'event' ? 'active transition' : 'transition'}
                     onClick = {() => switchPage('events', 'event')}>
                    <p><FaTasks /></p>
                    расписание
                </div>
            </div>
        );
    }
}

export default NavBar;