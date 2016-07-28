import { handleActions } from 'redux-actions';

import _map from 'lodash/map';
import _find from 'lodash/find';
import _sortBy from 'lodash/sortBy';

export var deviceList = handleActions({
  deviceListResult: (state, action) => {
    if(action.error) return state;
    return {...state,
      rawList:action.payload,
      list: _map(action.payload, (o)=>({
        id:o.id,
        name:o.name,
        data:o.pm,
        online:o.online,
        code:o.code,
        ip:o.ip,
        mac:o.mac,
        version:o.version,
        type:o.type,
        latitude:o.latitude,
        longitude:o.longitude,
        address:o.address,
        canModifyName: true,
        canShare: true,
        canOTA: true,
        canUnbind: true,
        canNetConfig: true,
      }))
    }},
  deviceShareForMeListResult:(state, action) => {
    if(action.error) return state;
    return {...state,
      slist: _map(action.payload, (o)=>({
        id:o.id,
        name:o.name,
        data:o.pm,
        online:o.online,
        code:o.code,
        ip:o.ip,
        mac:o.mac,
        version:o.version,
        type:o.type,
        latitude:o.latitude,
        longitude:o.longitude,
        address:o.address,
        canModifyName: false,
        canShare: false,
        canOTA: false,
        canUnbind: false,
        canNetConfig: false,
      }))
    }},
  SELECT_DEVICE: (state, action) => ({...state, selected:action.payload}),
  deviceRealtimeData: (state, action) => {
    if(action.error) return state;
    let { send: code, recv } = action.payload;
    let arr = recv.split(',');
    return {...state,
      list:state.list.map((o)=>{
        if(o.code == code){
          o = {...o}
          if(arr[0] == '404'){
            o.online = 'on';
            o.data.pm1 = arr[1];
            o.data.pm25 = arr[2];
            o.data.pm10 = arr[3];
            o.data.temperature = arr[4];
            o.data.humidity = arr[5];
          }else{
            o.online = 'off';
          }
        }
        return o;
      }),
      slist:state.slist.map((o)=>{
        if(o.code == code){
          o = {...o}
          if(arr[0] == '404'){
            o.online = 'on';
            o.data.pm1 = arr[1];
            o.data.pm25 = arr[2];
            o.data.pm10 = arr[3];
            o.data.temperature = arr[4];
            o.data.humidity = arr[5];
          }else{
            o.online = 'off';
          }
        }
        return o;
      })};
  },
  deviceUpdateNameResult: (state, action) => {
    if(action.err) return state;
    let {device, name} = action.meta;
    return {...state,
      list:state.list.map((o)=>{
        if(o.code == device){
          o = {...o}
          o.name = name;
        }
        return o;
      })};
  },
  pmListResult: (state, action) => {
    if(action.err) return state;
    return {
      ...state,
      chart: _sortBy(action.payload,['time'])
    };
  },
  deviceUnbindResult: (state, action) => {
    if(action.err) return state;
    let {code} = action.meta;
    return {...state,
      list:state.list.map((o)=>{
        if(o.code == code){
          o = {...o}
          o.unbind = true;
        }
        return o;
      })};
  },
  DEVICE_REFRESH_STATUS: (state, action) => ({...state, refreshing: action.payload}),
  LOGOUT_RESULT: () => ({
    rawList:[],
    list:[],
    slist:[],
    chart:[]
  })
},{
  rawList:[],
  list:[],
  slist:[],
  chart:[],
  refreshing: false
});

export var shareList = handleActions({
  deviceShareListResult: (state, action) => action.error ? state : action.payload
},[]);
