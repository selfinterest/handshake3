import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import TabView from './TabView/TabView';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <header className="App-header">
          <h1 className="App-title">Sanity Dashboard</h1>
        </header>
        <TabView/>
      </div>
    );
  }
}

export default App;
