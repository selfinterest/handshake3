import React, { Component } from 'react';
import Countdown from '../Countdown/Countdown';
import Nato from "../Nato/Nato";
class BoxContent extends Component {

    //state = {loading: true};

    renderLoading(){
        return <div>Loading...</div>
    }

    renderError(){
        return <div>Error...</div>
    }

    renderCode(){
        return (
            <div>
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="box">
                        {this.props.token}
                    </div>
                </div>
            </div>

            <div className="row">
                <div id="timer" className="col-xs-3 col-xs-offset-2">
                    <Countdown count={this.props.seconds}/>
                </div>
                <div id="naval" className="col-xs-3 col-xs-offset-2">
                    <Nato code={this.props.token}/>
                </div>
            </div>
            </div>
        )

    }

    render(){
        if (this.props.loading) {
            return this.renderLoading();
        } else if (this.props.token) {
            return this.renderCode();
        } else {
            return this.renderError();
        }

    }
}

export default BoxContent;