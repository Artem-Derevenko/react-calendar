import React, { Component } from 'react';
import BlockCalendarMonth from './BlockCalendarMonth.jsx';
import BlockCalendarDay from './BlockCalendarDay.jsx';
import BlockCalendarWeek from './BlockCalendarWeek.jsx';
import '../../css/calendar.css';

class BlockCalendar extends Component {
    render() {
        const { activeMenu, eventList, viewEvent } = this.props;

        return (
            <div className="block-calendar">
                { activeMenu === 'month' && <BlockCalendarMonth eventList={eventList} viewEvent={viewEvent} />}
                { activeMenu === 'week' && <BlockCalendarWeek eventList={eventList} viewEvent={viewEvent} />}
                { activeMenu === 'day' && <BlockCalendarDay eventList={eventList} viewEvent={viewEvent} />}
            </div>
        );
    }
}

export default BlockCalendar;