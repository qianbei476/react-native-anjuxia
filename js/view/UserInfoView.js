import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

import IconFont from '../IconFont';
import Toast from 'react-native-toast';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }

  onPressMobile(){
    if(this.props.user.mobile){
      Alert.alert('确认','确认解绑此手机号码？', [
        {text:'取消'},
        {text:'确定',onPress:()=>this.props.action.unbindMobile().then(action=>{
          if(action.error){
            Toast.showShortBottom(action.payload.msg);
          }
          else{
            Toast.showShortBottom('解绑成功');
          }
        })}]);

    }else{
      Actions.bindMobile();
    }
  }
  onPressEmail(){
    if(this.props.user.email){
      this.props.action.unbindEmail();
    }else{
      Actions.bindEmail();
    }
  }

  onPressQQ(){
    if(this.props.user.qqcode){
      this.props.action.updateCode({qqcode:''});
    }
    else{
      this.props.action.qqLogin().then(({payload:qqcode})=>this.props.action.updateCode({qqcode}));
    }
  }

  onPressWechat(){
    if(this.props.user.weixincode){
      this.props.action.updateCode({weixincode:''});
    }else{
      this.props.action.wechatLogin().then(({payload:weixincode})=>this.props.action.updateCode({weixincode}));
    }
  }

  render(){
    return (
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>用户名</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text style={{color:'#979797', fontSize:14}}>{this.props.user.loginName}</Text>
            </View>
        </View>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.modifyName}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>真实姓名</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text style={{color:'#979797', fontSize:14}}>{this.props.user.name}</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressMobile.bind(this)}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>手机号</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text style={{color:'#979797', fontSize:14}}>{this.props.user.mobile || '未设置'}</Text>
            </View>

        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressEmail.bind(this)}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>邮箱</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text style={{color:'#979797', fontSize:14}}>{this.props.user.email || '未设置'}</Text>
            </View>

        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressQQ.bind(this)}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>QQ</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text style={{color:'#979797', fontSize:14}}>{this.props.user.qqcode ? '已绑定' : '未绑定'}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={this.onPressWechat.bind(this)}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>微信</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text style={{color:'#979797', fontSize:14}}>{this.props.user.weixincode ? '已绑定' : '未绑定'}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}} onPress={Actions.modifyPassword}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{color:'#000',fontSize:15}}>修改密码</Text>
            </View>
	          <View style={{justifyContent:'center', marginRight:15}}>
              <IconFont name='right' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
            height:45, marginTop:45, marginHorizontal:15,borderRadius:3,
            flexDirection:'row',
            backgroundColor:'#FF5E45'}} onPress={()=>{this.props.action.logout();Actions.login()}}>
            <View style={{flex:1,justifyContent:'center', alignItems:'center', marginLeft:15}}>
              <Text style={{fontSize:18, color:'#fff'}}>退出当前账号</Text>
            </View>
        </TouchableOpacity>
      </View>);
  }
}

export default connect(state=>({
  user:state.loginUser
}),dispatch=>({
  action: bindActionCreators({
    logout: action.logout,
    unbindEmail: action.unbindEmail,
    unbindMobile: action.unbindMobile,
    qqLogin: action.qqLogin,
    wechatLogin: action.wechatLogin,
    updateCode: action.updateCode,
  }, dispatch)
}))(V);
