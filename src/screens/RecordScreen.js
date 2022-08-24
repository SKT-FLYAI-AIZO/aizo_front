import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return <Text>Requestion permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      mute: true
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };


  if (video) {
    let shareVideo = () => {
      var body = new FormData();
      // location 버리기
      body.append('email', AsyncStorage.getItem('Email'))
      body.append('video_file', video)
      body.append('loc_file', location)
      body.append('date', date.now()) // 촬영 시작 시간
      fetch(preURL.preURL + '/storage/video-uploader', {
        method: 'POST',
        headers: {
            'Accept' : "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + AsyncStorage.getItem('AccessToken'),
        },
        body: body,
      }).then((response) => response.json())
      .then((response) => { 
          setLoading(false)
      }) 
      .catch((err) => {
          console.log("error", err) 
      })
        setVideo(undefined);
      }

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
        <View style={styles.btncontainer}>
        <TouchableOpacity
            style={styles.button2}
            onPress={() => setVideo(undefined)}
          >
            <Text style={styles.text2}>버리기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={shareVideo}
          >
            <Text style={styles.text1}>분석하기</Text>
          </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : recordVideo}
      >
         <View
          style={{
            borderWidth: 2,
            borderRadius: (Dimensions.get('window').width * 0.15)/2,
            borderColor: "white",
            height: Dimensions.get('window').width * 0.15,
            width: Dimensions.get('window').width * 0.15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
          {isRecording ? ( 
            <Ionicons name="stop" size={Dimensions.get('window').width * 0.1} color={theme.red} />
            ) : (
              <View
              style={{
                borderWidth: 2,
                borderRadius: (Dimensions.get('window').width * 0.15 - 10) / 2,
                borderColor: theme.red,
                height: Dimensions.get('window').width * 0.15 - 10,
                width: Dimensions.get('window').width * 0.15 - 10,
                backgroundColor: theme.red,
              }}/>
          )}
        </View>

      </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  buttonContainer: {
  },
  button: {
    alignItems: "center",
    width: Dimensions.get('window').width,
    padding: 10,
    elevation: 10,
  },
  video: {
    flex: 1,
    alignSelf: "stretch"
  },
  btncontainer: {
    flexDirection: 'row',
  },
  button1: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: theme.white,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.07,
    elevation: 10,
  },
  button2: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: theme.purple,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.07,
    elevation: 10,
  },
  text1:{
    color: theme.purple,
    fontSize: 20
  }, 
  text2:{
    color: theme.white,
    fontSize: 20
  }, 
});