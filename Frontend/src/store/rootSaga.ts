import { fork } from 'redux-saga/effects';

import keplrSaga from './keplr/sagas/keplrSaga';

export default function* rootSaga() {
  yield fork(keplrSaga);
}
