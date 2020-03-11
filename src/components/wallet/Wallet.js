import React, { Component } from 'react'
import wallet_illustration from './wallet_assests/wallet_illustration.png';
import './wallet.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Wallet extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="wallet-container">
                <div className="inner">
                    <h4>Wallet</h4>
                    <div className="blue-container">
                        <p>Your current rewards: 0.023 Telos</p>
                    </div>
                    <div className="bal-pem">
                        <span className="active">Balances</span>
                        <span>Keys & Permissions</span>
                    </div>
                    <hr/>
                    <div className="wallet-div">
                        <div className="wallet-text">
                            <h2>Why do we use Telokanda wallet?</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi assumenda aliquam eius eveniet laborum adipisci dolore quaerat nihil eos? Quibusdam laboriosam voluptas consequatur suscipit itaque soluta impedit debitis sit facilis.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos nisi velit corrupti mollitia saepe tenetur at quod facilis, nostrum fuga, dolores soluta aperiam esse! Nulla veniam illo reiciendis neque?</p>
                        </div>
                        <div className="wallet-image">
                            <img src={wallet_illustration} className="wallety" alt="wallet_illustration"/>
                        </div>
                    </div>
                    <hr/>
                    <div className="history">
                        <h5>History</h5>
                        <p>Beware of spam and phishing links in the transfer memos. Do not open links from users you do not trust. Do not provide your private keys to any third party app.</p>
                        <div className="wallet-table">
                            <table className="content-table">
                                <thead>
                                    <tr >
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Memo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1 week ago</td>
                                        <td>Upgrade of Account from kanda 3 to kanda 4</td>
                                        <td>37658y5-658gu658-8u7gi876y-u7</td>
                                    </tr>
                                    <tr>
                                        <td>1 week ago</td>
                                        <td>Upgrade of Account from kanda 3 to kanda 4</td>
                                        <td>37658y5-658gu658-8u7gi876y-u7</td>
                                    </tr>
                                    <tr>
                                        <td>1 week ago</td>
                                        <td>Upgrade of Account from kanda 3 to kanda 4</td>
                                        <td>37658y5-658gu658-8u7gi876y-u7</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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

export default connect(mapStateToProps)(Wallet)
