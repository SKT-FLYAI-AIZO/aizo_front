import React, { useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import preURL from '../preURL';
import { theme } from '../styles/theme';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const content = (contentName, no) => (
  <TouchableOpacity style={styles.Row}>
    <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> {contentName} </Text></View>
    <View style={{flex: 1.5, alignItems: 'center'}}>
      {no && <Ionicons name="chevron-forward" color="grey" size={wp(6)}/>}
    </View>
  </TouchableOpacity>

)

export default function App({navigation}) {
  const [value,setValue] = useState('');
  const [name, setName] = useState('');
  

  useEffect(()=>{
    AsyncStorage.getItem('Email', (err, result) => {console.log(result)
      setValue(result);
    });
    // setValue(mail);
    console.log(value);
    console.log(typeof(value));
    

    fetch(preURL.preURL + '/account?email=' + value)
      .then((response) => {
        return response.json()
      }).then((response)=>{
        console.log(response.name);
        setName(response.name);
        console.log(name);
      })
      .catch((err) => {
          console.log("error", err) 
      });
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.settingBox}>
        <View style={styles.contentBox}>
            <Text style={styles.ContentText}> {name}님</Text> 
        </View> 
        <View>
          <Text style = {styles.title}>사용자 설정</Text>
          <View style={styles.contentBox}>
            {content("아이디 변경", true)}  
            {content("비밀번호 변경", true)}      
            {content("로그아웃", false)}
          </View>
        </View>
        <View>
          <Text style = {styles.title}>서비스 이용</Text>
          <View style={styles.contentBox}>
            {content("이용방법", true)} 
            {content("스마트 국민 제보", true)} 
          </View>
          </View>
          <View style={styles.contentBox}>
          {content("회원 탈퇴", false)} 
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Dimensions.get('window').width * 0.25,
    alignItems: 'center',
  },
  settingBox:{
    paddingBottom: hp(5),
    flex: 1,
    width:'88%',
    justifyContent: 'space-between'
  },
  contentBox:{
    backgroundColor:theme.white,
    borderRadius: 15,
    padding: hp(1.5),
    width: '100%'
  },
  ContentText:{
    fontSize: wp(6),
    color: "#423F3E",
    marginVertical:5
  },
  title:{
    fontSize: wp(4),
    color: "#423F3E",
    marginVertical:5
  },
  Row: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  btn:{
    width: "100%",
    flexDirection:'row',
    alignContent: 'center',
  }
});