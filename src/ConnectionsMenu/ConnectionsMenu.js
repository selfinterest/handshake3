import React, { Component } from 'react';
import './ConnectionsMenu.css';


class ConnectionsMenu extends Component{
    render() {
        return (
            <div className="connections-menu-header">
                <button className="connections-menu-header-button">
                    <i class="fa fa-link" aria-hidden="true"></i>  <span>{ this.props.connections}</span>
                </button>
            </div>
        )
    }
}
export default ConnectionsMenu;