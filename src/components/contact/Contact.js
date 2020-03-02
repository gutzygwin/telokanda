import React, { Component } from 'react'
import contact_illustration from './contact_assests/contact_illustration.png';
import './contact.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Contact extends Component {
    state = {
        title: '',
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <div className="contact-wrapper">
                <h2>Contact Us</h2>
                <div className="contact">
                    <div className="container-one">
                        <img src={contact_illustration} className="contact_ill" alt="contact"/>
                    </div>
                    <div className="container-two">
                        <h3>Send us a message</h3>
                        <h4>We won't bite :)</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                    <label htmlFor="title">Message Title</label>
                                    <input type="text" id="title" className="white-text" onChange={this.handleChange}/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="content">Message Content</label>
                                    <textarea id="content" className="materialize-textarea white-text" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="input-field">
                                    <button className="contact-button">Send</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Contact)
