import React, { Component } from 'react';
import "./TokenInput.css";
import {API} from "../constants";

class TokenInput extends Component {

    acceptable = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(" ");

    constructor(props) {
        super(props);
        this.state = {
            tokenEntry: ''
        }

        this.handleTokenEntry = this.handleTokenEntry.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    componentDidMount() {
        this.tokenInput.focus();
    }


    handleKeyPress = (event) => {
        console.log(event.key);
        if(event.key == 'Enter'){
            console.log('enter press here! ')
        }
    }

    handleKeyDown = (event) => {
        if(event.key === "Backspace") {
            this.loading = false;
        }
    }
    handleTokenEntry(event) {
        if(this.loading) return;

        let characters = event.target.value.toUpperCase();

        //Get the last character
        const last = characters.slice(-1);

        if(last && !this.acceptable.includes(last)){
            console.log(last + " is not acceptable");
            return;
        } //if not an acceptable character, don't allow

        this.setState({tokenEntry: characters}, () => {
            if (characters && characters.length >= 3) {
                this.loading = true;
                const now = Date.now();
                this.fetchCode(characters)
                    .then(response => {
                        return response.json().then(data => {
                            if (response.ok) {
                                return data;
                            } else {
                                return Promise.reject({status: response.status, data});
                            }
                        });
                    })
                    .catch( (err) => {
                        console.warn(err);
                        return {
                            user: null
                        }
                    })
                    .then( data => {

                        const newNow = Date.now();
                        let delay = 1000 - (newNow - now);
                        if(delay <= 0) delay = 0;
                        setTimeout(() => {
                            if(this.loading) {
                                this.loading = false;
                                this.setState({tokenEntry: ''});
                                this.props.onNewContact(data);
                            }

                        }, delay);      //this delay is strictly for aesthetic purposes

                    })

                /*setTimeout(() => {
                    if(this.loading) {  //it is possible for loading to be interrupted
                        this.loading = false;
                        this.setState({tokenEntry: ''})
                    }

                }, 1000)*/
            }
        })
    }

    fetchCode(code){
        const request = new Request(API.getUser + "/" + code, {
            method: "GET"
        });

        return fetch(request);
    }

    render() {
        return (
            <div>
                <div className="box code-input-box">
                    <input type="text" className="form-control code-input" maxLength="3" ref={(input) => {
                        this.tokenInput = input;
                    }} value={this.state.tokenEntry} onChange={this.handleTokenEntry} onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown}/>
                </div>
                <div className={ "loading-blobs" + (this.loading ? '-show' : '')}>
                    <div className="blob blob-0"></div>
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                    <div className="blob blob-4"></div>
                    <div className="blob blob-5"></div>
                </div>
            </div>
        )
    }
}

export default TokenInput;