import React, { Component } from 'react';
import {Dropdown, MenuItem, Modal} from "react-bootstrap";
import ReactDOM from 'react-dom';
import './ConnectionsMenu.css';

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            connections: [],
            menuItems: []
        }
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick(e);
    }

    render() {
        return (
            <a href="" onClick={this.handleClick} className="connections-menu-header-button">
                <i className="fa fa-link" aria-hidden="true"></i>
                {this.props.children}
            </a>
        );
    }
}

class CustomMenu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onChange = e => this.setState({ value: e.target.value });

        this.state = { value: '' };
    }

    focusNext() {
        const input = ReactDOM.findDOMNode(this.input);

        if (input) {
            input.focus();
        }
    }

    render() {
        const { children } = this.props;
        const { value } = this.state;

        return (
            <div className="dropdown-menu connections-menu" style={{ padding: '' }}>

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(child => (
                        !value.trim() || child.props.children.indexOf(value) !== -1
                    ))}
                </ul>
            </div>
        );
    }
}

// class MenuToggle extends Component {
//     render(){
//         return (
//             <button className="connections-menu-header-button">
//                 <i className="fa fa-link" aria-hidden="true"></i>  <span>{ this.props.connections}</span>
//             </button>
//         )
//     }
// }
//
// class Menu extends Component {
//     constructor(props, context) {
//         super(props, context);
//
//         this.onChange = e => this.setState({ value: e.target.value });
//
//         this.state = { value: '' };
//     }
//     render(){
//         const { children } = this.props;
//         const { value } = this.state;
//
//         return (
//             <div className="dropdown-menu" style={{ padding: '' }}>
//                 <ul className="list-unstyled">
//                     {React.Children.toArray(children).filter(child => (
//                         !value.trim() || child.props.children.indexOf(value) !== -1
//                     ))}
//                 </ul>
//             </div>
//         )
//     }
// }
class ConnectionsMenu extends Component{
    constructor(props) {
        super(props);

        this.selectContact = this.selectContact.bind(this);

        this.state = {
            selectedContact: null
        }
    }

    selectContact(eventKey){
        //determine which contact was selected
        const contact = this.props.connections[eventKey];

        if(contact) {
            this.setState({
                selectedContact: contact
            })
        }


    }

    render() {
        const connections = this.props.connections;
        const menuItems = connections.map( (connection, i) => {
            return <MenuItem eventKey={i} key={'connection' + i} onSelect={this.selectContact}>{connection.displayName}</MenuItem>
        })
        return (
            <Dropdown id="h3-dropdown" pullRight={true}>
                <CustomToggle bsRole="toggle">
                    { this.props.connections.length}
                </CustomToggle>

                <CustomMenu bsRole="menu">
                    { menuItems }
                </CustomMenu>
            </Dropdown>

        )
    }
}
export default ConnectionsMenu;