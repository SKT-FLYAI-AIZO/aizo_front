import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet,Text,TouchableOpacity, PermissionsAndroid, Platform} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Video } from 'expo-av';
import RNFetchBlob from "rn-fetch-blob";

import { theme } from '../styles/theme';

export default function App({navigation, route}) {
  const video = useRef(null);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState(''); 
  const [path, setPath] = useState('');
  const preURL = require('../preURL');
  //const LOCAL_PATH_TO_VIDEO = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}/${timestamp}.mp4` : `${RNFS.ExternalDirectoryPath}/${timestamp}.mp4`
  
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      console.log('I dont like ios')
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.')
          //download()
        } else {
          alert('Storage Permission Not Granted')
        } 
        } catch (err) {
          console.warn(err);
        }
      }
    }
    const downloadByRNFB = async (cellData)=>{
      const { config, fs } = RNFetchBlob
      let videoDir = fs.dirs.DownloadDir 
      let options = {
        fileCache: true,
        addAndroidDownloads : {
          useDownloadManager : true, 
          notification : true,
          mime: "text/plain",
          path:  videoDir + `/사고영상.mp4`,
          description : 'Downloading image.'
        }
      }

      await config(options)
      .fetch('GET', cellData)
      .then((res) => { 
        console.log('download Success');
      }).catch((err) => {console.log(err)})
    }

  useEffect(()=>{
    setDate(route.params.rowData[1]);
    setLocation(route.params.rowData[2]);
    setPath(route.params.rowData[3]);
    console.log(path);
  })

  const downloadPress = () => {
    // fetch(preURL.preURL + '/media/file'+'?path=' + path)
    //   .then((response) => {
    //     console.log(response.status);
    //   })
    //   .catch((err) => {
    //       console.log("error", err) 
    //   });
    
      // RNFS.downloadFile({
      //   fromUrl: preURL.preURL + '/media/file'+'?path=' + path,
      //   toFile: LOCAL_PATH_TO_VIDEO,
      // }).then((res) => {
      //   console.log('successful video download!')
      // }).catch((err) => {
      //   console.error(err.message, err.code)
      // })
    
  }

  return (
      <View style={styles.videoBox}>
          <View style={{flex: 0.7, borderBottomWidth:1, borderColor: 'gray'}}>
              <Text style={styles.text}>발생일: 20{date}</Text>
          </View>
          <View style={{flex: 0.7, borderBottomWidth:1, borderColor: 'gray'}}>
              <Text style={styles.text}>발생위치: {location}</Text>
          </View>
          <View style={{flex: 7.6, alignContent:'center', justifyContent:'center'}}>
            {/* <Video
              ref={video}
              style={styles.video}
              source={{
                uri: path,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping/> */}
          </View>
              <View style={{flexDirection: 'row', flex:1}}>
                  {/* <View style={{flex:1,borderTopWidth:0.7, backgroundColor:'white', justifyContent:'center', alignItems:'center',}}>
                      <TouchableOpacity onPress={()=>{}}
                        hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}>
                        <Text style={styles.text2}>삭제</Text>
                      </TouchableOpacity>
                  </View> */}
                  <View style={{flex:1, backgroundColor:theme.purple, justifyContent:'center', alignItems:'center',}}>
                      <TouchableOpacity onPress={()=>{
                        checkPermission();
                        downloadByRNFB(path);
                      }} 
                          hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}>
                        <Text style={styles.text1}>다운로드</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
);
}

const styles = StyleSheet.create({
  videoBox:{
    flex:1,
    backgroundColor:"#fff",
    borderWidth:1
  },
  text:{
    fontSize: 20,
    fontWeight: "200",
    color: 'gray',
    margin:5
  },
  video:{
    flex: 3,
    alignSelf: "stretch"
  },
  btnPlay:{
    flex:2,
    justifyContent:"flex-end"
  },
  text2:{
    color: theme.purple,
    fontSize: 20
  }, 
  text1:{
    color: theme.white,
    fontSize: 20
  }, 

 });