import { handleActions } from 'redux-actions';

export var wifi = handleActions({
  GET_CURRENT_WIFI_SSID_RESULT: (state, action) => ({...state, name:action.payload})
},{});

export var wifiConfig = handleActions({
  SAVE_WIFI_CONFIG: (state, action) => ({...state, [action.payload.ssid]:action.payload.key}),
},{});

export var gps = handleActions({
  UPDATE_POSITION: (state, action) => ({...state, ...action.payload})
}, {
})
