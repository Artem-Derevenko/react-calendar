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
import ids from 'shortid';
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
      eventViewId: [],
      dayEventList: []
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

  onSendNewEvent = (value) => {
      value.date = value.date.toString();
      console.log(value)
      firebase.database().ref().child(`eventList/${ids.generate()}`).set(value);
  }

  viewEvent = (value) => {
      if (this.state.eventList && value) {
          let eventViewId = value;
          let eventList = this.state.eventList;
          let dayEventList = [];
          eventViewId.map( (itemId) => {
              eventList.map( (item) => {
                  if (item.id === itemId) {
                      return dayEventList.push(item);
                  }
              });
          });
          this.setState({
              dayEventList: dayEventList,
              eventViewId: value,
              viewEvent: true
          });
      }
  }

  closeViewEvent = () => {
      this.setState({
          dayEventList: [],
          eventViewId: [],
          viewEvent: false
      })
  }

  render() {
    const { page } = this.state;
    const { viewEvent, addNewEvent, switchPage, closeViewEvent, onSendNewEvent } = this;

    return (
      <div className="App">
        <div className={`wrap transition ${page}`}>
          <BlockCalendar { ... this.state } viewEvent={viewEvent} />
          <BlockEvents { ... this.state } />
        </div>
        <NavBar
          switchPage={switchPage}
          addNewEvent={addNewEvent}
          { ... this.state }
        />
        <PopupNewEvent
          addNewEvent={addNewEvent}
          onSendNewEvent={onSendNewEvent}
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
