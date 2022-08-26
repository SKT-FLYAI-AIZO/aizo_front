import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button  } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const state = {
  tableHead: ['  이름', '발생일', '발생위치', '  다운로드']}

const element = (navigation, cellData) => (
    <TouchableOpacity
            style={{
              backgroundColor:'white',
              margin: 10,
              borderRaduis: 50,
              alignItems:'center'
            }}
            onPress={() => navigation.push('VideoScreen', {path:cellData})}
        >
        <Ionicons name="cloud-download" size={30} color='gray'/>
    </TouchableOpacity>
);

export default function App({navigation}) {
  const preURL = require('../preURL');
  const [tableData, setTableData] = useState([])

  useEffect(()=>{
  fetch(preURL.preURL + '/media/video'+'?email=tester1@naver.com')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        const data = response.data
        const len = data.length;
        const inputData = []
        for (let i = 0; i < len; i++) {
          const title = "영상" + (i + 1);
          const date = data[i]['date'].slice(5,7) + "." + data[i]['date'].slice(8,10);
          const location = data[i]['location'];
          const path = data[i]['path'];
          inputData.push([title, date, location, path]);
        }
        setTableData(inputData)
        })
      .catch(err => console.error(err));
  }, [])
  

  return (
    
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>끼어들기 감지 영상 목록</Text>
      </View>
      
      <View style={styles.databox}>
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
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(navigation, cellData) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        </ScrollView>
      </View>
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