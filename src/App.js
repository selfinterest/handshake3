import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import TabView from './TabView/TabView';
import BoxContent from './BoxContent/BoxContent';


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

const fetchSession = function(){
    return Promise.resolve({
        seconds: DEFAULT_DURATION,
        code: getNewCode()
    })
}
class App extends Component {

    state = {loading: true};

    componentWillMount(){


        const handleTimeout = () => {
            this.setState( () => {
                const seconds = this.state.seconds;
                const newSeconds = seconds - 1;

                if(newSeconds < 0) {
                    //time expired. Generate new token. This would be asynchronous normally.
                    setTimeout(handleTimeout, 1000);
                    return {
                        seconds: DEFAULT_DURATION,
                        code: getNewCode(),
                        loading: false
                    }

                } else {

                    setTimeout(handleTimeout, 1000);
                    return {seconds: newSeconds, loading: false};
                }


            });

        }
        fetchSession().then( ({seconds, code}) => {
            this.setState({seconds, code});
            setTimeout(handleTimeout, 1000);
        });

        //this.setState({seconds: DEFAULT_DURATION, code: getNewCode()});



    }

    renderLoading(){
        return <div>Loading...</div>
    }

    renderError(){
        return <div>Error...</div>
    }

    renderCode(){

    }
    render(){
        return (<div className="App">
            <div className="jumbotron vertical-center App-container">
                <div className="container text-center">
                    <BoxContent {...this.state}/>
                </div>
            </div>
        </div>)
    }
  render2() {
      let boxContent;
      /*if(!this.state || !this.state.code) {
          boxContent = <div>Loading...</div>;
      } else {
          boxContent = <div>{ this.state.code }</div>;
      }*/

      /*if (this.state.loading) {
          return this.renderLoading();
      } else if (this.state.code) {
          return this.renderCode();
      } else {
          return this.renderError();
      }*/

    return (
      <div className="App">
          <div className="jumbotron vertical-center App-container">
              <div className="container text-center">
                  <BoxContent/>


              </div>
          </div>
      </div>
    );
  }
}

export default App;
