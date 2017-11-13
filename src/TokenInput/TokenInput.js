import React, { Component } from 'react';
import "./TokenInput.css";

class TokenInput extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tokenEntry: ''
        }

        this.handleTokenEntry = this.handleTokenEntry.bind(this);

    }
    componentDidMount(){
        this.tokenInput.focus();
    }

    handleTokenEntry(event){
        //this.setState({tokenEntry: event.target.value});
        let characters = event.target.value.toUpperCase();
        /*this.setState( state => {
            if(characters && characters.length === 3) { //then in 1.5 seconds, try to look up the code and in any event clear the box
                setTimeout(() => {
                    this.setState()
                }, 1500)
            }

            return {
                tokenEntry: characters
            }
        })*/

        this.setState({tokenEntry: characters}, () => {
            if(characters && characters.length >= 3) {
                setTimeout( () => {
                    this.setState({tokenEntry: ''})
                }, 1000)
            }
        })
    }
    render(){
        return (
            <div className="box">
                <input type="text" className="form-control code-input" maxLength="3" ref={(input) => { this.tokenInput = input; }} value={this.state.tokenEntry} onChange={this.handleTokenEntry} />
            </div>
        )
    }
}

export default TokenInput;