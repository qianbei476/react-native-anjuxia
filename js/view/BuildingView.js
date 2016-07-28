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
      <View style={{flex:1,justifyContent:'center', alignItems:'center',backgroundColor:'#d2dbe2'}}>
        <Image source={require('./img/building.jpg')} style={{height:300}} resizeMode='contain' />
      </View>);
  }
}

export default connect(state=>state)(V);
