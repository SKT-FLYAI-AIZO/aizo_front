import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { theme } from '../styles/theme';



const App = () => {
    const [email, setEmail] = useState('');

    useEffect(()=> {
        AsyncStorage.getItem('Email', (err, result) => {
            console.log(typeof(result))
            setEmail(result);
        });
    }, [])

    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.title}>계정 정보</Text>

            </View>
            <View style={styles.dataBox}>
                <Text>
                    메일: {email}
                </Text>
                <Text>
                    이름: 
                </Text>
                <TextInput
                    style={textformstyle(2 ,1, 7, 0).style}
                    // placeholder={'이메일'}
                    // //onChangeText={(Email) => setEmail(Email)}
                    // autoCapitalize="none"
                    // returnKeyType="next"
                    // onSubmitEditing={() =>
                    //     passwordInputRef.current && passwordInputRef.current.focus()
                    // }
                    // underlineColorAndroid="#f000"
                    // blurOnSubmit={false}
                />
                <TextInput
                    style={textformstyle(1, 2, 0, 7).style}
                    //onChangeText={(Password) => setPassword(Password)}
                    // secureTextEntry={true}
                    // placeholder={'비밀번호'}
                    // returnKeyType="next"
                    // keyboardType="default"
                    // ref={passwordInputRef}
                    // onSubmitEditing={Keyboard.dismiss}
                    // blurOnSubmit={false}
                />
            </View>
            <View style={{flex:0.5, flexDirection:'row'}}>
                <TouchableOpacity style={{flex:1, alignItems:'center'}}>
                    <Text>
                        회원정보 변경
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems:'center'}}>
                    <Text>
                        뒤로가기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  };

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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    title: {
        marginTop: '10%',
        fontSize: 30
    },
    dataBox: {
        flex:2, 
        backgroundColor:'red', 
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

  });
  
  export default App;