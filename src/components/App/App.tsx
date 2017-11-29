import * as React from 'react';
import './App.css';
import  ClockFace from '../ClockFace/ClockFace';
import { setInterval } from 'timers';

const logo = require('./logo.svg');

interface ClockState {
  time: Date;
}

class App extends React.Component<{}, ClockState> {
  secondsTimer: NodeJS.Timer;

  constructor(props: object) {
    super(props);
    this.state = { time: new Date() };
  }

  refreshTime() {
    this.setState({ time: new Date() });
  }

  componentDidMount() {
    this.secondsTimer = setInterval(() => this.refreshTime(), 1000);
  }

  componentWillUnmount() {
     clearInterval(this.secondsTimer);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          The time is:
          <ClockFace time={this.state.time} />
        </p>
      </div>
    );
  }
}

export default App;
