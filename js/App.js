/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  AppState,
  BackAndroid,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import codePush from 'react-native-code-push';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Scene, Router, Actions,Reducer } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import configStore from './store/configStore';

import {capture} from 'react-native-screenshot';

import action from './action';
import * as view from './view';
import IconFont from './IconFont';

import _find from 'lodash/find';

const RouterWithRedux = connect()(Router);
var first = null;

class TabIcon extends Component {
    render(){
      let iconName = this.props.selected ? this.props.activeIconName || this.props.iconName : this.props.iconName;
      let color = this.props.selected ? '#18B4ED' : '#B3B3B3';
        return (
          <View style={{alignItems:'center'}}>
            <IconFont name={iconName} style={{backgroundColor:'transparent'}} size={24} color={color} />
            <Text style={{color, fontSize:11}}>{this.props.iconText || this.props.title}</Text>
          </View>
        );
    }
}

class BackButton extends Component {
  render(){
    return (
      <TouchableOpacity style={this.props.style} onPress={Actions.pop}>
        <View style={{justifyContent:'center'}}>
          <IconFont name='back' size={20} color='#fff' />
        </View>
      </TouchableOpacity>
    );
  }
}

class ShareAndMoreButton extends Component {
  render(){
    return(
      <View style={[this.props.style, {flexDirection:'row',padding:0}]}>
        <TouchableOpacity style={{flex:1, flexDirection:'row',justifyContent:'flex-end'}} onPress={()=>capture().then(uri=>Actions.shareImage({image:'file://'+uri}))}>
          <View style={{justifyContent:'center'}}>
            <IconFont name='share1' size={20} color='#fff' style={{marginRight:5}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}} onPress={Actions.deviceSetting}>
          <View style={{justifyContent:'center'}}>
            <IconFont name='setting' size={20} color='#fff' style={{marginRight:15}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class EditButton extends Component{
  render(){
    return(
      <View style={[this.props.style, {flexDirection:'row',padding:0}]}>
      <TouchableOpacity style={{flex:1, flexDirection:'row',justifyContent:'flex-end'}}
        onPress={()=>Actions.bbsAdd({imageUri:this.props.image})}>
        <View style={{justifyContent:'center'}}>
          <IconFont name='edit' size={20} color='#fff' style={{marginRight:5}} />
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const customRouterReducer = params => {

  const defaultReducer = Reducer(params);
  return (state, action)=>{
      if(action.type == 'BODGE') {
        if(state.children.length > 1) {
          state = Object.assign({}, state, {index: 0, children : state.children.slice(0,1)});
         }
      } else {
        let curIndex = state ? state.index : -1;
        state = defaultReducer(state, action);
        let newIndex = state.index;

        if(curIndex == 0 && newIndex == 0 && action.type=='BackAction'){
          if(!first){
            first = new Date().getTime();
            ToastAndroid.show('再按一次退出应用', 1000);
            setTimeout(function() {
                first=null;
            }, 1000);
          }else{
            if (new Date().getTime() - first < 1000) {
                BackAndroid.exitApp();
            }
          }
        }
      }
      return state;
  };
}
const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#f1f1f1',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends Component {
  componentDidMount(){
    this.props.action.useToken(this.props.token);
  }
  render(){
    return (
      <RouterWithRedux createReducer={customRouterReducer}
        getSceneStyle={getSceneStyle}
        navigationBarStyle={{backgroundColor:'#18B4ED'}}
        titleStyle={{color:'#fff'}}>
        <Scene key='login' component={view.LoginView} title='登录' initial={this.props.initialLogin} hideNavBar={true} hideTabBar={true} type='reset'/>
        <Scene key='resetPassword' component={view.ResetPasswordView} title='忘记密码' hideNavBar={false} backButton={BackButton} hideTabBar={true} />
        <Scene key='register' component={view.RegisterView} title='注册' hideNavBar={false} backButton={BackButton} hideTabBar={true} />
        <Scene key='provision' component={view.ProvisionView} title='条款' hideNavBar={false} />

        <Scene key='main' tabs={true} initial={!this.props.initialLogin} type='replace'>
          <Scene key='deviceList' component={ view.DeviceListView } title='我的设备' icon={TabIcon} iconText='设备' iconName='home' activeIconName='home-fill'/>
          <Scene key='discovery' component={ view.DiscoveryView } title='发现' icon={TabIcon} iconName='faxian' activeIconName='faxian-fill'/>
          <Scene key='message' component={ view.MessageView } title='消息' icon={TabIcon} iconName='message' activeIconName='message-fill'/>
          <Scene key='setting' component={ view.SettingView } title='我的' icon={TabIcon} iconName='my' activeIconName='my-fill'/>
        </Scene>
        <Scene key='device' tabs={true} type='push' >
          <Scene key='deviceData' component={view.DeviceDataView} title='检测' getTitle={(e)=>(this.props.device && this.props.device.name)} icon={TabIcon} iconName='search' backButton={BackButton} rightButton={ShareAndMoreButton}/>
          <Scene key='deviceChart' component={view.DeviceChartView} title='趋势' getTitle={(e)=>(this.props.device && this.props.device.name)} icon={TabIcon} iconName='qushi' backButton={BackButton} rightButton={ShareAndMoreButton} />
        </Scene>
        <Scene key='deviceSetting' component={view.DeviceSettingView} title='设置' backButton={BackButton} hideTabBar={true} />
        <Scene key='deviceModifyName' component={view.DeviceModifyNameView} title='修改设备名称' backButton={BackButton} />
        <Scene key='deviceInfo' component={view.DeviceInfoView} title='设备信息' backButton={BackButton} />
        <Scene key='deviceShare' component={view.DeviceShareView} title='设备分享' backButton={BackButton} />
        <Scene key='deviceNetConfig' component={view.DeviceNetConfigView} title='网络配置' backButton={BackButton} />
        <Scene key='deviceOTA' component={view.DeviceOTAView} title='硬件升级' backButton={BackButton} />

        <Scene key='deviceAdd' component={view.DeviceAdd1View} title='设备添加1' backButton={BackButton} hideTabBar={true} />
        <Scene key='deviceAdd2' component={view.DeviceAdd2View} title='设备添加2' backButton={BackButton} hideTabBar={true} />
        <Scene key='deviceAdd3' component={view.DeviceAdd3View} title='设备添加3' backButton={BackButton} hideTabBar={true} />

        <Scene key='bbs' component={view.BBSView} title='安居吧' backButton={BackButton} hideTabBar={true} rightButton={EditButton} />
        <Scene key='productList' component={view.ProductListView} title='产品列表' backButton={BackButton} hideTabBar={true} />
        <Scene key='bbsAdd' component={view.BBSAddView} title='添加帖子' backButton={BackButton} hideTabBar={true} />
        <Scene key='bbsAddReply' component={view.BBSAddReplyView} title='选择回复' backButton={BackButton} hideTabBar={true} />

        <Scene key='messageDetail' component={view.MessageDetailView} title='消息' backButton={BackButton} hideTabBar={true} />
        <Scene key='userinfo' component={view.UserInfoView} title='个人信息' backButton={BackButton} hideTabBar={true}/>
        <Scene key='modifyName' component={view.ModifyNameView} title='修改姓名' backButton={BackButton} hideTabBar={true} />
        <Scene key='modifyPassword' component={view.ModifyPasswordView} title='修改密码' backButton={BackButton} hideTabBar={true} />
        <Scene key='bindMobile' component={view.BindMobileView} title='绑定手机号' backButton={BackButton} hideTabBar={true} />
        <Scene key='bindEmail' component={view.BindEmailView} title='绑定邮箱' backButton={BackButton} hideTabBar={true} />
        <Scene key='deviceShareList' component={view.DeviceShareListView} title='已分享' backButton={BackButton} hideTabBar={true} />
        <Scene key='feedback' component={view.FeedbackView} title='意见反馈' backButton={BackButton} hideTabBar={true}/>
        <Scene key='about' component={view.AboutView} title='关于' backButton={BackButton} hideTabBar={true}/>
        <Scene key='building' component={view.BuildingView} title='建设中' backButton={BackButton} hideTabBar={true} />
        <Scene key='shareImage' component={view.ShareImageView} title='分享到' backButton={BackButton} hideTabBar={true} />
    </RouterWithRedux>
    );
  }
}

const AppWithRedux = connect(state=>({
  device: (_find(state.deviceList.list, {id:state.deviceList.selected}) || _find(state.deviceList.slist, {id:state.deviceList.selected})),
  token: state.loginUser && state.loginUser.token,
  initialLogin: !state.loginUser || !state.loginUser.token
}), dispatch=>({
  action: bindActionCreators({
    useToken: action.useToken
  },dispatch)
}))(App);

class AppWarp extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
      store: configStore(()=>this.setState({isLoading:false}))
    }

    this._handleAppStateChange = this.handleAppStateChange.bind(this);
    this._handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange);
	  BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);

    if(!__DEV__){
      codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  handleAppStateChange(appState){
    if (appState === 'active') {
      if(!__DEV__){
        codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
      }

    }
  }

  handleBackButton(){
/*
    {
      if(!first){
        first = new Date().getTime();
        ToastAndroid.show('再按一次退出应用', 1000);
        setTimeout(function() {
            first=null;
        }, 1000);
      }else{
        if (new Date().getTime() - first < 1000) {
            BackAndroid.exitApp();
        }
      }
    }
    */
    {
      Actions.pop();
    }

    return true;
  }
  render() {
    if(this.state.isLoading){
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <AppWithRedux />
      </Provider>

    );
  }
}

export default AppWarp;
