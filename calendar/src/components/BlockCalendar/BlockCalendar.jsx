import React, { Component } from 'react';
import BlockCalendarMonth from './BlockCalendarMonth.jsx';
import BlockCalendarDay from './BlockCalendarDay.jsx';
import BlockCalendarWeek from './BlockCalendarWeek.jsx';
import '../../css/calendar.css';

class BlockCalendar extends Component {
    render() {
        const { activeMenu, eventList, showEvent } = this.props;

        return (
            <div className="block-calendar">
                { activeMenu === 'month' && <BlockCalendarMonth eventList={eventList} showEvent={showEvent} />}
                { activeMenu === 'week' && <BlockCalendarWeek eventList={eventList} showEvent={showEvent} />}
                { activeMenu === 'day' && <BlockCalendarDay eventList={eventList} showEvent={showEvent} />}
            </div>
        );
    }
}

export default BlockCalendar;