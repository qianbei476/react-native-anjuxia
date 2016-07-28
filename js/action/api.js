import { createAction } from 'redux-actions';

import { Actions } from 'react-native-router-flux';

import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
var token = '';

var httpServer = 'http://www.tdong.cn/';
//var httpServer = 'http://192.168.3.59:8080/';
var httpApiList = {
  'register':'api/register',
  'registerEmail':'api/registerEmail',
  'login': {url:'api/login', obtainToken:true},
  'codeLogin': {url:'api/codelogin', obtainToken:true},
  'forgetPassword': 'api/forgetPassword',
  'deviceList': {url:'api/admin/device/list', withToken:true},
  'deviceShareForMeList': {url:'api/admin/device/share', withToken:true},
  'deviceShareList': {url:'api/admin/device/listAndShare', withToken:true},
  'deviceUpdateName':{url:'api/admin/device/updateDeviceName', withToken:true},

  'deviceShare': {url:'api/admin/deviceshare/share', withToken:true},
  'deviceUnshare': {url:'api/admin/deviceshare/unshare', withToken:true},
  'deviceBind': {url:'api/admin/device/bind', withToken:true},
  'deviceUnbind': {url:'api/admin/device/unbind', withToken:true},

  'updateCode': {url:'api/admin/user/updatecode', withToken:true},

  'updatePhoto': {url:'api/admin/user/updatePhoto', withToken:true},
  'adviceSave': {url:'api/admin/advice/save', withToken:true},
  'adviceList': {url:'api/admin/advice/list', withToken:true},
  'userUpdate': {url:'api/admin/user/update', withToken:true},
  'userUpdatePassword': {url:'api/admin/user/updatePassword', withToken:true},

  'bindEmail': {url:'api/admin/user/bindEmail', withToken:true},
  'bindMobile': {url:'api/admin/user/bindMobile', withToken:true},
  'unbindEmail': {url:'api/admin/user/unBindEmail', withToken:true},
  'unbindMobile': {url:'api/admin/user/unBindMobile', withToken:true},

  'bindEmailCode': 'api/bindEmailCode',
  'mobileCode': 'api/mobileCode',
  'emailCode': 'api/emailCode',

  'bbsPage': {url:'api/admin/anjuba/page', withToken:true},
  'bbsAdd': {url:'api/admin/anjuba/save', withToken:true},
  'bbsAddReply': {url:'api/admin/anjuba/saveReply', withToken:true},
  'uploadImage': {url:'api/admin/anjuba/uploadImage', withToken:true},

  'pmList': {url:'api/admin/pm/list', withToken:true},
  'versionGet':'api/version/get'
};

var wsServer = 'ws://www.tdong.cn:60002/websocket';
var wsApiList = {
  'deviceRealtimeData':'304',
  'deviceOTA':'307'
};

var httpActions = mapValues(httpApiList, (actionConfig, actionName) => {
  if(typeof(actionConfig) === 'string') actionConfig = {url:actionConfig};
  let requestAction = createAction(actionName + 'Request');
  let resultAction = createAction(actionName + 'Result',
    params => {
      let url = actionConfig.url;
      let body = new FormData();
      params = {...params, developer:'lumin824@163.com'};
      forEach(params, (o, k)=>{ body.append(k,o || '')});
      let headers = {};
      if(actionConfig.headers) headers = {...actionConfig.headers};
      if(actionConfig.withToken) headers['X-Auth-Token'] = token;
      return fetch(`${httpServer}${url}`, {body, method:'POST', headers})
      .then(response=>response.json())
      // .then(response=>response.text())
      // .then(text=>{console.log(text);let json = JSON.parse(text); return json;})
      .then(json=>{
        if(!json.success){
          if(json.status == 200) Actions.login();
          return Promise.reject({code:json.status, msg:json.message});
        }
        if(actionConfig.obtainToken) token = json.info.token;
        return json.info;
      });
    }, params=>params
  );

  return params => dispatch => {
    dispatch(requestAction(params));
    return dispatch(resultAction(params));
  }
});

var ws;
var wsActions = mapValues(wsApiList, (actionConfig, actionName) => {
  return createAction(actionName,
    (...params) => Promise.race([new Promise((resolve, reject) => {
      let paramsstring = params.join(',');
      let handler = evt => {
        let recv = evt.data.replace(/\n/g,'');
        if(recv.split(',')[0] == '406') reject('error', {send:paramsstring,recv});
        else resolve({send:paramsstring,recv})

      };
      if(ws){
        ws.onmessage = handler;
        ws.send(actionConfig + ',' + paramsstring);
      }else{
        ws = new WebSocket(wsServer);
        ws.onopen = () => ws.send(actionConfig + ',' + params.join(','));
        ws.onmessage = handler;
      }

    }),new Promise((resolve, reject) => {
      setTimeout(()=>reject({code:-1,msg:'超时'}), 100000);
    })])
  );
});

var useToken = createAction('useToken', t=>{
  token = t;
  return t;
});

export default {
  ...httpActions,
  ...wsActions,
  useToken
}
