import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import TabView from './TabView/TabView';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="jumbotron vertical-center App-container">
              <div className="container text-center">
                  <div className="row">
                      <div className="col-md-8 col-md-offset-2">
                          <div className="box">
                              Test
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div id="timer" className="col-xs-2 col-xs-offset-2">Thing</div>
                      <div id="naval" className="col-xs-3 col-xs-offset-3">Alpha Bravo Delta</div>
                  </div>

              </div>
          </div>
      </div>
    );
  }
}

export default App;
