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
      name: this.props.name
    };
  }
  componentDidMount(){
  }

  onPressSubmit(){
    let {name} = this.state;
    this.props.action.userUpdate({name}).then(action=>{
      if(!action.error) Actions.pop();
    })
  }
  render(){
    return (
      <View>

        <View style={{
            height:45, marginTop:10,
            flexDirection:'row',
            backgroundColor:'#fff'}}>
            <TextInput onChangeText={name=>this.setState({name})} style={{flex:1}} value={this.state.name}/>
        </View>

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:15, marginTop:5,
            borderRadius:3,
            backgroundColor:'#18B4ED',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>提交</Text>
        </TouchableOpacity>


      </View>);
  }
}

export default connect(state=>({
  name: state.loginUser.name
}))(V);

export default connect(state=>({
  name: state.loginUser.name
}),dispatch=>({
  action: bindActionCreators({
    userUpdate: action.userUpdate,
  }, dispatch)
}))(V);
