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
import _find from 'lodash/find';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      //name: this.props.device.name
    };
  }
  componentDidMount(){
  }

  disabledSubmit(){
    let {name} = this.state;
    return !name;
  }
  onPressSubmit(){
    let {code:device} = this.props.device;
    let {name} = this.state;
    this.props.action.deviceUpdateName({device,name}).then(action=>{
      if(!action.error)
      {
        Toast.showShortBottom('修改设备名称成功!!!');
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
            <TextInput onChangeText={name=>this.setState({name})} style={{flex:1, backgroundColor:'transparent'}}
              placeholder='请输入设备名称'/>
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

export default connect(state=>({
  name: state.loginUser.name
}))(V);

export default connect(state=>({
  device: _find(state.deviceList.list, {id:state.deviceList.selected})
}),dispatch=>({
  action: bindActionCreators({
    deviceUpdateName: action.deviceUpdateName,
  }, dispatch)
}))(V);
