import React, { Component } from 'react';
import {
  Image,
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
  render(){
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <Image style={{flex:1,height:260}} source={{uri:this.props.image}} resizeMode='contain' />

        <View style={{marginTop:0,flexDirection:'row', justifyContent:'center'}}>
          <TouchableOpacity style={{width:80, alignItems:'center'}} onPress={()=>this.props.action.wechatShareSession({imageUri:this.props.image})}>
            <View style={{width:45,height:45,backgroundColor:'#F2F2F2',justifyContent:'center',alignItems:'center',borderRadius:5}}>
            <Image source={require('./img/wechat.png')} />
            </View>
            <Text style={{fontSize:11}}>微信好友</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80, alignItems:'center'}} onPress={()=>this.props.action.wechatShareTimeline({imageUri:this.props.image})}>
            <View style={{width:45,height:45,backgroundColor:'#F2F2F2',justifyContent:'center',alignItems:'center',borderRadius:5}}>
            <Image source={require('./img/friend.png')} />
            </View>
            <Text style={{fontSize:11}}>微信朋友圈</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80, alignItems:'center'}} onPress={()=>Actions.bbsAdd({imageUri:this.props.image})}>
            <View style={{width:45,height:45,backgroundColor:'#F2F2F2',justifyContent:'center',alignItems:'center',borderRadius:5}}>
            <Image source={require('./img/Page1.png')} />
            </View>
            <Text style={{fontSize:11}}>安居吧</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#F2F2F2',height:30}}
          onPress={Actions.pop}>
          <Text style={{fontSize:20}} >取消</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    wechatShareSession: action.wechatShareSession,
    wechatShareTimeline: action.wechatShareTimeline
  }, dispatch)
}))(V);
