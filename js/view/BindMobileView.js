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

class V extends Component {
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
    let { mobile, code} = this.state;
    return !(mobile && code);
  }

  onPressCode(){
    let {mobile} = this.state;
    this.setState({mobile_second:120});
    if(this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.updateSecond.bind(this), 1000);
    this.props.action.mobileCode({mobile});
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

  onPressSubmit(){
    let {mobile, code} = this.state;

    this.props.action.bindMobile({
      mobile, code
    }).then(action=>{
      if(!action.error)
      {
         Alert.alert('绑定成功');
         Actions.pop();
      }
      else
      {
         Alert.alert('绑定失败');
      }
    })
  }
  render(){
    let { mobile_second } = this.state;
    let btnText = mobile_second ? `重新获取(${this.state.mobile_second})` : '获取验证码';

    return (
      <View>
        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',marginHorizontal:15,
            borderTopLeftRadius:3,borderTopRightRadius:3,
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={mobile=>this.setState({mobile})} style={{flex:1, marginHorizontal:10,
              backgroundColor:'transparent'}} placeholder='手机号'/>
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
            marginHorizontal:15, marginTop:20,
            borderRadius:3,
            backgroundColor:this.isDisabledReg()?'#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} disabled={this.isDisabledReg()} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>绑定</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    bindMobile: action.bindMobile,
    mobileCode: action.mobileCode
  }, dispatch)
}))(V);
