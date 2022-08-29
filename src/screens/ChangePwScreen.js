import React, { useState, createRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../styles/theme';

export default function ChangePWScreen ({navigation}) {
    const preURL = require('../preURL');
    const [Password, setPassword] = useState('');
    const [Passwordcheck, setPasswordcheck] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();
    const PasswordcheckInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!Password) {
            setErrortext('비밀번호를 입력해주세요');
            return;
        }
        if (Password !=Passwordcheck) {
            setErrortext('비밀번호가 일치하지 않습니다');
            return;
        }
        setLoading(true);
        }

    return (
        <View style={styles.container}>
            <View style={styles.settingBox}>
              <View>
                <View style={{marginBottom: hp(2)}}>
                    <Text style = {styles.title}>비밀번호 변경</Text>
                    <TextInput
                        style={styles.textform}
                        secureTextEntry={true}
                        placeholder={'비밀번호'}
                        onChangeText={(Password) => setPassword(Password)}
                        ref={passwordInputRef}
                        keyboardType="default"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            PasswordcheckInputRef.current && PasswordcheckInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                <View>
                    <Text style = {styles.title}> 변경 비밀번호 확인</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textform}
                        placeholder={'비밀번호 확인'}
                        onChangeText={(Passwordcheck) =>
                            setPasswordcheck(Passwordcheck)
                        }
                        ref={PasswordcheckInputRef}
                        returnKeyType="next"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        keyboardType="default"
                    />
                </View>
                {errortext != '' ? (<Text style={textstyle(theme.red, wp('4%'), wp(2), 'none').style}> {errortext}</Text>) : null}
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
                    <Text style={styles.btnText}>완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: hp(2),
    alignItems: 'center',
},
settingBox:{
    width:'88%',
    height: '100%',
    justifyContent: 'space-between'
},
btnText:{
    color: theme.white,
    fontSize: wp(6),
},
title:{
    fontSize: wp(4),
    color: "#423F3E",
    marginVertical:5
},
textform: {
    borderRadius: 20,
    width: '100%',
    height: hp(7),
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:theme.white
},
btn:{
    backgroundColor: theme.purple,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: hp(7),
}
});

const textstyle = (color, size, padding, decoration) => StyleSheet.create({
    style: {
      fontSize: size,
      color: color,
      paddingTop: padding,
      textDecorationLine: decoration
    }
  })