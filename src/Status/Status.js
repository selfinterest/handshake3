import React, { Component } from 'react';


class Status extends Component{

    constructor(props){
        super(props);

        this.state = {
            animating: false
        }

    }

    renderJustAdded(){

        return (
            <div>Just added {this.props.justAdded.displayName}</div>
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
            return <div></div>
        }
    }

}

export default Status;