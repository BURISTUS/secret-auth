
import { call, put, takeLeading } from 'redux-saga/effects';
import { secretJsKeplr } from '../../../api/secret/secret';
import { Unwrap } from '../../types';


import { keplrConnect, keplrSetState } from '../actionCreators';
import { KeplrActionTypes } from '../actionTypes';

// eslint-disable-next-line no-empty-pattern
export function* keplrConnectSaga({ }: ReturnType<typeof keplrConnect>) {
  try {
    const res: Unwrap<typeof secretJsKeplr> = yield call(secretJsKeplr);
    if (res) {
      yield put(
        keplrSetState({
          address: res.address,
          balance: '',
        }),
      );
    }
  } catch (e) {
    console.log(e)
  }
}

export function* keplrDisConnectSaga() {
  localStorage.clear();
  yield put(
    keplrSetState({
      address: '',
      balance: '',
    }),
  );
}

export default function* keplrSaga() {
  yield takeLeading(KeplrActionTypes.Connect, keplrConnectSaga);
  yield takeLeading(KeplrActionTypes.Disconnect, keplrDisConnectSaga);
}
