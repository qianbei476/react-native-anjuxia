import React, { Component } from 'react';
import {
  AppState,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

import _filter from 'lodash/filter';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
    };

    this._handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount(){
    this.props.action.deviceRefresh();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  onRefresh(){
    this.props.action.deviceRefresh();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  handleAppStateChange(appState){
    if (appState === 'active') {
      this.props.action.deviceRefresh();
    }
  }

  renderDevice(o, i){
    let desc = (o.online == 'on') ? `PM2.5:${o.data.pm25}ug/m³` : `PM2.5:    ug/m³`;
    //let desc = `PM2.5:${o.data.pm25 || '  '}ug/m³`;
    return (
      <TouchableOpacity onPress={()=>{this.props.action.selectDevice(o.id);Actions.device()}} style={{borderRadius:5, marginTop:10,marginLeft:i%2?5:10, marginRight:i%2?10:5,borderWidth:1, borderColor:'#bbb',height:150,alignItems:'center'}}>

        <Image style={{width:80, height:80, margin:10}} resizeMode='contain' source={o.online == 'on' ? require('./img/ajx_online.png') : require('./img/ajx_offline.png') } />
        <View style={{flex:1}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16}}>{o.name}</Text>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#888'}}>{desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

  }

  render(){
    const {height, width} = Dimensions.get('window');
    const cellWidth = width / 2;
    let maxItem = _.size(this.props.deviceList);
    return (
      <View style={{flex:1}}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.props.refreshing || false} onRefresh={this.onRefresh.bind(this)}/>}
          style={{flex:1}}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {_.map(this.props.deviceList,(o,i)=>(
              <View key={i} style={{width:cellWidth}}>
                {this.renderDevice(o, i)}
              </View>
            ))}

            <View key={9999} style={{width:cellWidth}}>
              <TouchableOpacity
               onPress={Actions.deviceAdd} style={{alignItems:'center', justifyContent:'center',borderRadius:5, marginTop:10,marginLeft:maxItem%2?5:10, marginRight:maxItem%2?10:5,borderWidth:1, borderColor:'#bbb',height:150}}>
                <Text style={{
                  fontSize:60,
                  color:'#00ABF0'
                }}>+</Text>
                <Text style={{color:'#00ABF0',fontSize:16}}>添加设备</Text>
              </TouchableOpacity>
            </View>


          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state=>({
  refreshing: state.deviceList.refreshing,
  deviceList: [..._filter(state.deviceList.list, o=>!o.unbind), ...state.deviceList.slist]
}),dispatch=>({
  action: bindActionCreators({
    deviceRefresh: action.deviceRefresh,
    selectDevice: action.selectDevice
  }, dispatch)
}))(V);
