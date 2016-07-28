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

import IconFont from '../IconFont';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.texts = [
      '太给力了~~~','神马都是浮云！','这空气质量，我也是醉了',
      '画面太美，不敢看','PM2.5要爆表了！','空气质量真好，羡慕嫉妒恨！',
      '空气质量真好，亮瞎了钛合金眼','空气质量真差，我要逃离地球！','空气质量真差，吓死宝宝了'
    ]
  }
  componentDidMount(){
  }

  onPressReplay(id, msg){
    this.props.action.bbsAddReply({
      id, content:msg, address:''
    }).then(action=>{
      if(!action.error) Actions.pop();
    });
  }

  render(){
    return (
      <View>
        {this.texts.map((o,i)=>{
          return (
            <TouchableOpacity key={i} style={{
                height:45, marginTop:1,
                flexDirection:'row',
                backgroundColor:'#fff'}} onPress={this.onPressReplay.bind(this, this.props.id,o)}>
                <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
                  <Text style={{color:'#000',fontSize:15}}>{o}</Text>
                </View>
            </TouchableOpacity>
          );
        })}

      </View>);
  }
}

export default connect(state=>({
}),dispatch=>({
  action: bindActionCreators({
    bbsAddReply: action.bbsAddReply
  }, dispatch)
}))(V);
