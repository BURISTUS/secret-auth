import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keplrConnect } from './store/keplr/actionCreators';
import { selectKeplr } from './store/keplr/selectors';


function App() {
  const dispatch = useDispatch()
  const {address} = useSelector(selectKeplr)
  const connectWallet = useCallback(()=>{
    dispatch(keplrConnect())
  }, [dispatch])
  return (
    <div className="App">
      <button onClick={connectWallet}>{address ? address : 'connect'}</button>
    </div>
  );
}

export default App;
