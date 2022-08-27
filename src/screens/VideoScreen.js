import * as React from 'react';
import { View, StyleSheet, Button, PermissionsAndroid, Text,TouchableOpacity} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Video, AVPlaybackStatus } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

export default function App({navigation, route}) {
  const video = React.useRef(null);
  //const [status, setStatus] = React.useState({});
  const [date, setDate] = React.useState('');
  const [location, setLocation] = React.useState(''); 
  const [path, setPath] = React.useState('');
  const preURL = require('../preURL');


  React.useEffect(()=>{
    setDate(route.params.rowData[1]);
    setLocation(route.params.rowData[2]);
    setPath(route.params.rowData[3]);
  })
  const downloadPress = () => {
    fetch(preURL.preURL + '/media/file?path=' + path)
      .then((response) => response.json())
      .then((response) => { 
          console.log(response.status);
      }).catch((err) => {
          console.log("error", Object.values(err)) 
      })
    }

  return (
    <View style={styles.container}>
      <View style={styles.videoBox}>
          <View style={{flex:0.5,flexDirection:'row'}}>
              <View style={{flex:1, backgroundColor: theme.purple}}>
                  <View style={{flex:1, justifyContent:'center', alignItems:'flex-start',}}>
                      <TouchableOpacity onPress={()=>{navigation.goBack(null)}}>
                          <Ionicons name='chevron-back' size={35} color='white'/>
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={{flex:1, alignItems:"center", justifyContent:'center', backgroundColor: theme.purple}}>
                  <Text style={{fontSize: 30, color:'white', }}>영상</Text>
              </View>
              <View style={{flex:1, backgroundColor: theme.purple}}/>
          </View>
          <View style={{borderBottomWidth:1, borderColor: 'gray'}}>
              <Text style={styles.text}>발생일: 20{date}</Text>
          </View>
          <View style={{borderBottomWidth:1, borderColor: 'gray'}}>
              <Text style={styles.text}>발생위치: {location}</Text>
          </View>
          <Video
              ref={video}
              style={styles.video}
              source={{
                uri: path
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              //onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View style={styles.btnPlay}>
              <View style={{flexDirection: 'row', flex:1}}>
                  <View style={{flex:1, borderWidth:1, borderColor:'gray', backgroundColor:'white', justifyContent:'center', alignItems:'center',}}>
                      <TouchableOpacity onPress={()=>{}}>
                          <Ionicons name='trash' size={30} color={theme.black}/>
                      </TouchableOpacity>
                  </View>
                  <View style={{flex:1, backgroundColor:theme.purple, justifyContent:'center', alignItems:'center',}}>
                      <TouchableOpacity onPress={downloadPress}>
                          <Ionicons name='download' size={30} color={theme.black}/>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </View>
  </View>
);
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 35, 
    backgroundColor: "#fff",
  },
  videoBox:{
    flex:1,
    backgroundColor:"#fff",
    marginTop: hp(8),
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
    alignSelf: "stretch",
  },
  btnPlay:{
    flex:0.5,
    justifyContent:"flex-end"
  },
  btnDelete:{
  },
  btnDownload:{
  },

 });