import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button  } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';

const state = {
  tableHead: ['이름', '발생일', '발생위치', '다운로드'],
  tableData: [
    ['영상1', '08.18', '서울', '버튼'],
    ['영상2', '08.18', '일산', '버튼'],
    ['영상3', '08.19', '파주', '버튼'],
    ['영상4', '08.20', '보라매', '버튼']
  ]
}

const element = (navigation) => (
    <TouchableOpacity
            style={{
              backgroundColor:'white',
              margin: 10,
              borderRaduis: 50,
              alignItems:'center'
            }}
            onPress={() => navigation.push('VideoScreen')}
        >
        <Ionicons name="cloud-download" size={30} color='gray'/>
    </TouchableOpacity>
);


export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>끼어들기 감지 영상 목록</Text>
      </View>
      
      <View style={styles.databox}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(navigation) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  noticeBar:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginHorizontal:40
  },

  btnNotice:{
    fontSize:30,
    color: '#fff',
    backgroundColor: '#000',
  },

  titlebox:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "300"
  },

  databox:{
    flex: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    margin:40
  },

  data: {
    borderWidth: 1,
    flex:5,
    
  },

  // 테이블
  head: { height: 40, backgroundColor: '#fff', borderBottomWidth: 1 },
  row: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, justifyContent: 'center', padding:5},
  btn: { width: 70, height: 18, backgroundColor: '#fff',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff', backgroundColor: '#000' },
  text: { margin: 6 },
});