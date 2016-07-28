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
    	type: 1
    };

  }
  componentDidMount(){
  }

  onPressSubmit(){
    let {type, content} = this.state;

    this.props.action.adviceSave({
      type,
      content
    }).then(action=>{
      if(!action.error){
        this.props.action.adviceList();
        Actions.pop();
      }
    })
  }
  render(){
    return (
      <View>

        <Text style={{marginTop:10, marginLeft:10,fontSize:14,color:'#8A8A8A'}}>选择你要反馈的问题类型</Text>

        <View style={{flexDirection:'row', marginTop:10}}>
          <TouchableOpacity style={{backgroundColor:this.state.type==1?'#18B4ED':'#fff', height:24, justifyContent:'center', marginLeft:10}} onPress={()=>this.setState({type:1})}>
            <Text style={{marginHorizontal:10,color:this.state.type==1?'#fff':'#707070'}}>问题反馈</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:this.state.type==2?'#18B4ED':'#fff', height:24, justifyContent:'center', marginLeft:10}} onPress={()=>this.setState({type:2})}>
            <Text style={{marginHorizontal:10,color:this.state.type==2?'#fff':'#707070'}}>使用咨询</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:this.state.type==3?'#18B4ED':'#fff',height:24, justifyContent:'center', marginLeft:10}} onPress={()=>this.setState({type:3})}>
            <Text style={{marginHorizontal:10,color:this.state.type==3?'#fff':'#707070'}}>产品建议</Text>
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor:'#fff', marginTop:10}}>
          <TextInput onChangeText={content=>this.setState({content})}
          multiline={true}
          style={{flex:1, marginHorizontal:10,height:182,backgroundColor:'transparent',textAlignVertical:'top'}} placeholder='请描述一下您的问题'/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:20,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>提交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    adviceSave: action.adviceSave,
    adviceList: action.adviceList
  }, dispatch)
}))(V);
