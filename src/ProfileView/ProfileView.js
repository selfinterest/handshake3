import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import "./ProfileView.css"
import twitter from "../twitter.png";
import facebook from "../facebook.png";

class Profile extends Component {
    possibleFields = ["photo", "email", "twitter", "facebook", "homepage", "company"];

    renderTwitter(){

    }

    renderFacebook(){

    }

    renderHomepage(){

    }

    renderPhoto(){

    }

    conditionalRender(which, data) {

        switch(which) {
            case "email":
                return <a href={'mailto:' + data}>{data}</a>;
            case "twitter":
                return <a href={data}><img className="profile icon" src={twitter} alt="twitter"/>{data}</a>;
            case "facebook":
                return <a href={data}><img className="profile icon" src={facebook} alt="facebook"/>{data}</a>;
            case "homepage":
                return <a href={data} alt="homepage">{data}</a>;
            case "photo":
                return <img className="profile image" src={ "/api/profile-images/" + data}/>
            default:
                return <span><b>{which}:</b>  {data}</span>;
        }
    }
    render(){
        const profileFields = Object.keys(this.props.profile);
        const profile = [];
        profileFields.forEach( field => {
            if(this.possibleFields.indexOf(field) > -1){
                const fieldRow = this.conditionalRender(field, this.props.profile[field]);
                profile.push(<tr key={field}><td>{fieldRow}</td></tr>)
            }

        });

        return (
            <table className="table">
                <tbody>
                    {profile}
                </tbody>
           </table>
        )
    }
}
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
                <Modal.Body>
                    <Profile profile={this.props.selectedContact}/>
                </Modal.Body>
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