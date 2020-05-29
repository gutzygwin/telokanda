import React, { Component } from 'react'
import wallet_illustration from './wallet_assests/wallet_illustration.png';
import './wallet.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {login, getBalance, get_history} from './telos'

class Wallet extends Component {
    constructor(props){
        super(props)
        this.state = {account:"", key:"", balance:"" ,transactions: []}
    }
    componentDidMount() {
        if(localStorage.getItem('newKey')){
            this.setState({key: localStorage.getItem('newKey')})
            login(localStorage.getItem('newKey')).then((data) => {
                this.setState({account: data})
                getBalance(this.state.account).then((data) => {
                    this.setState({balance: data})
                }).catch((err) => {
                    alert(err)
                })
                get_history(this.state.account).then((data) => {
                    this.setState({transactions: data})
                }).catch((err) => {
                    alert(err)
                })
            }).catch((err) => {
                localStorage.removeItem('newKey')
                this.setState({account: "", key: "", balance: ""})
            })
            
        }
 
    }
 
    handleSubmit = (e) => {
        e.preventDefault()
        login(this.state.key).then((data) => {
            if(data === this.state.account){
                localStorage.setItem('newKey',this.state.key)
                localStorage.setItem('newAccount', this.state.account)
                this.setState({account: data})
            }else{
                throw new Error ('Username and privateKey do not match')
            }
        }).catch((err) => {
            this.setState({account: "", key: "", balance: ""})
            alert(err)
        })
        
        getBalance(this.state.account).then((data) => {
            this.setState({balance: data})
        }).catch((err)=> alert(err))

        get_history(this.state.account).then((data) => {
            this.setState({transactions: data})
        }).catch((err) => {
            alert(err)
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('newKey');
        localStorage.removeItem('account')
        this.setState({account:"", key:"", balance:"" ,transactions: []})
    }
    render() {
        const transactions = this.state.transactions.map(transaction => (
            <tr>
                <td>{transaction.time}</td>
                <a href={transaction.url} target="_blank" rel="noopener noreferrer"><td>{transaction.id}</td></a>
                <td>{transaction.details.memo}</td>
            </tr>
        )
        )
        const { auth } = this.props;
        const key = localStorage.getItem('newKey')
        if (!auth.uid) return <Redirect to='/login' />
        if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />
        return (
            <div className="wallet-container">
                <div className="inner">
                    <h4>Wallet</h4>

                    {!key && 
                    <div id="login">
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input 
                            type="text" 
                            minLength="12" 
                            maxLength="12" 
                            placeholder="Account Name" 
                            name="account" 
                            value={this.state.account}
                            onChange={this.handleChange}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Private Key" 
                            name="key" 
                            value={this.state.key}
                            onChange={this.handleChange}>
                        </input>
                        <button>Submit</button>
                    </form>
                    

                </div>}
                {key &&  <div className="blue-container">
                        <p>Your current rewards: {this.state.balance}</p>
                        <button onClick={this.handleLogout}>Logout</button>
                        
                    </div>}
                    
                    
                    <div className="bal-pem">
                        <span className="active">Balances</span>
                        <span>Keys & Permissions</span>
                    </div>
                    <hr/>
                    <div className="wallet-div">
                    <form autoComplete="off">
                        <input
                            type="Number" 
                            placeholder="Amount to stake in Kanda" 
                            name="amount" >
                        </input>
                       
                        <button>Submit</button>
                    </form>
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
                                    {transactions}
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
