import {
  AsyncStorage,
} from 'react-native';

import { applyMiddleware, createStore } from 'redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { persistStore, autoRehydrate } from 'redux-persist';

import reducer from '../reducer';

export default configStore = (onComplete) => {

  let args = [promise, thunk];
  if(global.__DEV__) args = [...args, createLogger()];

  const store = applyMiddleware(...args)(createStore)(reducer, autoRehydrate());
  persistStore(store, { storage: AsyncStorage, whitelist:['loginForm','wifiConfig','loginUser'],log:true}, onComplete);
  return store;
};
