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

import _find from 'lodash/find';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.props.action.versionGet({type:'hardware'}).then(action=>{
      if(!action.error){
        let { code:lastVersion, url, publishDate } = action.payload;
        let msg = `最新版本${lastVersion},\n\发布时间${publishDate}`;
        let currentVersion = this.props.device.version;
        this.setState({lastVersion, url, publishDate, msg});
        if(lastVersion > currentVersion)
        {
          this.setState({result:false});
        }
        else {
          this.setState({result:true});
        }
      }else{
        this.setState({msg:'获取版本失败'});
        this.setState({result:true});
      }

    });
  }

  onPressSubmit(){
    let { lastVersion, url } = this.state;
    let { code } = this.props.device;
    this.props.action.deviceOTA(code,lastVersion,url).then(action=>this.setState({msg:action.error?'升级失败':'升级成功'}));
  }
  render(){
    let {lastVersion} = this.state;
    let newMsg = `已为最新版本${lastVersion}`;

    return (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }}>

        <View style={{
          height:40,
          alignItems:'center',
          marginBottom:5
        }}>

        {
          this.state.result?(
            <View style={{justifyContent:'center'}}>
              <Text>{newMsg}</Text>
            </View>
        ):(
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:10,height:40}}>
               <Text style={{fontSize:16,alignItems:'center',textAlign:'center',lineHeight:28}}
               >{this.state.msg}</Text>
            </View>)
        }
        </View>

        <TouchableOpacity style={{
            height:40,
            width:100,
            marginHorizontal:15,
            borderRadius:3,
            backgroundColor:this.state.result?'#888':'#18B4ED',
            alignItems:'center', justifyContent:'center'
        }} disabled={this.state.result} onPress={this.onPressSubmit.bind(this)} >
          <Text style={{ color:'#fff',fontSize:18}}>立即升级</Text>
        </TouchableOpacity>





      </View>);
  }
}

export default connect(state=>({
  device: _find(state.deviceList.list, {id:state.deviceList.selected})
}),dispatch=>({
  action: bindActionCreators({
    versionGet: action.versionGet,
    deviceOTA: action.deviceOTA
  }, dispatch)
}))(V);
