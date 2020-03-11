import React, { Component } from 'react';
import './dashboard.css';
import teloart from './dashboard_assests/teloart.png';
import AdvertList from '../advert/AdvertList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        const { adverts, auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="content-area">
                <span className="dash">Dashboard</span>
                <div className="dash-container">
                    <div className="dash-card">
                        <div className="dash-card-1">
                            <span className="dash-kanda">Kanda 5</span>
                            <span className="dash-num">356</span>
                            <span className="dash-percent">+ 60.23%</span>
                            <span className="dash-name">Philip Kolawole</span>
                        </div>
                        <div className="dash-card-2">
                            <span><i className="fas fa-plus-circle"></i></span>
                            <div className="dash-circle"></div>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="dash-card-1">
                            <span className="dash-kanda">Kanda 5</span>
                            <span className="dash-num">356</span>
                            <span className="dash-percent">+ 60.23%</span>
                            <span className="dash-name">Philip Kolawole</span>
                        </div>
                        <div className="dash-card-2">
                            <span><i className="fas fa-plus-circle"></i></span>
                            <div className="dash-circle"></div>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="dash-card-1">
                            <span className="dash-kanda">Kanda 5</span>
                            <span className="dash-num">356</span>
                            <span className="dash-percent">+ 60.23%</span>
                            <span className="dash-name">Philip Kolawole</span>
                        </div>
                        <div className="dash-card-2">
                            <span><i className="fas fa-plus-circle"></i></span>
                            <div className="dash-circle"></div>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="dash-card-1">
                            <span className="dash-kanda">Kanda 5</span>
                            <span className="dash-num">356</span>
                            <span className="dash-percent">+ 60.23%</span>
                            <span className="dash-name">Philip Kolawole</span>
                        </div>
                        <div className="dash-card-2">
                            <span><i className="fas fa-plus-circle"></i></span>
                            <div className="dash-circle"></div>
                        </div>
                    </div>
                    <div className="dash-card">
                        <div className="dash-card-1">
                            <span className="dash-kanda">Kanda 5</span>
                            <span className="dash-num">356</span>
                            <span className="dash-percent">+ 60.23%</span>
                            <span className="dash-name">Philip Kolawole</span>
                        </div>
                        <div className="dash-card-2">
                            <span><i className="fas fa-plus-circle"></i></span>
                            <div className="dash-circle"></div>
                        </div>
                    </div>
                </div>
                <div className="second-dashboard">
                    <div className="left-dashboard">
                        <div className="dashboard-advert">
                            <div className="spons">Sponsored Ads</div>
                            <div className="dash-advert">
                                <AdvertList adverts={adverts} />
                            </div>
                        </div>
                    </div>
                    <div className="right-dashboard">
                        <img src={teloart} alt="teloart" className="teloart"/>
                        <div className="refer">Refer your friends & earn</div>
                        <div className="refer refz">Coming soon</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adverts: state.firestore.ordered.adverts,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'adverts', orderBy: ['createdAt', 'desc']}
    ])
)(Dashboard)
