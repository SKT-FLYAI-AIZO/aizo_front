import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

let foregroundSubscription = null
let starttime = 0

export default function App() {
  let cameraRef = useRef();
  const [gpsSet, setgpsSet] = useState([])
  const preURL = require('../preURL');
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [UploadProgress, setUploadProgress] = useState(0)
  //const [response, setResponse] = useState('')
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const requestPermissions = async () => {
        const foreground = await Location.requestForegroundPermissionsAsync()
        if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
      }
      requestPermissions()

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return <Text>Requestion permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>
  }

  const startWatching = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }
    foregroundSubscription?.remove()

// Start watching position in real-time
foregroundSubscription =
    await Location.watchPositionAsync({
         accuracy: Location.Accuracy.BestForNavigation,
         timeInterval: 1000,
         distanceInterval: 0
         }, location => {
            gpsSet.push({"time": (location.timestamp - starttime).toFixed(4),  "lat": location.coords['latitude'].toFixed(4), "long": location.coords['longitude'].toFixed(4)})
    })
  }
  const runGPS= () => {
    starttime = Date.now()
    startWatching()
  }

  let recordVideo = () => {
    setIsRecording(true);
    runGPS()
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
    foregroundSubscription?.remove()
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  const handleProgress = event =>{
    console.log(Math.round(event.loaded * 100) / event.total)
  }

  function sendXmlHttpRequest(data) {
    const xhr = new XMLHttpRequest();
  
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = e => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText, "Request Failed");
        }
      };
      xhr.open("POST", preURL.preURL + '/storage/video-uploader');
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      //xhr.setRequestHeader('Authorization', 'Bearer ' + AsyncStorage.getItem('AccessToken'));
      xhr.send(data);
    });
  }


  if (video) {
    let shareVideo = async() => {
      const xhr = new XMLHttpRequest();
      const body = new FormData();
      const locationSet = {
        "data": gpsSet
      }
      console.log(locationSet)
      let sendTime = new Date(starttime)
      console.log(video.uri)
      body.append('email', AsyncStorage.getItem('Email'))
      body.append('video_file', {
        name: 'original_vido.mp4',
        type: "video/mp4",
        uri: video.uri})
      //body.append('loc', locationSet)
      body.append('date', sendTime.toISOString()) // 촬영 시작 시간
      //const response = await sendXmlHttpRequest(body)
      //console.log(response)
       fetch(preURL.preURL + '/storage/video-uploader', {
        method: 'POST',
        body: body,
        headers: {
            //'Accept' : "application/json",
            //'Content-Type': form.getHeaders(),
            'Authorization': 'Bearer ' + AsyncStorage.getItem('AccessToken'),
        },
      }).then((response) => response.json())
      .then((response) => { 
          console.log(response)
          alert(response)
          setLoading(false)
      }) 
      .catch((err) => {
          alert("error", err)
          console.log("error", err) 
      })
      /*xhr.upload.addEventListener('progress', handleProgress);
      xhr.addEventListener('loaded', () => {
        setUploadProgress(100)
        setResponse(JSON.parse(xhr.responseText))
        console.log(response)
        setVideo(undefined);
      })  
        xhr.open('POST', preURL.preURL + '/storage/video-uploader');
        //xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.setRequestHeader('Authorization', 'Bearer ' + AsyncStorage.getItem('AccessToken'));
        xhr.send(body)*/
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