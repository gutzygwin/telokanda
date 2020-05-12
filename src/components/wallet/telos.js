
import ecc from 'eosjs-ecc'
import dotenv from 'dotenv'

import {Api, JsonRpc} from 'eosjs'
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch'
import {TextEncoder, TextDecoder} from 'text-encoding'
dotenv.config()




const defaultPrivateKey = '5JRnsiGnaJUoydn3qAsKuP1ix1hDQndwR5aL7Wn4cocuqfU9xVc'; 
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://api.telosfoundation.io:443', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


async function login(privateKey) {

  try{
      const wif = privateKey
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


 
export {
  login, getBalance, get_history, reward
}
