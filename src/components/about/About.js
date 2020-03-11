import React, { Component } from 'react'
import Ads from './about_assests/Ads.png';
import Earn from './about_assests/Earn.png';
import Community from './about_assests/Community.png';
import about_illustration from './about_assests/about_illustration.png';
import './about.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="about-container">
                <div className="text-container">
                    <div className="text">
                        <h1>Start growing your Ads with Telokanda</h1>
                    </div>
                    <div className="iconz">
                        <img src={Ads} alt="Ads" className="icon-image"/>
                        <img src={Earn} alt="Earn" className="icon-image"/>
                        <img src={Community} alt="Community" className="icon-image"/>
                    </div>
                </div>
                <div className="second-container">
                    <div className="other-text">
                        <h1>"01</h1>
                        <div className="texty">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Hic optio iure id voluptatum maiores consequatur officiis dolores at, 
                            fugit dolorem rem tenetur illo quasi praesentium nemo laborum animi. Corrupti, cum.</div>
                        <br />
                        <div className="texty">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Hic optio iure id voluptatum maiores consequatur officiis dolores at, 
                                fugit dolorem rem tenetur illo quasi praesentium nemo laborum animi. Corrupti, cum.</div>
                    </div>
                    <div className="about-image">
                        <img src={about_illustration} alt="about_illustration" className="about-ill"/>
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

export default connect(mapStateToProps)(About)
