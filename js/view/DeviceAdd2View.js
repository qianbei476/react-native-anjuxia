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
    this.state = {
      second:0,
      key: props.defaultKey
    };
  }
  componentDidMount(){
    this.props.action.getCurrentWifiSSID();

    this._interval = setInterval(this.updateTick.bind(this), 1000);
  }

  componentWillReceiveProps(nextProps)
  {
    if(!this.inputKey)
      this.setState({key:nextProps.defaultKey});
  }

  updateTick(){
    let { second } = this.state;
    if(second > 0){
      second--;
      this.setState({second});
    }else if(second == 0){
      this.props.action.stopWifiConfig();
      second--;
      this.setState({second});
    }

  }
  componentWillUnmount(){
    if(this._interval){
      clearInterval(this._interval);
    }

    this.props.action.stopWifiConfig();
  }

  disabledSubmit(){
    let { second } = this.state;
    return second > 0;
  }

  onPressConfig(){
    let { ssid } = this.props;
    let { key } = this.state;
    this.props.action.startWifiConfig({ssid, key})
    .then(action=>{
      if(!action.error){
        let code = action.payload;
        Actions.deviceAdd3({code});
      }
    });
    this.setState({second:120});
  }
  render(){
    return (
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>当前网络</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>{this.props.ssid}</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={key=>this.setState({key,inputKey:true})} style={{flex:1,marginLeft:15,marginRight:15,
              backgroundColor:'transparent'}} value={this.state.key} placeholder='请输入当前wifi密码'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginLeft:15, marginRight:15,
            marginHorizontal:15, marginTop:15,
            borderRadius:3,
            backgroundColor: this.disabledSubmit()? '#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} disabled={this.disabledSubmit()} onPress={this.onPressConfig.bind(this)} >
          <Text style={{color:'#fff',fontSize:18}}>配置 {this.state.second > 0 ? this.state.second : ''}</Text>
        </TouchableOpacity>

        <Text style={{flex:1, marginHorizontal:15, marginTop:50,fontSize:18}}>
          如果wifi指示图标开始闪烁，则产品处于一键配置模式，输入wifi密码，再点击配置网络，等待设备连接；
          如果未出现wifi指示图标，则产品处于离线模式，需要长按功能键5s以上，松开时进入一键配置模式。配置成功后wifi指示图标常亮。
        </Text>

      </View>);
  }
}

export default connect(state=>({
  ssid: state.wifi.name,
  defaultKey: state.wifi.name ? (state.wifiConfig[state.wifi.name] || '') : '',
}),dispatch=>({
  action: bindActionCreators({
    getCurrentWifiSSID: action.getCurrentWifiSSID,
    startWifiConfig: action.startWifiConfig,
    stopWifiConfig: action.stopWifiConfig
  }, dispatch)
}))(V);
