import React, { Component } from 'react';
import wallet_illustration from './wallet_assests/wallet_illustration.png';
import './wallet.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import { newStake } from '../../store/actions/walletActions';
import { firestoreConnect } from 'react-redux-firebase';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      key: '',
      balance: '',
      transactions: [],
      stake: 0,
      stakeBalance: 0,
    };
  }
  async componentDidMount() {
    if (cookies.get('key') !== undefined) {
      const key = cookies.get('key');
      const account = cookies.get('account');
      const data = await axios.post('https://kanda-api.herokuapp.com/verify', {
        privateKey: key,
      });
      const stakeBalance = await axios.post(
        'https://kanda-api.herokuapp.com/stake/balance',
        {
          username: account,
        }
      );
      console.log(data);
      if (data.data.account === account) {
        this.setState({
          account: data.data.account,
          balance: data.data.balance,
          transactions: data.data.history,
          stakeBalance: stakeBalance.data.data,
        });
      }
      if (data.data.status !== 'success') {
        return alert(data.data.error);
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('https://kanda-api.herokuapp.com/login', {
      privateKey: this.state.key,
      account: this.state.account,
    });
    if (data.data.status === 'success') {
      cookies.set('key', data.data.key, { path: '/' });
      cookies.set('account', data.data.account, { path: '/' });
      this.setState({
        account: data.data.account,
        balance: data.data.balance,
        transactions: data.data.history,
      });
    }
    console.log(data.data.status);
    if (data.data.status !== 'success') {
      return alert(data.data.error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLogout = (e) => {
    e.preventDefault();
    cookies.remove('key', { path: '/' });
    cookies.remove('account', { path: '/' });
    this.setState({ account: '', key: '', balance: '', transactions: [] });
  };
  // Send the amount to a fiedls called stake in database
  handleStake = async (e) => {
    e.preventDefault();
    const data = await axios.post('https://kanda-api.herokuapp.com/stake', {
      username: cookies.get('account'),
      stake: this.state.stake,
    });
    if (data.data.status !== 'success') {
      return alert(data.data.data);
    }
    this.setState({ stakeBalance: data.data.data });
  };

  handleUnstake = async (e) => {
    e.preventDefault();
    const data = await axios.post('https://kanda-api.herokuapp.com/unstake', {
      username: cookies.get('account'),
      stake: this.state.stake,
    });
    this.setState({ stakeBalance: data.data.data, stake: '' });
  };
  render() {
    const transactions = this.state.transactions.map((transaction) => (
      <tr>
        <td>{transaction.time}</td>
        <a href={transaction.url} target='_blank' rel='noopener noreferrer'>
          <td>{transaction.id}</td>
        </a>
        <td>{transaction.details.memo}</td>
      </tr>
    ));
    const { auth } = this.props;
    const key = cookies.get('key');
    if (!auth.uid) return <Redirect to='/login' />;
    if (auth.uid && !auth.emailVerified) return <Redirect to='/verify-email' />;
    return (
      <div className='wallet-container'>
        <div className='inner'>
          <h4>Wallet</h4>

          {!key && (
            <div id='login'>
              <form onSubmit={this.handleSubmit} autoComplete='off'>
                <input
                  type='text'
                  minLength='12'
                  maxLength='12'
                  placeholder='Account Name'
                  name='account'
                  value={this.state.account}
                  onChange={this.handleChange}
                ></input>
                <input
                  type='text'
                  placeholder='Private Key'
                  name='key'
                  value={this.state.key}
                  onChange={this.handleChange}
                ></input>
                <button>Submit</button>
              </form>
            </div>
          )}
          {key && (
            <div className='blue-container'>
              <p>Your current Balance: {this.state.balance}</p>
              <button onClick={this.handleLogout}>Logout</button>
              <hr />
              <p>Staked Balance: {this.state.stakeBalance}</p>
            </div>
          )}

          <div className='bal-pem'>
            <span className='active'>Balances</span>
            <span>Keys & Permissions</span>
          </div>
          <hr />
          {key && (
            <div className='wallet-div'>
              <form autoComplete='off' onSubmit={this.handleStake}>
                <input
                  type='Number'
                  placeholder='Amount to stake in Kanda'
                  name='stake'
                  onChange={this.handleChange}
                ></input>

                <button>Submit</button>
              </form>

              <form autoComplete='off' onSubmit={this.handleUnstake}>
                <input
                  type='Number'
                  placeholder='Amount to unstake in Kanda'
                  name='stake'
                  onChange={this.handleChange}
                ></input>

                <button>Submit</button>
              </form>
              <div className='wallet-text'>
                <h2>Why do we use Telokanda wallet?</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
                  assumenda aliquam eius eveniet laborum adipisci dolore quaerat
                  nihil eos? Quibusdam laboriosam voluptas consequatur suscipit
                  itaque soluta impedit debitis sit facilis.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  dignissimos nisi velit corrupti mollitia saepe tenetur at quod
                  facilis, nostrum fuga, dolores soluta aperiam esse! Nulla
                  veniam illo reiciendis neque?
                </p>
              </div>
              <div className='wallet-image'>
                <img
                  src={wallet_illustration}
                  className='wallety'
                  alt='wallet_illustration'
                />
              </div>
            </div>
          )}

          <hr />
          <div className='history'>
            <h5>History</h5>
            <p>
              Beware of spam and phishing links in the transfer memos. Do not
              open links from users you do not trust. Do not provide your
              private keys to any third party app.
            </p>
            <div className='wallet-table'>
              <table className='content-table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Memo</th>
                  </tr>
                </thead>
                <tbody>{transactions}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    stake: state.firestore.ordered.stake,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newStake: (stake) => dispatch(newStake(stake)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'stake' }])
)(Wallet);
