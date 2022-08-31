import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Keyboard} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../styles/theme';
import Loader from '../components/Loader';

export default function ChangeNameScreen ({navigation}) {
    const preURL = require('../preURL');
    const [name, setName] = useState('');
    const [email, setEmail] = useState();
    const [errortext, setErrortext] = useState('');

    const nameInputRef = createRef();

    const load = async() => {
        try {
            const Email = await AsyncStorage.getItem('Email')
            setEmail(Email)
            fetch(preURL.preURL + '/account?email=' + Email)
            .then((response) => {
            return response.json()
            }).then((response)=>{
            setName(response.name);
            })
            .catch((err) => {
                console.log("error", err) 
            });
            try{
                await AsyncStorage.setItem("Name", name)
            } catch (e) {}
            }catch(error){
                console.log(error)
            }
      }

      const storeData = async() =>{
        try{
           await AsyncStorage.setItem("Name", name)
        }catch(error){
            console.log(error)
        }
      }

      useEffect(()=>{
            load()
        }, [])  

    const handleSubmitPress = async() => {
        setErrortext('');
        if (!name) {
            setErrortext('이름을 입력해주세요');
            return;
        }
        fetch(preURL.preURL +'/account', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                "email": email,
                "name": name,
            }),
        }).then((response) => response.json())
        .then((response) => {  
            console.log(response)
            storeData()
            navigation.reset({routes: [{name: "SettingScreen"}]})
        }).catch((err) => {
            console.log("error", err)
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.settingBox}>
                <View>
                    <View>
                        <Text style = {styles.title}>이름 변경</Text>
                        <TextInput
                            style={styles.textform}
                            placeholder={'이름'}
                            defaultValue={name}
                            onChangeText={(name) => setName(name)}
                            ref={nameInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
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