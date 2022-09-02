import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,  PermissionsAndroid, Platform,} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
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
        <Text numberOfLines = {2} 
        ellipsizeMode='tail' 
        style={{textDecorationLine:'underline',color:'black', fontSize:11}}>{cellData}</Text>
    </TouchableOpacity>

);

export default function App({navigation}) {
  const preURL = require('../preURL');
  const [tableData, setTableData] = useState([])
  const [email, setEmail] = useState('');
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

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
      .then((response) => {
        if (response.status===204){
          console.log('no videos')
          return null;
        } else{
          return response.json()
        }
      })
        .then(response => {
          if (response===null) {
            setTableData([]);
            setLoading(false)
          } else {
          console.log(response.data)
          const data = response.data
          const len = data.length;
          const inputData = []
          for (let i = 0; i < len; i++) {
            const date = data[i]['date'].slice(2,4) + '.' + data[i]['date'].slice(5,7) + "." + data[i]['date'].slice(8,10);
            const location = data[i]['location'];
            const path = data[i]['path'];
            const title = path.slice(55);
            console.log(path.slice(55))
            inputData.push([title, date, location, path]);
          }
          setTableData(inputData)
          setLoading(false)
        }
        })
        .catch(err => console.error(err));
    })
      }, [isFocused])

    
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
                              let videoDir = fs.dirs.DownloadDir  // this is the pictures directory. You can check the available directories in the wiki.
                              let options = {
                                fileCache: true,
                                addAndroidDownloads : {

                                  useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                                  notification : true,
                                  path: videoDir +  '/' + route.params.rowData[0],
                                  // this is the path where your downloaded file will live in
                                  description : 'Downloading Video.'
                                }
                              }
                            config(options)
                            .fetch('GET', cellData
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
                    } textStyle={styles.text} numberOfLines={2}/>
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
