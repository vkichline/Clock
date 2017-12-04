import * as React from 'react';
import './ClockFace.css';

interface TimeParts {
  time:    string;  // HH:MM
  seconds: string;  // SS
  suffix:  string;  // AM|PM
  dow:     string;  // Monday, Tuesday, etc.
  mdy:     string;  // 12/25/2000
}

interface ClockProps {
  time: Date;
}

class ClockFace extends React.Component<ClockProps, {}> {
  constructor(props: ClockProps) {
    super(props);
  }

  getTimeParts(time: Date): TimeParts {
      function part2string(t: number): string {
        if (t < 10) {
            return '0' + t.toString();
        }
        return t.toString();
      }
      let days: string[] = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
      let hour: number = time.getHours();
      let minute: number = time.getMinutes();
      let second: number = time.getSeconds();
      let ispm = hour >= 12;
      if (ispm) {
          hour -= 12;
      }
      if (0 === hour) {
          hour = 12;
      }
      let month = time.getMonth() + 1;
      let day   = time.getDate();
      let year  = time.getFullYear();
      let mdy   = month.toString() + '/' + day.toString() + '/' + year.toString();
      return { 
        time    : (hour.toString() + ':' + part2string(minute)),
        seconds : part2string(second),
        suffix  : ispm ? 'PM' : 'AM',
        dow     : days[time.getDay()],
        mdy     : mdy
      };
  }

  render() {
    let timeParts: TimeParts = this.getTimeParts(this.props.time);
    return (
      <div className="clock-face">
        <div className="time">{timeParts.time}</div>
        <div className="right-box">
          <div className="seconds">{':' + timeParts.seconds}</div>
          <div className="suffix">{timeParts.suffix}</div>
        </div>
        <div className="dow">{timeParts.dow}</div>
        <div className="mdy">{timeParts.mdy}</div>
        </div>
    );
  }
}

export default ClockFace;
