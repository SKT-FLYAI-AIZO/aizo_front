import * as React from 'react';
import { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import Loader from '../components/Loader';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, Image } from 'react-native';
import { theme } from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const preURL = require('../preURL');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = React.createRef();

  const storeData = async() =>{
    try{
       await AsyncStorage.setItem("Email", Email)
    }catch(error){
        console.log(error)
    }
  }

  const handleSubmitPress = () => {
    setErrortext('')
    if (!Email) {
      setErrortext('이메일을 입력해주세요');
      return;
    }
    if (!Password) {
      setErrortext('비밀번호를 입력해주세요');
      return;
    }
    setLoading(true);
    fetch(preURL.preURL + '/login', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
          email: Email,
          password: Password,
        }),
    }).then((response) => response.json())
      .then((response) => { 
          setLoading(false)
          if (Object.values(response)[0] === 'login success'){
            navigation.reset({routes: [{name: "MainTab"}]})
            storeData()
            navigation.navigate('MainTab')
          } else if(Object.values(response)[0] === "비밀번호를 확인해주세요."){
            setErrortext(Object.values(response)[0])
          } else if(Object.values(response)[0] === "존재하지 않는 이메일입니다."){
            setErrortext(Object.values(response)[0])
          } 
      }).catch((err) => {
          setLoading(false)
          setErrortext('로그인에 실패했습니다.')
          console.log("error", Object.values(err)) 
      })
    }

  return (
    <View style={containerstyles.container}>
      <Loader loading={loading} />
      <View style={containerstyles.topArea}>
        <Image
          source={require('../assets/images/Login.png')}
          style={{width: wp(35), resizeMode: 'contain'}}
        />
      </View>
      <View style={containerstyles.formArea}>
        <TextInput
          style={textformstyle(2 ,1, 7, 0).style}
          placeholder={'이메일'}
          onChangeText={(Email) => setEmail(Email)}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <TextInput
          style={textformstyle(1, 2, 0, 7).style}
          onChangeText={(Password) => setPassword(Password)}
          secureTextEntry={true}
          placeholder={'비밀번호'}
          returnKeyType="next"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
        {errortext !== '' ? (
          <Text style={textstyle(theme.red, wp('4%'), wp(2), 'none').style}> {errortext}</Text>
        ) : (<Text></Text>)}
      </View>
      <View style={{flex: 2.8}}>
        <View style={containerstyles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={containerstyles.btncontainer2}>
          <Text style={textstyle(theme.grey, wp('4%'), wp(2), 'none').style}> 아직 회원이 아니신가요? </Text>
        <Text
          style={textstyle(theme.black, wp('4%'), wp(2), 'underline').style}
          onPress={() => navigation.navigate('RegisterScreen')}>
          회원가입
        </Text>
        </View>
      </View>
    </View>
  );
};

const containerstyles =  StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 0.95,
    justifyContent: 'center',
    paddingTop: wp(15),
  },
  formArea: {
    flex: 1.1,
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btncontainer: {
    alignItems: 'flex-end',
  },
  btncontainer2: {
    flexDirection: 'row',
  }
})

const textstyle = (color, size, padding, decoration) => StyleSheet.create({
  style: {
    fontSize: size,
    color: color,
    paddingTop: padding,
    textDecorationLine: decoration
  }
})

const textformstyle = (TopWidth, BottomWidth, TopRadius, BottomRadius) => StyleSheet.create({
  style: {
    borderWidth: 2,
    borderBottomWidth: BottomWidth,
    borderTopWidth: TopWidth,
    borderColor: theme.purple,
    borderTopLeftRadius: TopRadius,
    borderTopRightRadius: TopRadius,
    borderBottomRightRadius: BottomRadius,
    borderBottomLeftRadius: BottomRadius,
    width: '100%',
    height: hp(7),
    paddingLeft: 10,
    paddingRight: 10,
  }
})

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.purple,
  },
})

export default LoginScreen;