import * as React from 'react';
import './ClockFace.css';

interface ClockProps {
  time: Date;
}

class ClockFace extends React.Component<ClockProps, {}> {
  constructor(props: ClockProps) {
    super(props);
  }

  formatTime(time: Date): string {
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
      return hour.toString() + ':' + part2string(minute) + ':' + part2string(second);
  }

  render() {
    return (
      <div className="clock-face">
        {this.formatTime(this.props.time)}
      </div>
    );
  }
}

export default ClockFace;
