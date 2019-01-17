import React, { Component } from 'react';
import BlockCalendar from './components/BlockCalendar/BlockCalendar.jsx';
import BlockEvents from './components/BlockEvents/BlockEvents.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'calendar',
    };
  }

  switchPage = (str) => {
    this.setState({page: str})
  }

  render() {
    const { page } = this.state;
    const { switchPage } = this;
console.log(this.state.page)
    return (
      <div className="App">
        <div className={`wrap ${page}`}>
          <BlockCalendar />
          <BlockEvents />
        </div>
        <NavBar switchPage={ () => switchPage} />
      </div>
    );
  }
}

export default App;
