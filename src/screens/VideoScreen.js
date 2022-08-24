import * as React from 'react';
import { View, StyleSheet, Button, PermissionsAndroid, Text,TouchableOpacity} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
        <View style={{alignItems:'flex-end', backgroundColor:'#fff'}}>
                <Button 
                title='알림'
                onPress={() => {}}
                color='purple'
                />
        </View>
        <View style={styles.videoBox}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity>
                <Text style={{fontSize: 30, color:'white', backgroundColor: 'purple'}}>
                    뒤로가기
                </Text>
            </TouchableOpacity>
                <Text style={{fontSize: 30, color:'white', backgroundColor: 'purple'}}>영상</Text>
            </View>
            <Text style={styles.text}>발생일: 2022.08.19</Text>
            <Text style={styles.text}>발생위치: 서울 동작구...</Text>
            <Video
                ref={video}
                style={styles.video}
                source={{
                uri: 'https://flyvideotest.blob.core.windows.net/videostorage/samplevideo.mp4',
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.btnPlay}>
                <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
                />
                <View style={{flexDirection: 'row', flex:1}}>
                    <Button style={styles.btnDelete}
                    title={'삭제'}
                    onPress={() =>
                        {}
                    }
                    /><Button style={styles.btnDownload}
                    title={'다운로드'}
                    onPress={() =>
                        {}
                    }
                    />
                </View>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
  videoBox:{
    flex:1,
    backgroundColor:"#fff",
    padding:20,
  },
  text:{
    fontSize: 30,
    fontWeight: "200",
    color: 'gray'
  },
  video:{
    flex: 3,
    alignSelf: "stretch"
  },
  btnPlay:{
    flex:1
  },
  btnDelete:{
    flex:1,
  },
  btnDownload:{
    flex:1,
  },

 });