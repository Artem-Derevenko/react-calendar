import React, { Component } from 'react';
import BlockCalendarMonth from './BlockCalendarMonth.jsx';
import BlockCalendarDay from './BlockCalendarDay.jsx';
import BlockCalendarWeek from './BlockCalendarWeek.jsx';
import '../../css/calendar.css';

class BlockCalendar extends Component {
    render() {
        const { activeMenu, eventList, viewEvent, changeDay, day } = this.props;

        return (
            <div className="block-calendar">
                { activeMenu === 'month' && <BlockCalendarMonth eventList={eventList} viewEvent={viewEvent} />}
                { activeMenu === 'week' && <BlockCalendarWeek eventList={eventList} viewEvent={viewEvent} />}
                { activeMenu === 'day' && <BlockCalendarDay eventList={eventList} day={day}
                     viewEvent={viewEvent} changeDay={changeDay} />}
            </div>
        );
    }
}

export default BlockCalendar;