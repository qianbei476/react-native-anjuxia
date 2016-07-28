import React, { Component } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import action from '../action';
import IconFont from '../IconFont';


class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:false
    };
  }

  componentDidMount(){
    this.setState({refreshing:true});
    this.props.action.bbsPage({pageNo:1,pageSize:10}).then(action=>{
      this.setState({refreshing:false});
    });
  }

  onRefresh(){
    this.setState({refreshing:true});
    this.props.action.bbsPage({pageNo:1,pageSize:10}).then(action=>{
      this.setState({refreshing:false});
    });
  }

  render(){
    return (
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>}
          >
          {this.state.imageUrl?(
            <Modal onRequestClose={()=>null}>
              <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({imageUrl:''})}>
                <Image style={{flex:1}} resizeMode="contain" source={{uri:this.state.imageUrl}} />
              </TouchableOpacity>
            </Modal>
          ):null}

          {this.props.bbs.list.map((o)=>{
            return (<View key={o.id} style={{borderBottomWidth:1, borderColor:'#BCBCBC',marginTop:2}}>
              <View style={{flexDirection:'row', marginTop:10, marginLeft:5,marginRight:5}}>
                <Image source={require('./img/defaultIcon.png')} style={{width:40,height:40,marginLeft:5}} />
                <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                <Text style={{fontSize:18,color:'#000',marginTop:5}}>{o.createName}</Text>

                </View>
                <Text style={{fontSize:15,color:'#8A8A8A'}}>{o.createDate}</Text>
              </View>
              <Text style={{marginLeft:8,marginTop:5}}>{o.content}</Text>
              <View style={{flexDirection:'row',marginLeft:5,marginRight:5,marginTop:5}}>
              {o.imageList.map((o2)=>{
                return (
                  <TouchableOpacity key={o2.image} onPress={()=>this.setState({imageUrl:'http://www.tdong.cn/'+o2.image})}>
                  <Image style={{width:115,height:115,margin:1}} resizeMode="contain" source={{uri:'http://www.tdong.cn/'+o2.image}}  />
                  </TouchableOpacity>
                );
              })}
              </View>


              <View style={{flexDirection:'row',alignSelf:'flex-end',marginTop:10,marginRight:5}}>

              <View style={{justifyContent:'center'}}>
                {false?(
                  <IconFont name='appreciate' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
                ):null}

              </View>

                <TouchableOpacity onPress={()=>Actions.bbsAddReply({id:o.id})} style={{marginLeft:20,marginRight:10}}>
                <View style={{justifyContent:'center'}}>
                  <IconFont name='talk1' style={{backgroundColor:'transparent'}} size={20} color='#7F7F7F' />
                </View>
                </TouchableOpacity>

              </View>

              <View style={{marginBottom:10, marginLeft:5,marginRight:5}}>
                {o.replyList.map((o2)=>{
                  return (<View key={o2.id}>
                    <Text>
                    <Text style={{fontSize:15,color:'#3668BE'}}>{o2.createName||'匿名'}:</Text>
                    <Text style={{fontSize:15,color:'#000'}}>{o2.content}</Text></Text>
                  </View>);
                })}
              </View>
            </View>)
          })}
        </ScrollView>
      );
  }
}

export default connect(state=>({
  bbs: state.bbs
}),dispatch=>({
  action: bindActionCreators({
    bbsPage: action.bbsPage
  }, dispatch)
}))(V);
