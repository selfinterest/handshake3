import React, { Component } from 'react';

class Countdown extends Component {
    render(){
        return (
            <div>Time remaining: {this.props.count}</div>
        )
    }
}

export default Countdown;