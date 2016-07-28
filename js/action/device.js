import { createAction } from 'redux-actions';
import { getSSID, startConfig, stopConfig } from 'react-native-nufront-wifi';
import action from '../action';

var deviceRefreshStatus = createAction('DEVICE_REFRESH_STATUS');

export var deviceRefresh = () => dispatch => {
  dispatch(deviceRefreshStatus(true));

  let {deviceList, deviceShareForMeList} = action;
  return Promise.all([
    dispatch(deviceList()),
    dispatch(deviceShareForMeList())
  ]).then(()=>dispatch(deviceRefreshStatus(false)));
};

var _selectDevice = createAction('SELECT_DEVICE');

export var selectDevice = (id) => dispatch => {
  dispatch(_selectDevice(id));
};

var _getCurrentWifiSSIDResult = createAction('GET_CURRENT_WIFI_SSID_RESULT');
export var getCurrentWifiSSID = () => dispatch => {
  getSSID((ssid)=>dispatch(_getCurrentWifiSSIDResult(ssid)));
};

var _saveWifiConfig = createAction('SAVE_WIFI_CONFIG');
export var startWifiConfig = params => dispatch => {
  dispatch(_saveWifiConfig(params));
  return startConfig(params.ssid, params.key, params.code);
};

export var stopWifiConfig = createAction('STOP_WIFI_CONFIG', ()=>stopConfig());
