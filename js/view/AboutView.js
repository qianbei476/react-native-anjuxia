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

import IconFont from '../IconFont';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }
  /*render(){
    return (
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>微信公众号</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>安居侠</Text>
            </View>
        </View>

        <View style={{
            height:45, marginTop:1,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <View style={{flex:1,justifyContent:'center', marginLeft:15}}>
              <Text style={{fontSize:15}}>客服电话</Text>
            </View>
            <View style={{justifyContent:'center', marginRight:15}}>
              <Text>400 880 6306</Text>
            </View>
        </View>

      </View>);
  }*/
  render(){
    return (
      <View style={{flex:1}}>

        <View style={{backgroundColor:'#eee', flex:1}}>

          <View style={{height:100,alignItems:'center', marginTop:60}}>
            <Image style={{width:206, height:60}} resizeMode='contain' source={require('./img/logo_landing.png')} />
            <Text style={{marginTop:5}}>1.0.3</Text>
          </View>

          <TouchableOpacity style={{marginTop:1,height:40, backgroundColor:'#fff', flexDirection:'row'}}>
            <View style={{justifyContent:'center', marginLeft:20,width:30}}>
              <IconFont style={{backgroundColor:'transparent'}} name='my' color='#bbb' size={20} />
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:10}}>
              <Text style={{fontSize:16}}>功能介绍</Text>
            </View>
            <View style={{width:48, justifyContent:'center',alignItems:'flex-end', marginRight:15}}>
              <IconFont name='right' color='#bbb' size={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:20,height:40, backgroundColor:'#fff', flexDirection:'row'}}>
            <View style={{justifyContent:'center', marginLeft:20,width:30}}>
              <IconFont style={{backgroundColor:'transparent'}} name='my' color='#bbb' size={20} />
            </View>
            <View style={{flex:1,justifyContent:'center',marginLeft:10}}>
              <Text style={{fontSize:16}}>微信公众号：安居侠</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:20,height:40, backgroundColor:'#fff', flexDirection:'row'}}>
            <View style={{justifyContent:'center', marginLeft:20,width:30}}>
              <IconFont style={{backgroundColor:'transparent'}} name='kefu' color='#bbb' size={20} />
            </View>
            <View style={{flex:1,justifyContent:'center', marginLeft:10}}>
              <Text style={{fontSize:16}}>客服电话：4008 806 306</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default connect(state=>state)(V);
