// This app is intended to use data from   to display astronomical info

import * as React from 'react';
import './App.css';
import  ClockFace from '../ClockFace/ClockFace';
import  MoonPhase from '../MoonPhase/MoonPhase';
import { setInterval } from 'timers';

interface ClockState {
  time: Date;
  picture: string;
}

class App extends React.Component<{}, ClockState> {
  secondsTimer: NodeJS.Timer;
  pictureTimer: NodeJS.Timer;
  
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

  refreshTime() {
    this.setState({ time: new Date() });
  }

  componentDidMount() {
    this.secondsTimer = setInterval(() => this.refreshTime(), 1000);
    this.pictureTimer = setInterval(() => this.refresPicture(), 300000);
    this.refresPicture();
  }

  componentWillUnmount() {
    clearInterval(this.secondsTimer);
    clearInterval(this.pictureTimer);
  }

  render() {
    return (
      <div id="App" className="App">
        <section className="App-time">
          <ClockFace time={this.state.time} />
        </section>
        <MoonPhase />
      </div>
    );
  }
}

export default App;
