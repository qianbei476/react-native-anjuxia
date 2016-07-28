import React, { Component } from 'react';
import {
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeModules
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

import IconFont from '../IconFont';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
    if(this.props.loginForm.rememberPassword){
      this.state = {
        ...this.props.loginForm
      };
    }

  }

  onPressLogin(){
    let { username, password, rememberPassword } = this.state;
    this.props.action.login({username, password, rememberPassword})
      .then(action=>{
        if(!action.error){
          Actions.main();
        }
      });
  }
  onPressQQ(){
    this.props.action.qqLogin().then(({payload:qqcode})=>this.props.action.codeLogin({qqcode}))
    .then(action=>{
      if(!action.error){
        Actions.main();
      }
    });
  }

  onPressWechat(){
    this.props.action.wechatLogin().then(({payload:weixincode})=>this.props.action.codeLogin({weixincode}))
    .then(action=>{
      if(!action.error){
        Actions.main();
      }
    });
  }

  render() {
    return (
      <View>
        <View style={{flex:1, height:100, alignItems:'center', marginTop:50}}>
          <Image style={{width:206, height:60}} resizeMode='contain' source={require('./img/logo_landing.png')} />
        </View>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            height:45,
            marginHorizontal:15, marginTop:10,
            borderRadius:3,
            backgroundColor:'#fff'
          }}>
          <IconFont name="my" style={{backgroundColor:'transparent', marginLeft:10}} size={20} color="#BABABA" />
          <TextInput style={{
              flex:1,
              marginLeft:10,
              backgroundColor:'transparent',
            }} onChangeText={(username)=>this.setState({username})} value={this.state.username} />
        </View>

        <View style={{
            flexDirection:'row',
            alignItems:'center',
            height:45,
            marginHorizontal:15, marginTop:1,
            borderRadius:3,
            backgroundColor:'#fff'
          }}>
          <IconFont name="password" style={{backgroundColor:'transparent', marginLeft:10}} size={20} color="#BABABA" />
          <TextInput secureTextEntry={true} style={{
              flex:1,
              marginLeft:10,
              backgroundColor:'transparent',
            }} onChangeText={(password)=>this.setState({password})} value={this.state.password} />
        </View>

        <View style={{marginHorizontal:15, marginTop:15, height:40,flexDirection:'row', alignItems:'center'}}>
          <Switch style={{backgroundColor:'transparent'}} onValueChange={(rememberPassword)=>this.setState({rememberPassword})} value={this.state.rememberPassword} />
          <Text style={{flex:1,marginLeft:10,fontSize:16}}>记住密码</Text>
        </View>

        {this.props.loginForm.newAccount ?
        <View style={{
            height:20,
            marginHorizontal:15, marginVertical:5,
            borderRadius:3,
            backgroundColor:this.props.loginStatus.isError?'#f00':'#0f0',
            justifyContent:'center'}}>
          <Text style={{ marginLeft:10, backgroundColor:'transparent', color:'#fff'}}>{this.props.loginStatus.msg}</Text>
        </View>
        :null}

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:25,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressLogin.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>登录</Text>
        </TouchableOpacity>
        <View style={{
            flexDirection:'row',
            marginHorizontal:20,
            justifyContent:'space-between'}}>
          <TouchableOpacity onPress={Actions.resetPassword}>
            <Text style={{marginHorizontal:20, marginVertical:15, color:'#419BF9', fontSize:14}}>忘记密码</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={Actions.register}>
            <Text style={{marginHorizontal:20, marginVertical:15, color:'#419BF9', fontSize:14}}>用户注册</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{borderTopWidth:1,flex:1, marginHorizontal:15, borderColor:'#C3C3C3'}} />
          <Text style={{color:'#C3C3C3',fontSize:14}}>其他账号登陆</Text>
          <View style={{borderTopWidth:1,flex:1, marginHorizontal:15, borderColor:'#C3C3C3'}} />
        </View>

        <View style={{marginTop:45,flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={{
              alignItems:'center', justifyContent:'center',
              backgroundColor:'#319BFD',
              height:44,width:44,
              marginRight:22,
              borderRadius:22}} onPress={this.onPressQQ.bind(this)}>
              <IconFont name="qq" style={{backgroundColor:'transparent'}} size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{
              alignItems:'center', justifyContent:'center',
              backgroundColor:'#12DF26',
              height:44,width:44,
              marginLeft:22,
              borderRadius:22}} onPress={this.onPressWechat.bind(this)}>
              <IconFont name="wechat" style={{backgroundColor:'transparent'}} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    login: action.login,
    codeLogin: action.codeLogin,
    qqLogin: action.qqLogin,
    wechatLogin: action.wechatLogin
  }, dispatch)
}))(V);
