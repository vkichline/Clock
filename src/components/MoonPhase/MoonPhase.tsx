import * as React from 'react';
import './MoonPhase.css';
import { setInterval } from 'timers';

class MoonPhase extends React.Component {
  imageTimer: NodeJS.Timer;
  phaseTimer: NodeJS.Timer;
  
  constructor(props: object) {
    super(props);
  }

  getTimeString(): string {
    let now = new Date();
    let hours: number = now.getUTCHours();
    let minutes: number = now.getUTCMinutes();
    return hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString());
  }

  refreshMoonImage(): void {
    let appElem = document.getElementById('moonPhaseImage');
    if (appElem) {
      let utcTime: string = this.getTimeString();
      let url: string = 'http://api.usno.navy.mil/imagery/moon.png?date=today&time=' + utcTime;
      appElem.style.backgroundImage = 'url(' + url + ')';
    }
  }

  //  The query will return a json element like:
  // {
  //   "error":false,
  //   "apiversion":"2.0.0",
  //   "year":2017,
  //   "month":12,
  //   "day":3,
  //   "numphases":1,
  //   "datechanged":false, 
  //   "phasedata":[
  //         {
  //            "phase":"Full Moon",
  //            "date":"2017 Dec 03",
  //            "time":"15:47"
  //         }
  //   ]
  // }
  refreshMoonPhase(): void {
    let appElem = document.getElementById('moonPhaseName');
    if (null != appElem) {
      let now: Date = new Date();
      let date: string = (now.getMonth() + 1).toString() +
                '/' + now.getDate().toString() + '/' +
                now.getFullYear().toString();
      let url: string = 'http://api.usno.navy.mil/moon/phase?date=' + date + '&nump=1';
      
      // Fetch the latest data.
      let request = new XMLHttpRequest();
      request.onreadystatechange = _ => {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  let response = JSON.parse(request.response);
                  let phase: string = response.phasedata[0].phase;
                  if (null != appElem) {
                    appElem.innerText = phase;
                  }
              }
          } else {
              // Return the initial weather forecast since no data is available.
          }
      };
      request.open('GET', url);
      request.send();
    }
  }
 
  componentDidMount() {
    this.imageTimer = setInterval(() => this.refreshMoonImage(), 3600000);    // Once an hour
    this.phaseTimer = setInterval(() => this.refreshMoonPhase(), 3600000 * 24); // Once a day
    this.refreshMoonImage();
    this.refreshMoonPhase();
  }

  componentWillUnmount() {
    clearInterval(this.imageTimer);
  }

  render() {
    return (
      <section className="moon-phase-section">
        <div id="moonPhaseImage" />
        <div id="moonPhaseName" />
      </section>
    );
  }
}

export default MoonPhase;
