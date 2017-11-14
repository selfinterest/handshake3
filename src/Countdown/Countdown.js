import React, { Component } from 'react';
import * as moment from "moment";

class Countdown extends Component {
    render(){
        const seconds = this.props.count;
        const mom = moment.duration(seconds, "seconds");
        let time;
        if(seconds >= 0) {
            time = `${mom.get('minutes')}m ${mom.get('seconds')}s`;
        } else {
            time = '∞';
        }


        return (
            <div>Time remaining: {time}</div>
        )
    }
}

export default Countdown;