import React, { Component } from 'react';
import BlockCalendar from './components/BlockCalendar/BlockCalendar.jsx';
import BlockEvents from './components/BlockEvents/BlockEvents.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import PopupEvent from './components/PopupEvent/PopupEvent.jsx';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'calendar',
      activeMenu: 'month',
      newEvent: false
    };
  }

  switchPage = (page, activeMenu) => {
    this.setState({
      page: page,
      activeMenu: activeMenu
    })
  }

  addNewEvent = (value) => {
    this.setState({ newEvent: value })
  }

  render() {
    const { page, newEvent } = this.state;

    return (
      <div className = "App">
        <div className = {`wrap transition ${page}`}>
          <BlockCalendar />
          <BlockEvents />
        </div>
        <NavBar
          switchPage = {this.switchPage}
          addNewEvent = {this.addNewEvent}
          { ... this.state }
        />
        <PopupEvent
          show = {newEvent}
          addNewEvent = {this.addNewEvent}
        />
      </div>
    );
  }
}

export default App;
