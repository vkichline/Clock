// This app is intended to use data from   to display astronomical info

import * as React from 'react';
import './App.css';
import  ClockFace from '../ClockFace/ClockFace';
import { setInterval } from 'timers';

interface ClockState {
  time: Date;
  picture: string;
}

class App extends React.Component<{}, ClockState> {
  secondsTimer: NodeJS.Timer;
  pictureTimer: NodeJS.Timer;
  moonTimer: NodeJS.Timer;
  
  constructor(props: object) {
    super(props);
    this.state = { time: new Date(), picture: '' };
  }
  
  getTimeString(): string {
    let hours: number = this.state.time.getUTCHours();
    let minutes: number = this.state.time.getUTCMinutes();
    return hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString());
  }

  refresPicture() {
    let utcTime: string = this.getTimeString();
    let url: string = 'http://api.usno.navy.mil/imagery/earth.png?ID=KICHLINE&date=today&time=' + utcTime;
    let appElem = document.getElementById('App');
    if (appElem) {
      appElem.style.backgroundImage = 'url(' + url + ')';
    }
  }

  refreshMoon() {
    let utcTime: string = this.getTimeString();
    let url: string = 'http://api.usno.navy.mil/imagery/moon.png?date=today&time=' + utcTime;
    let appElem = document.getElementById('moonImage');
    if (appElem) {
      appElem.style.backgroundImage = 'url(' + url + ')';
    }
  }
 
  refreshTime() {
    this.setState({ time: new Date() });
  }

  componentDidMount() {
    this.secondsTimer = setInterval(() => this.refreshTime(), 1000);
    this.pictureTimer = setInterval(() => this.refresPicture(), 300000);
    this.moonTimer = setInterval(() => this.refreshMoon(), 3600000);
    this.refreshMoon();
    this.refresPicture();
  }

  componentWillUnmount() {
    clearInterval(this.secondsTimer);
    clearInterval(this.pictureTimer);
    clearInterval(this.moonTimer);
  }

  // Note: lunar image w/ phase available at http://api.usno.navy.mil/imagery/moon.png?date=today&time=now
  render() {
    return (
      <div id="App" className="App">
        <div className="App-time">
          <ClockFace time={this.state.time} />
        </div>
        <div id="moonImage" className="moon-image" />
      </div>
    );
  }
}

export default App;
