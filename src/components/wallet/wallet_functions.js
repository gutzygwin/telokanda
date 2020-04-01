import { call, select, all } from 'redux-saga/effects';
import { selectEos } from './containers/EosioProvider/selectors';

//import { getProfileInfo } from 'utils/profileManagement';
//import { updateAcc } from 'utils/accountManagement';
import {
  getBalance,
} from './utils/walletManagement';

export function* getAcctBalance(eosAcctName) {
  const eosService = yield select(selectEos);


  const [balance] = yield all([
    call(getBalance, eosService, eosAcctName),
  ]);

  return balance;
}

