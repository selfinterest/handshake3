import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import TabView from './TabView/TabView';

import Countdown from './Countdown/Countdown';

//const DEFAULT_DURATION = 60 * 20;
const DEFAULT_DURATION = 5;
const DEFAULT_CODE = "TCW";


const getNewCode = (function(){
    let codeCounter = 0;
    const CODES = [
        "TCW",
        "ABC",
        "JLQ",
        "DRM",
        "XRC"
    ]

    return function(){
        if(codeCounter >= CODES.length) {
            codeCounter = 0;
        }

        return CODES[codeCounter++];
    }
}());

class App extends Component {

    componentWillMount(){
        this.setState({seconds: DEFAULT_DURATION, code: getNewCode()});

        setInterval(() => {
            this.setState( () => {
                const seconds = this.state.seconds;
                const newSeconds = seconds - 1;

                if(newSeconds < 0) {
                    //time expired. Generate new token
                    return {
                        seconds: DEFAULT_DURATION,
                        code: getNewCode()
                    }
                }

                return {seconds: newSeconds};
            })
        }, 1000);

    }
  render() {


    return (
      <div className="App">
          <div className="jumbotron vertical-center App-container">
              <div className="container text-center">
                  <div className="row">
                      <div className="col-md-8 col-md-offset-2">
                          <div className="box">
                              { this.state.code }
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div id="timer" className="col-xs-2 col-xs-offset-2">
                          <Countdown count={this.state.seconds}/>
                      </div>
                      <div id="naval" className="col-xs-3 col-xs-offset-3">Alpha Bravo Delta</div>
                  </div>

              </div>
          </div>
      </div>
    );
  }
}

export default App;
