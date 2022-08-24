import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';


export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconview}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.push('NoticeScreen')}>
          <Text>알림버튼</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={ {fontSize:35,}} >설정</Text>
      </View>
      <View style={styles.settingBox}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.account}>
            계정
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.notice}>
            알림
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.withdrawal}>
            회원탈퇴
          </Text> 
        </TouchableOpacity>

      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconview:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent: "center",
    alignItems:'flex-end',
    width:'100%',
  },
  title:{
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  settingBox:{
    flex:6,
    backgroundColor:'#fff',
    width:'75%',
    margin:30
  },
  account:{
    fontSize:35,
    color:'#333',
  },
  notice:{
    fontSize:35,
    color:'#333',
  },
  withdrawal:{
    fontSize:35,
    color:'#333',
  },
  btn:{
    borderBottomWidth:2,
    borderColor:'gray'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});