import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';
import Loader from '../components/Loader';

export default function SettingScreen({navigation}) {
  const preURL = require('../preURL');
  const [email, setEmail] = useState('');
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);

  const _handleOpenWithLinking = () => {
    Linking.openURL('http://onetouch.police.go.kr/');
  };
  const _Logout = () => {
    AsyncStorage.clear();
    navigation.reset({routes: [{name: "MainTab"}]})
    navigation.navigate('Auth')
  };

  const load = async() => {
    try {
      const Email = await AsyncStorage.getItem('Email')
      fetch(preURL.preURL + '/account?email=' + Email)
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
    } catch (e) {
    }
  }
      
  useEffect(() => {
    load()
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
            <TouchableOpacity style={styles.Row} onPress={() => navigation.navigate('ChangeNameScreen')}>
              <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> 이름 변경 </Text></View>
              <View style={{flex: 1.5, alignItems: 'center'}}>
                <Ionicons name="chevron-forward" color="grey" size={wp(6)}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Row} onPress={() => navigation.navigate('ChangePwScreen')}>
              <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> 비밀번호 변경 </Text></View>
              <View style={{flex: 1.5, alignItems: 'center'}}>
                <Ionicons name="chevron-forward" color="grey" size={wp(6)}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Row} onPress={_Logout}>
              <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> 로그아웃 </Text></View>
              <View style={{flex: 1.5, alignItems: 'center'}} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style = {styles.title}>서비스 이용</Text>
          <View style={styles.contentBox}>
          <TouchableOpacity style={styles.Row}>
              <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> 이용 방법 </Text></View>
              <View style={{flex: 1.5, alignItems: 'center'}}>
                <Ionicons name="chevron-forward" color="grey" size={wp(6)}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Row} onPress={_handleOpenWithLinking}>
              <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> 스마트 국민제보 </Text></View>
              <View style={{flex: 1.5, alignItems: 'center'}}>
                <Ionicons name="chevron-forward" color="grey" size={wp(6)}/>
              </View>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.contentBox}>
          <TouchableOpacity style={styles.Row}>
              <View style={{flex: 8, alignItems: 'flex-start'}}><Text style = {styles.ContentText}> 회원 탈퇴 </Text></View>
              <View style={{flex: 1.5, alignItems: 'center'}} />
            </TouchableOpacity>
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