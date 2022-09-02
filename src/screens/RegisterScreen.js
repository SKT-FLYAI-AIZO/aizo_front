import React, { useState, createRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import Loader from '../components/Loader';
import { theme } from '../styles/theme';
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

const RegisterScreen = ({navigation}) => {
    const preURL = require('../preURL');
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Passwordcheck, setPasswordcheck] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const nameInputRef = createRef();
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const PasswordcheckInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!Email) {
            setErrortext('이메일을 입력해주세요');
            return;
        }
        if (!Name) {
            setErrortext('이름을 입력해주세요');
            return;
        }
        if (!Password) {
            setErrortext('비밀번호를 입력해주세요');
            return;
        }
        if (Password !=Passwordcheck) {
            setErrortext('비밀번호가 일치하지 않습니다');
            return;
        }
        setLoading(true);
          fetch(preURL.preURL + '/account', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                email: Email,
                name: Name,
                password: Password,
              }),
          }).then((response) => response.json())
          .then((response) => { 
              setLoading(false)
              console.log(Object.values(response)[0] === "Account Created!")
              if(Object.values(response)[0] === "Account Created!"){
                showMessage({
                  message: "회원 가입이 완료되었습니다.",
                  type: "success",
                });
                navigation.reset({routes: [{name: "Auth"}]})
                navigation.navigate("InitialScreen")
              } else if(Object.values(response)[0][0] === "account의 email은/는 이미 존재합니다."){
                setErrortext('이미 가입된 이메일입니다.')
              }
          }) 
          .catch((err) => {
              console.log("error", err) 
          })
        }

    return (
        <View style={containerstyles.container}>
        <Loader loading={loading} />
        <View style={containerstyles.topArea}>
            <Image
            source={require('../assets/images/Register.png')}
            style={{width: wp(45), resizeMode: 'contain'}}
          />
        </View>

        <View style={containerstyles.formArea}>
            <TextInput
            style={textformstyle(2 ,1, 7, 0).style}
            placeholder={'이메일'}
            onChangeText={(Email) => setEmail(Email)}
            ref={emailInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
                nameInputRef.current && nameInputRef.current.focus()
            }
            blurOnSubmit={false}
            />
            <TextInput
            style={textformstyle(1 ,1, 0, 0).style}
            placeholder={'이름'}
            onChangeText={(Name) => setName(Name)}
            ref={nameInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
            />
            <TextInput
            style={textformstyle(1 ,1, 0, 0).style}
            secureTextEntry={true}
            placeholder={'비밀번호'}
            onChangeText={(Password) => setPassword(Password)}
            ref={passwordInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
                PasswordcheckInputRef.current && PasswordcheckInputRef.current.focus()
            }
            blurOnSubmit={false}
            />
            <TextInput
            style={textformstyle(1, 2, 0, 7).style}
            secureTextEntry={true}
            placeholder={'비밀번호 확인'}
            onChangeText={(Passwordcheck) =>
                setPasswordcheck(Passwordcheck)
            }
            ref={PasswordcheckInputRef}
            returnKeyType="next"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            />
            {errortext != '' ? (
            <Text style={textstyle.style}> {errortext}</Text>
            ) : null}

        </View>   
        <View style={{flex: 1.8}}>
            <View style={containerstyles.btnArea}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>회원가입</Text>
            </TouchableOpacity>
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
    flex: 0.8,
    justifyContent: 'center',
    paddingTop: wp(14),
  },
  formArea: {
    flex: 1.6,
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
});

const textstyle = StyleSheet.create({
  style: {
    fontSize: wp('4%'),
    color: theme.red,
    paddingTop: wp(3),
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
});

export default RegisterScreen;