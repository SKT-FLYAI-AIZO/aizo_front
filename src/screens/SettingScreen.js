import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';



export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={ {fontSize:35,}} >설정</Text>
      </View>
      <View style={styles.settingBox}>
        <TouchableOpacity style={styles.btn}
        onPress={()=>navigation.push('AccountScreen')}>
          <Text style={styles.account}>
            계정
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} 
        onPress={()=>navigation.push('NoticeScreen')}>
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
  title:{
    flex:1.9,
    backgroundColor:'#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width:'100%'
  },
  settingBox:{
    flex:8,
    backgroundColor:'#fff',
    width:'75%',
    margin:30
  },
  account:{
    fontSize:30,
    color:'#222',
    marginVertical:5
  },
  notice:{
    fontSize:30,
    color:'#222',
    marginVertical:5
  },
  withdrawal:{
    fontSize:30,
    color:'#222',
    marginVertical:5
  },
  btn:{
    borderBottomWidth:2,
    borderColor:'gray'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal:30
  },
});