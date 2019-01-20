import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import ReactFire from 'reactfire';
import ReactMixin from 'react-mixin';
import BlockCalendar from './components/BlockCalendar/BlockCalendar.jsx';
import BlockEvents from './components/BlockEvents/BlockEvents.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import PopupNewEvent from './components/PopupEvent/PopupNewEvent.jsx';
import PopupViewEvent from './components/PopupEvent/PopupViewEvent.jsx';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'calendar',
      activeMenu: 'month',
      newEvent: false,
      viewEvent: false,
      eventList: [],
      eventShowId: []
    };
  }

  componentDidMount() {
      this.bindAsArray(firebase.database().ref().child("eventList"), "eventList");
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

  showEvent = (value) => {
      this.setState({
          eventShowId: value,
          viewEvent: true
      })
  }

  closeViewEvent = () => {
      this.setState({
          eventShowId: [],
          viewEvent: false
      })
  }

  render() {
    const { page, newEvent, eventShowId } = this.state;
    const { showEvent, addNewEvent, switchPage, closeViewEvent } = this;

    return (
      <div className="App">
        <div className={`wrap transition ${page}`}>
          <BlockCalendar { ... this.state } showEvent={showEvent} />
          <BlockEvents />
        </div>
        <NavBar
          switchPage={switchPage}
          addNewEvent={addNewEvent}
          { ... this.state }
        />
        <PopupNewEvent
          addNewEvent={addNewEvent}
          { ... this.state }
        />
        <PopupViewEvent
          { ... this.state }
          closeViewEvent={closeViewEvent}
        />
      </div>
    );
  }
}

ReactMixin(App.prototype, ReactFire);

export default App;
