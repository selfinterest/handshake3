import React, { Component } from 'react';
import logo from './h3logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import TabView from './TabView/TabView';
import BoxContent from './BoxContent/BoxContent';
import ConnectionsMenu from './ConnectionsMenu/ConnectionsMenu'
import SideNav from "./SideNav/SideNav";




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
    let localSession;
    try {
        localSession = JSON.parse(localStorage.getItem(H3_TOKEN_KEY));
    } catch  (e) {
        console.log("Session was bad JSON");
        localSession = null;
    }


    let existingCode = '';

    const sessionInfo = {};

    if(localSession && localSession.token) {
        console.log("Found an existing session", localSession);

        existingCode = "/" + localSession.token;
        sessionInfo.session = localSession;
    } else {
        console.log("Session was malformed; getting a new one", localSession);
    }

    const request = new Request(API.getToken + existingCode, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionInfo)
    });

    /*return Promise.resolve({
        seconds: DEFAULT_DURATION,
        code: getNewCode()
    })*/

    return fetch(request)
        .then( data => data.json())
        .then(session => {
            console.log("Saving session to local storage", session);
            localStorage.setItem(H3_TOKEN_KEY, JSON.stringify(session));
            return session;
        })
}
class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            onNewContact: this.onNewContact.bind(this),
            justAdded: null
        }
    }

    onNewContact(contact) {

        if(contact) {
            this.setState({justAdded: contact});
        }

    }
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
            <div className="container menu-container">
                <div className="connections-menu pull-right">
                    <ConnectionsMenu connections='5'/>

                </div>
            </div>

            <div className="jumbotron vertical-center App-container">
                <div className="container text-center">
                    <img src={logo} className="logo"/>
                    <BoxContent {...this.state}/>
                </div>
            </div>
        </div>)
    }
}

export default App;
