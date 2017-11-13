import React, { Component } from 'react';
import "./Status.css";

class Status extends Component{

    constructor(props){
        super(props);

        this.state = {
            animating: false
        }

    }

    renderJustAdded(){

        return (
            <div  className="status-box">
                <div className={ 'status' + (this.state.animating ? " animated" : '')}>Just added {this.props.justAdded.displayName}</div>
            </div>
        )
    }

    componentWillReceiveProps({justAdded}){
        //console.log(justAdded);
        if(justAdded) {
            if(!this.props.justAdded || this.props.justAdded.id !== justAdded.id){
                console.log("We just added ", justAdded);
                this.setState({animating: true}, () => {
                    setTimeout(() => {
                        this.setState({animating: false});
                    }, 1000);
                })
            }

        }
    }
    render(){
        if(this.props.justAdded && this.state.animating) {
            return this.renderJustAdded()
        } else {
            return <div className="no-status"  style={{position: 'absolute'}}>

            </div>
        }
    }

}

export default Status;