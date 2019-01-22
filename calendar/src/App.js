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
          dayEventList: [],
          editEvent: [],
          day: new Date()
      };
  }

  componentDidMount() {
      this.bindAsArray(firebase.database().ref().child("eventList"), "eventList");
  }

  changeDay = (dayWeek) => {
      this.setState({
          day: dayWeek
      });
  }

  switchPage = (page, activeMenu) => {
      this.setState({
          page: page,
          activeMenu: activeMenu
      })
  }

  addNewEvent = (value) => {
      this.setState({
          newEvent: value,
          editEvent: []
      })
  }

  onDeleteEvent = (key) => {
      firebase.database().ref().child(`eventList/${key}`).remove();
      this.closeViewEvent();
  }

  onEditEvent = (data) => {
      this.setState({
          newEvent: true,
          editEvent: data
      });
  }

  onSendNewEvent = (value) => {
      if (value) {
          value.date = value.date.toString();
          firebase.database().ref().child(`eventList/${ids.generate()}`).set(value);
      }
  }

  onUpdateEvent = (value) => {
      let key = this.state.editEvent['.key'];
      if (value && key) {
          value.date = value.date.toString();
          firebase.database().ref().child(`eventList/${key}`).update(value);
          this.viewEvent(this.state.eventViewId);
      }
      if (this.state.dayEventList && this.state.dayEventList.length === 0) {
          this.setState({viewEvent: false});
      }
  }

  viewEvent = (value) => {
      if (this.state.eventList && value) {
          let eventViewId = value;
          let eventList = this.state.eventList;
          let dayEventList = [];
          eventViewId.map( (itemId) => {
              eventList.map( (item) => {
                  if (item.id === itemId) {
                      dayEventList.push(item);
                  }
                  return dayEventList;
              });
              return dayEventList;
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
    const { page, newEvent } = this.state;
    const { viewEvent, addNewEvent, switchPage,
        closeViewEvent, onSendNewEvent, changeDay,
        onDeleteEvent, onEditEvent, onUpdateEvent } = this;

    return (
      <div className="App">
        <div className={`wrap transition ${page}`}>
          <BlockCalendar
              {...this.state}
              viewEvent={viewEvent}
              changeDay={changeDay}
          />
          <BlockEvents
              {...this.state}
              onDeleteEvent={onDeleteEvent}
              onEditEvent={onEditEvent}
          />
        </div>
        <NavBar
          switchPage={switchPage}
          addNewEvent={addNewEvent}
          {...this.state}
        />
        {
            newEvent &&
            <PopupNewEvent
                addNewEvent={addNewEvent}
                onSendNewEvent={onSendNewEvent}
                onUpdateEvent={onUpdateEvent}
                {...this.state}
            />
        }
        <PopupViewEvent
          {...this.state}
          closeViewEvent={closeViewEvent}
          onDeleteEvent={onDeleteEvent}
          onEditEvent={onEditEvent}
        />
      </div>
    );
  }
}

ReactMixin(App.prototype, ReactFire);

export default App;
