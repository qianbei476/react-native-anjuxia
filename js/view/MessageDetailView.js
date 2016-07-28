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
    this.props.action.adviceList();
  }
  render(){
    let typeInfo = {'1':{name:'问题反馈',iconColor:'#11B3E7'},'2':{name:'使用咨询', iconColor:'#D5EA24'},'3':{name:'产品建议',iconColor:'#EA8624'}};
    let o = this.props.data;
    o.type = o.type || '1';
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
        <View style={{backgroundColor:'#fff', borderRadius:3}}>
          <View style={{marginTop:15,alignItems:'center'}}>
            <Text >{typeInfo[o.type].name}</Text>
          </View>
          <View style={{marginTop:15, marginBottom:15, marginHorizontal:15}}>
            <Text>我:{o.content}</Text>
            {o.reply ? (
              <Text>安居侠:{o.reply}</Text>
            ) : null}
          </View>


          <TouchableOpacity onPress={Actions.pop} style={{
              width:260,height:40,
              backgroundColor:'#18B4ED', alignItems:'center', justifyContent:'center',
              borderBottomRightRadius:3, borderBottomLeftRadius:3
            }}>
            <Text style={{fontSize:15, color:'#fff'}}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>);
  }
}

export default connect(state=>({
  adviceList: state.adviceList.list
}),dispatch=>({
  action: bindActionCreators({
    adviceList: action.adviceList
  }, dispatch)
}))(V);
