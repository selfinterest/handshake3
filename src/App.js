import React, { Component } from 'react';
import logo from './h3logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import TabView from './TabView/TabView';
import BoxContent from './BoxContent/BoxContent';


import {H3_TOKEN_KEY, API} from "./constants";


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
    // Look for an existing h3 session in local storage
    const localSession = localStorage.getItem(H3_TOKEN_KEY);
    let existingCode = '';

    const sessionInfo = {};

    if(localSession) {
        existingCode = "/" + localSession.token;
        sessionInfo.session = localSession;
    }

    const request = new Request(API.getToken + existingCode, {
        url: API.getToken + existingCode,
        method: "POST",
        body: JSON.stringify(sessionInfo)
    });

    /*return Promise.resolve({
        seconds: DEFAULT_DURATION,
        code: getNewCode()
    })*/

    return fetch(request).then( data => data.json())
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
                    fetchSession()
                        .then(data => {
                            this.setState({loading: false, ...data});
                            setTimeout(handleTimeout, 1000);
                        })


                    /*return {
                        duration: DEFAULT_DURATION,
                        code: getNewCode(),
                        loading: false
                    }*/

                } else {

                    setTimeout(handleTimeout, 1000);
                    return {seconds: newSeconds, loading: false};
                }


            });

        }

        fetchSession().then(data  => {
            console.log(data);
            this.setState(data);
            setTimeout(handleTimeout, 1000);
        });

        //this.setState({seconds: DEFAULT_DURATION, code: getNewCode()});



    }


    renderCode(){

    }
    render(){
        return (<div className="App">
            <div className="jumbotron vertical-center App-container">
                <div className="container text-center">
                    <img src={logo}/>
                    <BoxContent {...this.state}/>
                </div>
            </div>
        </div>)
    }
}

export default App;
