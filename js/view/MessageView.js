import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IconFont from '../IconFont';

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

  componentDidMount(){
    this.props.action.adviceList();
  }

  onRefresh(){
    this.props.action.adviceList();
  }
  render(){
    let typeInfo = {'1':{name:'问题反馈',iconColor:'#11B3E7'},'2':{name:'使用咨询', iconColor:'#D5EA24'},'3':{name:'产品建议',iconColor:'#EA8624'}};
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={this.props.refreshing || false} onRefresh={this.onRefresh.bind(this)}/>}
        >
        {this.props.adviceList.map(o=>{
          return (<TouchableOpacity onPress={()=>Actions.messageDetail({data:o})} key={o.id} style={{flexDirection:'row', backgroundColor:'#fff', marginTop:1}}>
            <View style={{backgroundColor:typeInfo[o.type || '1'].iconColor,width:42,height:42, marginLeft:15, marginVertical:10,alignItems:'center', justifyContent:'center'}}>
              <IconFont style={{backgroundColor:'transparent'}} name='my' color='#fff' size={36} />
            </View>
            <View style={{marginLeft:15}}>
              <Text style={{fontSize:14, color:'#000', marginTop:10, flex:1}}>{typeInfo[o.type || '1'].name}</Text>
              <Text style={{marginBottom:10,fontSize:14,color:'#8A8A8A'}}>{o.reply || o.content}</Text>
            </View>

          </TouchableOpacity>);
        })}
      </ScrollView>);
  }
}

export default connect(state=>({
  refreshing: state.adviceList.refreshing,
  adviceList: state.adviceList.list
}),dispatch=>({
  action: bindActionCreators({
    adviceList: action.adviceList
  }, dispatch)
}))(V);
