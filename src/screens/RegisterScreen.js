import React, { useState, createRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import Loader from '../components/Loader';
import { theme } from '../styles/theme';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';

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
          })
          .then((response) => {
                console.log(response)
                setLoading(false);
                if (response.ok) {
                    navigation.goBack()
                }  else{
                    setErrortext('회원가입 오류');
                }
          })
            .catch((error) => {
              //Hide Loader
              setLoading(false);
              console.error(error);
            });
        };

    return (
        <View style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.topArea}>
            <Text style={styles.TextRegister1}>
                회원가입
            </Text>
        </View>

        <View style={styles.formArea}>
            <TextInput
            style={styles.textFormTop}
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
            style={styles.textFormMiddle}
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
            style={styles.textFormMiddle}
            secureTextEntry={true}
            placeholder={'비밀번호(8자 이상)'}
            onChangeText={(Password) => setPassword(Password)}
            ref={passwordInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
                PasswordcheckInputRef.current && PasswordcheckInputRef.current.focus()
            }
            blurOnSubmit={false}
            />
            <TextInput
            style={styles.textFormBottom}
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
            <Text style={styles.TextValidation}> {errortext}</Text>
            ) : null}

        </View>   
        <View style={{flex: 0.75}}>
            <View style={styles.btnArea}>
            <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>회원가입</Text>
            </TouchableOpacity>
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
    paddingTop: wp(2),
  },
  alertArea: {
    height: wp(150),
  },
  Text: {
    fontSize: wp(4),
  },
  TextValidation: {
    fontSize: wp('4%'),
    color: 'red',
  },
  formArea: {
    flex: 2.5,
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
  textFormMiddle: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.purple,
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
  inputIOS: {
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default RegisterScreen;