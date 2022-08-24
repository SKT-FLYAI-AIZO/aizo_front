import React, { useState, createRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import Loader from '../components/Loader';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { theme } from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const preURL = require('../preURL');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
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
    })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status === 200) {
          AsyncStorage.setItem('Email', Email);
          setLoading(false);
          navigation.navigate('MainTab');
        } else {
          setErrortext('아이디와 비밀번호를 다시 확인해주세요');
          setLoading(false);
          console.log('Please check your id or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
        <Text style={styles.TextRegister1}>
          로그인
        </Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
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
          style={styles.textFormBottom}
          onChangeText={(Password) => setPassword(Password)}
          secureTextEntry={true}
          placeholder={'비밀번호'}
          returnKeyType="next"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
        <View style={styles.btncontainer2}>
          <Text style={styles.TextRegister3}>
            비밀번호 찾기
          </Text>
        </View>
        {errortext != '' ? (
          <Text style={styles.TextValidation}> {errortext}</Text>
        ) : null}
      </View>
      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btncontainer}>
          <Text style={styles.TextRegister1}> 아직 회원이 아니신가요? </Text>
        <Text
          style={styles.TextRegister2}
          onPress={() => navigation.navigate('RegisterScreen')}>
          회원가입
        </Text>
        </View>
      </View>

      <View style={{flex: 3}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1,
    paddingTop: wp(1),
  },
  titleArea: {
    flex: 0.5,
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  TextArea: {
    flex: 0.3,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  Text: {
    fontSize: wp('4%'),
    paddingBottom: wp('1%'),
  },
  TextValidation: {
    fontSize: wp('4%'),
    color: 'red',
    paddingTop: wp(2),
  },
  TextRegister1: {
    fontSize: wp('4%'),
    color: 'grey',
    paddingTop: wp(2),
  },
  TextRegister3: {
    fontSize: wp('4%'),
    color: 'grey',
    paddingTop: wp(2),
  },
  TextRegister2: {
    fontSize: wp('4%'),
    color: 'black',
    textAlign: 'right',
    textDecorationLine: 'underline',
    paddingTop: wp(2),
  },
  formArea: {
    justifyContent: 'center',
    flex: 1.5,
  },
  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: theme.purple,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: theme.purple,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.purple,
  },
  btncontainer: {
    flexDirection: 'row',
  },
  btncontainer2: {
    alignItems: 'flex-end',
  }
});
export default LoginScreen;