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

  updateSecond(){
    let { second } = this.state;
    if(second > 0){
      second--;
      this.setState({second});
    }else{
      clearInterval(this.interval);
    }
  }

  onPressCode(){
    let {username:mobile} = this.state;
    this.setState({second:120});
    if(this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.updateSecond.bind(this), 1000);
    this.props.action.mobileCode({mobile});
  }

  isDisabledCode(){
    let { username, second = 0 } = this.state;
    return !(username && !second);
  }

  isDisabledReset(){
    let { username, newPassword, code} = this.state;
    return !(username && newPassword && code);
  }

  onPressSubmit(){
    let { username, newPassword, code} = this.state;
    this.props.action.forgetPassword({username, newPassword, code}).then(action=>{
      if(!action.error)
      {
            if(this.interval) clearInterval(this.interval);
            Alert.alert('重置成功');
            Actions.pop();
      }
      else
      {
            if(action.payload.msg)
              Alert.alert(action.payload.msg);
            else
              Alert.alert('重置失败');
      }

    });
  }
  render(){
    let { second } = this.state;
    let btnText = second ? `重新获取(${this.state.second})` : '获取验证码';

    return (<View style={[this.props.styel]}>
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
          }} onChangeText={username=>this.setState({username})} placeholder='手机号' />
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
          }} onChangeText={newPassword=>this.setState({newPassword})} placeholder='密码' />
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
          backgroundColor:this.isDisabledReset()?'#888':'#18B4ED',
          alignItems:'center', justifyContent:'center'
        }} disabled={this.isDisabledReset()} onPress={this.onPressSubmit.bind(this)} >
        <Text style={{ color:'#fff',fontSize:18}}>确定</Text>
      </TouchableOpacity>

    </View>);
  }
}
let ByMobile = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    forgetPassword: action.forgetPassword,
    mobileCode: action.mobileCode
  }, dispatch)
}))(V1);

class V2 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }

  componentWillUnmount(){
    if(this.interval) clearInterval(this.interval);
  }

  updateSecond(){
    let { second } = this.state;
    if(second > 0){
      second--;
      this.setState({second});
    }else{
      clearInterval(this.interval);
    }
  }

  onPressCode(){
    let {username:email} = this.state;
    this.setState({second:120});
    if(this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.updateSecond.bind(this), 1000);
    this.props.action.emailCode({email});
  }

  isDisabledCode(){
    let { username, second = 0 } = this.state;
    return !(username && !second);
  }

  isDisabledReset(){
    let { username, newPassword, code} = this.state;
    return !(username && newPassword && code);
  }

  onPressSubmit(){
    let { username, newPassword, code} = this.state;
    this.props.action.forgetPassword({username, newPassword, code}).then(action=>{
      if(!action.error)
      {
           if(this.interval) clearInterval(this.interval);
           Alert.alert('重置成功');
           Actions.pop();
      }
      else {
           Alert.alert('重置失败');
      }
    });
  }
  render(){
    let { second } = this.state;
    let btnText = second ? `重新获取(${this.state.second})` : '获取验证码';

    return (<View>
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
          }} onChangeText={username=>this.setState({username})} placeholder='邮箱' />
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
          }} onChangeText={newPassword=>this.setState({newPassword})} placeholder='密码' />
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
          backgroundColor:this.isDisabledReset()?'#888':'#18B4ED',
          alignItems:'center', justifyContent:'center'
        }} disabled={this.isDisabledReset()} onPress={this.onPressSubmit.bind(this)} >
        <Text style={{ color:'#fff',fontSize:18}}>确定</Text>
      </TouchableOpacity>
    </View>)
  }
}

let ByEmail = connect(state=>state,dispatch=>({
  action: bindActionCreators({
    forgetPassword: action.forgetPassword,
    emailCode: action.emailCode
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
            title:'手机找回',component:ByMobile
          },{
            title:'邮箱找回',component:ByEmail
          }].map(o=>{
            return (
              <TouchableOpacity key={o.title} style={{
                  flex:1,
                  alignItems:'center', justifyContent:'center'}}
                  onPress={()=>this.setState({component:o.component})}>
                <Text style={{color: (this.state.component == o.component) ? 'red' : '#18B4ED', fontSize:16}}>{o.title}</Text>
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
