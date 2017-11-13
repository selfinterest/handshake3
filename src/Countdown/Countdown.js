import React, { Component } from 'react';
import * as moment from "moment";

class Countdown extends Component {
    render(){
        const seconds = this.props.count;
        const mom = moment.duration(seconds, "seconds");
        const time = `${mom.get('minutes')}m ${mom.get('seconds')}s`;

        return (
            <div>Time remaining: {time}</div>
        )
    }
}

export default Countdown;