import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import action from '../action';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing : false
    };
  }

  componentDidMount(){
    this.setState({refreshing:true});
    this.props.action.deviceShareList().then(()=>{this.setState({refreshing:false})});
  }

  onRefresh(){
    this.setState({refreshing:true});
    this.props.action.deviceShareList().then(()=>{this.setState({refreshing:false})});
  }

  render(){
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}>
        {this.props.shareList.map(o=>{
          return o.deviceShareList && o.deviceShareList.map(o2=>{
            return (
              <TouchableOpacity key={o.id + ',' + o2.userId} style={{
                  height:45, marginTop:1,
                  flexDirection:'row',
                  backgroundColor:'#fff'}} onPress={()=>this.props.action.deviceUnshare({deviceId:o.id,userId:o2.userId})}>
                  <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                    <Text style={{fontSize:15}}>{o.name}{o.id} 分享给 {o2.userName}</Text>
                  </View>
              </TouchableOpacity>
            );
          });
        })}
      </ScrollView>
    );
  }
}

export default connect(state=>({
  shareList: state.shareList
}),dispatch=>({
  action: bindActionCreators({
    deviceShareList: action.deviceShareList,
    deviceUnshare: action.deviceUnshare
  }, dispatch)
}))(V);
