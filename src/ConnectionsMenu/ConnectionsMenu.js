import React, { Component } from 'react';
import {Dropdown, MenuItem} from "react-bootstrap";
import ReactDOM from 'react-dom';
import './ConnectionsMenu.css';

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
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
    render() {
        return (
            <Dropdown id="h3-dropdown" pullRight={true}>
                <CustomToggle bsRole="toggle">
                    { this.props.connections.length}
                </CustomToggle>

                <CustomMenu bsRole="menu">
                    <MenuItem eventKey="1">Red</MenuItem>
                    <MenuItem eventKey="2">Blue</MenuItem>
                    <MenuItem eventKey="3" active>Orange</MenuItem>
                    <MenuItem eventKey="1">Red-Orange</MenuItem>
                </CustomMenu>
            </Dropdown>

        )
    }
}
export default ConnectionsMenu;