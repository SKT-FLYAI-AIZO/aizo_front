import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,  PermissionsAndroid, Platform,} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import RNFetchBlob from 'rn-fetch-blob'

const state = {
  tableHead: ['  이름', '발생일', '발생위치', '  다운로드']}

const element = (navigation, cellData, rowData) => (
    <TouchableOpacity
            style={{
              backgroundColor:'white',
              borderRaduis: 50,
            }}
            onPress={() => navigation.push('VideoScreen', {rowData})}
        >
        <Text style={{textDecorationLine:'underline'}}>  {cellData}</Text>
    </TouchableOpacity>
);

export default function App({navigation}) {
  const preURL = require('../preURL');
  const [tableData, setTableData] = useState([])
  const [email, setEmail] = useState('');
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      download()
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
  
  useEffect(()=>{
    setLoading(true)
    AsyncStorage.getItem('Email', (err, result) => {
      console.log(result);
      setEmail(result);
      fetch(preURL.preURL + '/media/video'+'?email='+ result)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          const data = response.data
          const len = data.length;
          const inputData = []
          for (let i = 0; i < len; i++) {
            const title = "영상" + (i + 1);
            const date = data[i]['date'].slice(2,4) + '.' + data[i]['date'].slice(5,7) + "." + data[i]['date'].slice(8,10);
            const location = data[i]['location'];
            const path = data[i]['path'];
            inputData.push([title, date, location, path]);
          }
          setTableData(inputData)
          setLoading(false)
        })
        .catch(err => console.error(err));
    })
      }, [])
    
    const downloadPress = () => {
      RNFS.downloadFile({
        fromUrl: preURL.preURL + '/media/file'+'?path=' + path,
        toFile: LOCAL_PATH_TO_VIDEO,
      }).then((res) => {
        console.log('successful video download!')
      }).catch((err) => {
        console.error(err.message, err.code)
      })
    }
    
    return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.titlebox}>
        <Text style={styles.title}>끼어들기 감지 영상 목록</Text>
      </View>
      {!loading ? ( <View style={styles.databox}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          </Table>
          <ScrollView>
          <Table>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={
                      cellIndex === 0 ? element(navigation, cellData, rowData) 
                      : cellIndex === 3 ? 
                      <TouchableOpacity
                        style={{
                          backgroundColor:'white',
                          margin: 10,
                          borderRaduis: 50,
                          alignItems:'center'
                        }}
                        onPress={() => {
                          console.log(cellData);
                          fetch(preURL.preURL + '/media/file'+'?path=' + cellData)
                            .then((response) => { 
                              console.log(response);
                              console.log(response.status);
                              console.log(response.url);
                              //response.json()
                              setFilePath(response.url);
                              console.log(typeof(filePath));
                              console.log(filePath);
                              checkPermission()
                              const { config, fs } = RNFetchBlob
                            let PictureDir = fs.dirs.DownloadDir  // this is the pictures directory. You can check the available directories in the wiki.
                            console.log(PictureDir)
                            let options = {
                              fileCache: true,
                              addAndroidDownloads : {
                                
                                useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                                notification : true,
                                path:  PictureDir + "/me_.mp4", // this is the path where your downloaded file will live in
                                description : 'Downloading image.'
                              }
                            }
                            config(options)
                            .fetch('GET', "https://aizostorage.blob.core.windows.net/aizo-source/tester1@naver.com_2022-08-26.mp4"
                            )
                            .then((res) => { 
                              console.log(res.status);
                              // do some magic here
                            })
                            })

                            .catch((err) => {
                                console.log("error", err) 
                            });
                        }}
                        >
                        <Ionicons name="cloud-download" size={30} color='gray'/>
                      </TouchableOpacity>
                      : cellData
                    } textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        </ScrollView>
      </View>) : (<View style={{flex:8}} />)}
      </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  titlebox:{
    flex: 1.9,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "300"
  },

  databox:{
    flex: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    margin: wp(7),
  },

  data: {
    borderWidth: 1,
    flex:5,
    
  },

  // 테이블
  head: { height: 40, backgroundColor: '#fff', borderBottomWidth: 1, },
  row: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, justifyContent: 'center', padding:5},
  btn: { width: 70, height: 18, backgroundColor: '#fff',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff', backgroundColor: '#000' },
  text: { margin: 6, },
});