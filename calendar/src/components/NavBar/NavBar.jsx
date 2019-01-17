import React, { Component } from 'react';
import '../../css/navbar.css';

class NavBar extends Component {
    switchPage = (str) => {
        this.props.switchPage(str);
        console.log(str)
    }

    render() {
        const { switchPage } = this;

        return (
            <div className="navbar">
                <div>создать</div>
                <div onClick={() => switchPage('calendar')}>месяц</div>
                <div onClick={() => switchPage('calendar')}>неделя</div>
                <div onClick={() => switchPage('calendar')}>день</div>
                <div onClick={() => switchPage('events')}>расписание</div>
            </div>
        );
    }
}

export default NavBar;