import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

let foregroundSubscription = null
let starttime = 0

export default function App() {
  const cameraRef = useRef();
  let gpsSet = []
  const preURL = require('../preURL');
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);

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
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        runGPS()
        const videoRecordPromise = cameraRef.current.recordAsync({quality: "1080p",mute: true});
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      foregroundSubscription?.remove()
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
  };
}

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };

  const shareVideo = async() => {
    let locationSet = {
      "data": gpsSet
    }
    let sendTime = new Date(starttime)
    RNFetchBlob.fetch('POST', preURL.preURL + '/storage/video-uploader', {
        'Accept': 'application/json',
        'Content-Type' : 'multipart/form-data',
      }, [
        { name : 'video_file', filename: AsyncStorage.getItem('Email') + sendTime.toISOString() + ".mp4", type: "video/mp4", data: RNFetchBlob.wrap(videoSource)},
        { name : 'date', data : String(sendTime.toISOString())},
        { name : 'email', data : String(AsyncStorage.getItem('Email'))},
        { name : 'loc', data : JSON.stringify(locationSet)},
      ]).then((response) => response.text())
      .then((responseJson) => { 
        const resposeJson2 = responseJson.length ? JSON.parse(responseJson) : {};
        console.log("SEND_SMS RESULT: ", resposeJson2);
    })
      .catch((err) => {
        console.log("error", err)
      })
     }

  const renderVideoPlayer = () => (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: theme.white}}>
        <Video
          style={styles.video}
          source={{uri: videoSource}}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
        <View style={styles.btncontainer}>
        <TouchableOpacity
            style={styles.button2}
            onPress={cancelPreview}
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
      </View>
      </SafeAreaView>
  );

  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );


  const renderCaptureControl = () => (
    <View style={styles.control}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={isVideoRecording? stopRecording : recordVideo}
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
          {isVideoRecording ? ( 
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
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
      />
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview}
        {!videoSource && !isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
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
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
     },
    recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
     },
    recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
     },
    text: {
    color: "#fff",
     },
   });