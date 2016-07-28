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
import Toast from 'react-native-toast';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }

  disabledSubmit(){
    let { oldPassword, newPassword, newPassword2 } = this.state;
    return !oldPassword || !newPassword || !newPassword2;
  }

  onPressSubmit(){
    let {oldPassword,newPassword, newPassword2} = this.state;
    let err = (newPassword != newPassword2 && '两次密码不一致');

    if(err){
      Toast.showShortBottom(err);
    }
    else
    {
      this.props.action.userUpdatePassword({oldPassword, newPassword}).then(action=>{
        if(action.error)
        {
          Toast.showShortBottom(action.payload.msg);
        }
        else
        {
          Toast.showShortBottom('密码修改成功');
          Actions.pop();
        }
      });
    }
  }
  render(){
    return (
      <View>
        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            borderTopLeftRadius:3,borderTopRightRadius:3,
            backgroundColor:'#fff'}}>
            <TextInput secureTextEntry={true} onChangeText={oldPassword=>this.setState({oldPassword})} style={{flex:1, marginHorizontal:10,
	     backgroundColor:'transparent'}} placeholder='请输入原密码'/>
        </View>

        <View style={{
            height:45, marginTop:1,
            borderBottomLeftRadius:3, borderBottomRightRadius:3,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput secureTextEntry={true} onChangeText={newPassword=>this.setState({newPassword})} style={{flex:1, marginHorizontal:10,
	     backgroundColor:'transparent'}} placeholder='请输入新密码(6~16位)'/>
        </View>

        <View style={{
            height:45, marginTop:1,
            borderBottomLeftRadius:3, borderBottomRightRadius:3,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput secureTextEntry={true} onChangeText={newPassword2=>this.setState({newPassword2})} style={{flex:1, marginHorizontal:10,
	     backgroundColor:'transparent'}} placeholder='请确认新密码'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:15,
            borderRadius:3,
            backgroundColor: this.disabledSubmit()? '#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} disabled={this.disabledSubmit()} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>提交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    userUpdatePassword: action.userUpdatePassword,
  }, dispatch)
}))(V);
