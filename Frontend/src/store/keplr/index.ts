import { KeplrState } from '../../types/store/wallet';
import { createReducer } from '../../utils';
import { keplrHandler } from './handlers';

export const keplrInitialState: Readonly<KeplrState> = {
  address: '',
  balance: '',
};

export default createReducer(
  keplrInitialState,
  keplrHandler,
);
