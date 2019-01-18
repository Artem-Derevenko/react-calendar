import React, { Component } from 'react';
import BlockCalendarMonth from './BlockCalendarMonth.jsx';
import BlockCalendarDay from './BlockCalendarDay.jsx';
import BlockCalendarWeek from './BlockCalendarWeek.jsx';
import '../../css/calendar.css';

class BlockCalendar extends Component {
    render() {
        const { activeMenu } = this.props;

        return (
            <div className="block-calendar">
                { activeMenu === 'month' && <BlockCalendarMonth />}
                { activeMenu === 'week' && <BlockCalendarWeek />}
                { activeMenu === 'day' && <BlockCalendarDay />}
            </div>
        );
    }
}

export default BlockCalendar;