import { createAction } from 'redux-actions';
import * as qq from 'react-native-qq';
import * as wechat from 'react-native-wechat';


var logoutResult = createAction('LOGOUT_RESULT');

export var logout = () => dispatch => {
  return dispatch(logoutResult());
}

export var qqLogin = createAction('QQ_LOGIN', () => qq.login('get_simple_userinfo'));

export var wechatLogin = createAction('WECHAT_LOGIN',()=>new Promise((resolve, reject) => {
  wechat.sendAuthReq('snsapi_userinfo', '1234').then(code => {
    let APP_SECRET = 'ca67d5319eb1c22e469d0f8705439495';
    fetch(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat.APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`)
    .then(response => response.json())
    .then(json=>resolve(json.openid))
    .catch(reject);
  }).catch(reject);
}));

export var wechatShareSession = createAction('WECHAT_SHARE_SESSION', params=>wechat.sendMsgReq(params,wechat.WXSceneSession));
export var wechatShareTimeline = createAction('WECHAT_SHARE_TIMELINE', params=>wechat.sendMsgReq(params,wechat.WXSceneTimeline));

var _updatePosition = createAction('UPDATE_POSITION');

let geocoder = (params) => {
    let ak = 'zxZIPbW4VitTIoK27W2PSmafS4sq5tuY';
    let location = [params.latitude,params.longitude].join(',');
    return fetch(`http://api.map.baidu.com/geocoder/v2/?output=json&ak=${ak}&location=${location}`)
      .then(response=>response.json())
  };

export var updatePosition = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((position)=>{
    let {coords} = position;
    longitude = coords.longitude;
    latitude = coords.latitude;

    geocoder({latitude,longitude}).then(json=>{
      console.log(json);
      if(json.status==0){
          let { city, province } = json.result.addressComponent;
          let address = city == province ? city : province + city;
          dispatch(_updatePosition({longitude,latitude,address}));
      }else{
        dispatch(_updatePosition({longitude,latitude}));
      }
    });
  },(error)=>{

  });
};
