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
    let { username } = this.state;
    return !username;
  }

  onPressSubmit(){
    let {deviceId} = this.props;
    let {username} = this.state;
    this.props.action.deviceShare({
      deviceId,username
    }).then(action=>{
      if(!action.error)
      {
        Toast.showShortBottom('设备共享成功');
        Actions.pop();
      }
      else {
        Toast.showShortBottom(action.payload.msg);
      }
    })
  }
  render(){
    return (
      <View>

        <View style={{
            height:45, marginTop:10,

            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={username=>this.setState({username})} style={{flex:1,marginLeft:15,
              backgroundColor:'transparent'}} placeholder='对方的账号'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:15,
            borderRadius:3,
            backgroundColor: this.disabledSubmit()? '#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} disabled={this.disabledSubmit()} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{color:'#fff',fontSize:18}}>提交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>({
  deviceId: state.deviceList.selected
}),dispatch=>({
  action: bindActionCreators({
    deviceShare: action.deviceShare
  }, dispatch)
}))(V);
