// This app is intended to use data from http://aa.usno.navy.mil/data/docs/api.php to display astronomical info

import * as React from 'react';
import './App.css';
import  ClockFace from '../ClockFace/ClockFace';
import { setInterval } from 'timers';
// import { unescape } from 'querystring';

declare function unescape(s: string): string;
// declare function escape(s: string): string;

const logo = require('./logo.svg');

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

  getPicture(cb: Function): void {
    let hours: number = this.state.time.getUTCHours();
    let minutes: number = this.state.time.getUTCMinutes();
    let utcTime: string = hours.toString() + ':' + (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    let url: string = 'http://api.usno.navy.mil/imagery/earth.png?ID=KICHLINE&date=today&time=' + utcTime;
    let that: App = this;

    // Fetch the latest data.
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                cb(that, request.response);
            }
        } else {
            // handle error
        }
    };
    request.open('GET', url);
    request.send();
  }

  refresPicture() {
    this.getPicture(function (that: App, result: any) {
      let canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement;
      let ctx = canvas.getContext('2d');
      if (ctx != null) {
        canvas.height = 900;  // TODO
        canvas.width = 1600;  // TODO
        let image = new Image(900, 1600);
        image.src = 'data:image/png;base64,' + window.btoa(unescape(encodeURIComponent(result)));
        
        ctx.drawImage(image, 0, 0);
        let dataURL = canvas.toDataURL();
        that.setState({ picture: dataURL });
      }
    });
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          The time is:
          <ClockFace time={this.state.time} />
        </div>
        <img src={this.state.picture} />
      </div>
    );
  }
}

export default App;
