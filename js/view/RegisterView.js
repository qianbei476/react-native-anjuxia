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

class V1 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }

  componentWillUnmount(){
    if(this.interval) clearInterval(this.interval);
  }

  isDisabledCode(){
    let { mobile, mobile_second = 0 } = this.state;
    return !(mobile && !mobile_second);
  }

  isDisabledReg(){
    let { mobile, password, code} = this.state;
    return !(mobile && password && code);
  }

  updateSecond(){

    let { mobile_second } = this.state;
    if(mobile_second > 0){
      mobile_second--;
      this.setState({mobile_second});
    }else{
      clearInterval(this.interval);
    }
  }

  onPressCode(){
    let { mobile } = this.state;
    this.setState({mobile_second:120});
    if(this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.updateSecond.bind(this), 1000);
    this.props.action.mobileCode({mobile});
  }

  onPressSubmit(){
    let { mobile, password,code} = this.state;
    this.props.action.register({mobile, password,code}).then(action=>{
      if(!action.error)
      {
         Alert.alert('注册成功');
         Actions.pop();
      }
      else
      {
         Alert.alert('注册失败');
      }
    });
  }
  render(){
    let { mobile_second } = this.state;
    let btnText = mobile_second ? `重新获取(${this.state.mobile_second})` : '获取验证码';

    return (
      <View style={[this.props.styel]}>
        <View style={{
            height:45,
            marginHorizontal:15, marginTop:50,
            borderTopRightRadius:3,borderTopLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={mobile=>this.setState({mobile})} placeholder='手机号' />
        </View>

        <View style={{
            height:45,
            marginHorizontal:15, marginTop:1,
            backgroundColor:'#fff'
          }}>
          <TextInput secureTextEntry={true} style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={password=>this.setState({password})} placeholder='密码' />
        </View>

        <View style={{
            flexDirection:'row',
            height:45,
            marginHorizontal:15, marginTop:1,
            borderBottomRightRadius:3,borderBottomLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={code=>this.setState({code})} placeholder='验证码' />
          <TouchableOpacity style={{
              justifyContent:'center',
              backgroundColor:this.isDisabledCode()?'#888':'#FF5E45',
              borderBottomRightRadius:3,
            }} disabled={this.isDisabledCode()} onPress={this.onPressCode.bind(this)}>
            <Text style={{marginHorizontal:10,color:'#fff',fontSize:16}}>{btnText}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:25,
            borderRadius:3,
            backgroundColor:this.isDisabledReg()?'#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} disabled={this.isDisabledReg()} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>注  册</Text>
        </TouchableOpacity>
      </View>);
  }
}
let ByMobile = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    register: action.register,
    mobileCode: action.mobileCode
  }, dispatch)
}))(V1);

class V2 extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  isDisabledRegByEmail(){
    let {email, password} = this.state;
    return !(email && password);
  }

  onPressSubmit(){
    let { email, password} = this.state;
    this.props.action.registerEmail({email, password}).then(action=>{
      if(!action.error)
      {
        Alert.alert('注册成功，请登录邮箱激活帐号');
        Actions.pop();
      }
      else
      {
        if(action.payload.msg)
          Alert.alert(action.payload.msg);
        else
          Alert.alert('注册失败');
      }
    });
  }
  render(){
    return (
      <View style={[this.props.styel]}>
        <View style={{
            height:45,
            marginHorizontal:15, marginTop:50,
            borderTopRightRadius:3,borderTopLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={email=>this.setState({email})} placeholder='邮箱' />
        </View>

        <View style={{
            height:45,
            marginHorizontal:15, marginTop:1,
            borderBottomRightRadius:3,borderBottomLeftRadius:3,
            backgroundColor:'#fff'
          }}>
          <TextInput secureTextEntry={true} style={{
              flex:1,
              marginHorizontal:5,
              backgroundColor:'transparent',
            }} onChangeText={password=>this.setState({password})} placeholder='密码' />
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:25,
            borderRadius:3,
            backgroundColor: this.isDisabledRegByEmail() ? '#888' :'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} disabled={this.isDisabledRegByEmail()} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>注  册</Text>
        </TouchableOpacity>
      </View>
      );
  }
}

let ByEmail = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    registerEmail: action.registerEmail
  }, dispatch)
}))(V2);

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      component: ByMobile
    };
  }
  componentDidMount(){
  }
  render(){
    const Form = this.state.component;
    return (
      <View>
        <View style={{flexDirection:'row', height:45, backgroundColor:'#fff', marginTop: 10}}>

          {[{
            title:'手机注册',component:ByMobile
          },{
            title:'邮箱注册',component:ByEmail
          }].map(o=>{
            return (
              <TouchableOpacity key={o.title} style={{
                  flex:1,
                  alignItems:'center', justifyContent:'center'}}
                  onPress={()=>this.setState({component:o.component})}>
                <Text style={{color:(this.state.component == o.component) ? 'red' : '#18B4ED', fontSize:16}}>{o.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{flex:1}}>
        <Form style={{marginTop:10}} />
        </View>

      </View>);
  }
}

export default connect(state=>state)(V);
