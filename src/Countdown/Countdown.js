import React, { Component } from 'react';
import * as moment from "moment";

class Countdown extends Component {
    render(){
        const seconds = this.props.count;
        const mom = moment(seconds, "s");
        const time = mom.format('m[m] s[s]');
        return (
            <div>Time remaining: {time}</div>
        )
    }
}

export default Countdown;