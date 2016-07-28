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

import _reject from 'lodash/reject';
import _map from 'lodash/map';

import ImagePicker from 'react-native-image-picker';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageList: []
    };
  }
  componentDidMount(){
    if(this.props.imageUri){
      let uri = this.props.imageUri;
      this.setState({imageList:[...this.state.imageList, {
        localPath: uri,
        serverPath: '',
        state: '上传中'
      }]});

      this.props.action.uploadImage({file:{uri,type:'image/jpg',name:uri}})
      .then(action=>{
        if(!action.error){
          this.setState({imageList: this.state.imageList.map(o=>{
            if(o.localPath != action.meta.file.uri) return o;
            o = {...o};
            o.serverPath = action.payload;
            o.state = '上传完成';
            return o;
          })});
        }
      });
    }
  }
  onPressSubmit(){
    let {content, imageList } = this.state;

    this.props.action.bbsAdd({content, images:_map(imageList,'serverPath').join(',')}).then(action=>{
      if(!action.error) Actions.pop();
    })
  }

  onSelectImage(){
    ImagePicker.showImagePicker({
      title: '选择', // specify null or empty string to remove the title
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: '从手机相册选择', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 100, // photos only
      maxHeight: 100, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.2, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    }, response=>{
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        console.log(response);
        // uri (on iOS)
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        //const source = {uri: response.uri, isStatic: true};

        let uri = response.uri;
        this.setState({imageList:[...this.state.imageList, {
          localPath: uri,
          serverPath: '',
          state: '上传中'
        }]});

        this.props.action.uploadImage({file:{uri,type:'image/jpg',name:uri}})
        .then(action=>{
          if(!action.error){
            this.setState({imageList: this.state.imageList.map(o=>{
              if(o.localPath != action.meta.file.uri) return o;
              o = {...o};
              o.serverPath = action.payload;
              o.state = '上传完成';
              return o;
            })});
          }
        });
      }
    });
  }
  onPressDeleteImage(localPath){
    this.setState({
      imageList: _reject(this.state.imageList,{localPath:localPath})
    })
  }
  render(){
    return (
      <View style={{marginTop:5,backgroundColor:'white'}}>

      <View style={{
        height:120,
        backgroundColor:'#F0EFF5',
      }}>
      <TextInput onChangeText={content=>this.setState({content})}
        style={{
        fontSize:18,
        backgroundColor:'transparent',
        borderWidth:0,
        textAlignVertical:'top',
        }}
        autoFocus={true}
        multiline={true}
        placeholder="说点什么吧..."
        numberOfLines={4}
        />
        </View>
      <View style={{height:190,backgroundColor:'#F0EFF5',marginTop:10}}>
      <View style={{flexDirection:'row',flexWrap:'wrap',width:360,height:90}}>
        {this.state.imageList.map(o=>{
          return <View key={o.localPath} style={{margin:2,marginTop:5}}>

            <Image source={{uri:'http://www.tdong.cn/'+o.serverPath}} style={{width:85,height:85}}  />

            <TouchableOpacity onPress={()=>this.onPressDeleteImage(o.localPath)} style={{
              position:'absolute',
              right:5,
              bottom:1,
            }}><Text style={{fontSize:14}}>删除</Text></TouchableOpacity>
          </View>
        })}
        </View>
        <TouchableOpacity style={{
            width:80,
            height:80,
            marginTop:7,
            marginLeft:271,
            borderRadius:3,
            borderColor:'#6B6A6D',
            borderWidth:2,
            alignItems:'center',
            justifyContent:'center',
          }} onPress={this.onSelectImage.bind(this)} >
          <Text style={{ color:'#6B6A6D',fontSize:30}}>＋</Text>
        </TouchableOpacity>
        </View>




        <TouchableOpacity onPress={this.onPressSubmit.bind(this)} style={{
          backgroundColor:'#28B4E8',
          width:350,
          borderRadius:5,
          height:40,
          justifyContent:'center',
          alignItems:'center',
          marginTop:10,
          marginLeft:5,
        }}
        >
          <Text style={{color:'white'}}>提 交</Text>
        </TouchableOpacity>

      </View>);
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    bbsAdd: action.bbsAdd,
    uploadImage: action.uploadImage
  }, dispatch)
}))(V);
