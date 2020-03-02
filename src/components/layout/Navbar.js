import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import "./layout.css";
import telokanda_logo from './layout_assests/telokanda_logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
    state = {
        isSwitchOn: false,
    }
    render() {
        const { profile } = this.props;
        const isOn = this.state.isSwitchOn;
        return (
            <div className="nav_wrapper">
                <div className="top_navbar">
                    <div className="hamburger"
                    onClick={ () => this.setState({isSwitchOn: !isOn}) }>
                        <div></div>
                        <div></div>
                        <div className="tinydiv"></div>
                    </div>
                    <div className="top_menu">
                        <div className="logo"><NavLink to ='/'><img src={telokanda_logo} className="logo_image" alt="telokanda_logo"/></NavLink></div>
                        <SignedInLinks profile={profile} />
                    </div>
                </div>
                <div className={ isOn ? "sidebar" : "coloz" }>
                    <ul>
                        <li><Link to="/">
                            <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
                            <span className="title">Dashboard</span></Link></li>
                        <li><Link to="/create-advert">
                            <span className="icon"><i className="fas fa-plus-circle"></i></span>
                            <span className="title">Create Advert</span></Link></li>
                        <li><Link to="/advert">
                            <span className="icon"><i className="fas fa-ad"></i></span>
                            <span className="title">Advert List</span></Link></li>
                        <li><Link to="/create-task">
                            <span className="icon"><i className="fab fa-stack-exchange"></i></span>
                            <span className="title">Create Task</span></Link></li>
                        <li><Link to="/task">
                            <span className="icon"><i className="fas fa-tasks"></i></span>
                            <span className="title">Task List</span></Link></li>
                        <li><Link to="/wallet">
                            <span className="icon"><i className="fas fa-wallet"></i></span>
                            <span className="title">Wallet</span></Link></li>
                        <li><Link to="/about">
                            <span className="icon"><i className="fas fa-users"></i></span>
                            <span className="title">About Us</span></Link></li>
                        <li><Link to="/contact">
                            <span className="icon"><i className="fas fa-envelope-open-text"></i></span>
                            <span className="title">Contact Us</span></Link></li>
                    </ul>
                </div>
                <ul className="animation-area">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar)

