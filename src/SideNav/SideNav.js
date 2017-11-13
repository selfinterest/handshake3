import React, { Component } from 'react';
import "./SideNav.css";


class SideNav extends Component{

    constructor(props){
        super(props);

        this.state = {
            opened: true
        }
    }
    render(){
        return (
            <div className={ 'sidenav' + this.state.opened ? ' opened' : ''}>
                <button>About</button>
                <a href="">Services</a>
                <a href="">Clients</a>
                <a href="">Contact</a>
            </div>
        )
    }

}

export default SideNav;