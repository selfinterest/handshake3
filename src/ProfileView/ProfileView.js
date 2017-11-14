import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class ProfileView extends Component {

    constructor(props) {
        super(props);

        this.hideModal = this.hideModal.bind(this);
    }
    hideModal(){
        this.props.exitProfile();
    }

    renderModal(){
        return (
            <Modal show={!!this.props.selectedContact} onHide={this.hideModal} restoreFocus backdrop>
                <Modal.Header>
                    <Modal.Title>{this.props.selectedContact.displayName}</Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
    render(){
        if(this.props.selectedContact) {
            return this.renderModal();
        } else {
            return (
                <div></div>
            )
        }

    }
}

export default ProfileView;