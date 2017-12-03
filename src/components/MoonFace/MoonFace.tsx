import * as React from 'react';
import './MoonFace.css';
import { setInterval } from 'timers';

class MoonFace extends React.Component {
  moonTimer: NodeJS.Timer;

  constructor(props: object) {
    super(props);
  }

  getTimeString(): string {
    let now = new Date();
    let hours: number = now.getUTCHours();
    let minutes: number = now.getUTCMinutes();
    return hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString());
  }

  refreshMoon() {
    let utcTime: string = this.getTimeString();
    let url: string = 'http://api.usno.navy.mil/imagery/moon.png?date=today&time=' + utcTime;
    let appElem = document.getElementById('moonImage');
    if (appElem) {
      appElem.style.backgroundImage = 'url(' + url + ')';
    }
  }
 
  componentDidMount() {
    this.moonTimer = setInterval(() => this.refreshMoon(), 3600000);
    this.refreshMoon();
  }

  componentWillUnmount() {
    clearInterval(this.moonTimer);
  }

  render() {
    return (
      <section className="moon-section">
        <div id="moonImage" />
      </section>
    );
  }
}

export default MoonFace;
