const ecc = require('eosjs-ecc');
const {decrypt} = require('./encrypt')
require('dotenv').config()


const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('text-encoding');

const defaultPrivateKey = decrypt("d61b56dd086bcb4b1ae699f79fa16351963e9109ca69d2a706d649849573c54c4709e0de07f07f0ba7421613c2c5296dd83c6012379c8c9304f7bf0f04992b1f"); 
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://api.telosfoundation.io:443', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


async function login(privateKey) {

  try{
      const wif = decrypt(privateKey)
      const pubkey = ecc.privateToPublic(wif)
      const account = await rpc.history_get_key_accounts(pubkey)
      return account.account_names[0]
  }catch(e){
      throw new Error('Private Key not Found Enter a valid Private Key')
  }
}



async function getBalance(account){
  try{
    var data = await rpc.get_currency_balance('telokandaone', account, 'KANDA')
    return data[0]
    
  }catch(e){
    throw new Error('Unable to get Balance')
  }

}

async function reward(username){
  try{
    const account = await rpc.get_account(username)
  const net_TLOS = Number((account.total_resources.net_weight.toString().split(' '))[0])
  const cpu_TLOS = Number((account.total_resources.cpu_weight.toString().split(' '))[0])

  const totalStake = net_TLOS + cpu_TLOS
  const kandaReward = `${(0.05 * totalStake).toFixed(8)} KANDA`
  const doTransfer = await transfer(username, kandaReward, 'Reward on Click from Telokanda Web')
  return doTransfer
  }
  catch(err){
    throw new Error(err.message)
  }

}


async function get_history(username){
  const data = await rpc.history_get_actions(username)
  let actions = data.actions
  const actionmap = actions.map(a => a.action_trace)
  let transactions = []
  actionmap.forEach(action => {
    if(action.act.data.memo){
      let transaction = {
        details: action.act.data,
        id: action.trx_id,
        time: (new Date(action.block_time)).toISOString().substring(0, 10),
        url: `https://telos.bloks.io/transaction/${action.trx_id}`
      }
      transactions.push(transaction)
    }
  })
  return transactions
}

async function transfer(username, quantity, memo){
 try {
  const transfer = await api.transact({
    actions: [{
      account: 'telokandaone',
      name: 'transfer',
      authorization: [{
        actor: 'demonconju3r',
        permission: 'active',
      }],
      data: {
        from: 'demonconju3r',
        to: username,
        quantity,
        memo
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  })
  return transfer.processed.id
 }catch(err){
  return err
 }
}


 
module.exports = {
  login, getBalance,get_history, reward
}
