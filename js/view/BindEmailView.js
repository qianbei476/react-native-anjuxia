import React, { Component } from 'react';
import {
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

  onPressCode(){
    let {email} = this.state;
    this.props.action.bindEmailCode({email});
  }

  onPressSubmit(){
    let {email, code} = this.state;

    this.props.action.bindEmail({
      email, code
    }).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',marginHorizontal:15,
            borderTopLeftRadius:3,borderTopRightRadius:3,
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={email=>this.setState({email})} style={{flex:1, marginHorizontal:10}} placeholder='邮箱'/>
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
              backgroundColor:'#FF5E45',
              borderBottomRightRadius:3,
            }} onPress={this.onPressCode.bind(this)}>
            <Text style={{marginHorizontal:10,color:'#fff',fontSize:16}}>获取验证码</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:20,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>提交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    bindEmail: action.bindEmail,
    bindEmailCode: action.bindEmailCode
  }, dispatch)
}))(V);
