import * as React from 'react';
import './ClockFace.css';

interface ClockProps {
  time: Date;
}

class ClockFace extends React.Component<ClockProps, {}> {
  constructor(props: ClockProps) {
    super(props);
  }

  // Return an object with these parts:
  // {
  //   time:    string; // HH:MM
  //   seconds: string; // SS
  //   suffix:  string; //AM|PM
  // }
  getTimeParts(time: Date): { time: string, seconds: string, suffix: string} {
      function part2string(t: number): string {
        if (t < 10) {
            return '0' + t.toString();
        }
        return t.toString();
      }
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
      return { 
        time: (hour.toString() + ':' + part2string(minute)),
        seconds: part2string(second),
        suffix: ispm ? 'PM' : 'AM'
      };
  }

  render() {
    let timeParts = this.getTimeParts(this.props.time);
    return (
      <div className="clock-face">
        <div className="time">{timeParts.time}</div>
        <div className="right-box">
          <div className="seconds">{':' + timeParts.seconds}</div>
          <div className="suffix">{timeParts.suffix}</div>
        </div>
      </div>
    );
  }
}

export default ClockFace;
