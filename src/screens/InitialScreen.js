// Import React and Component
import React from 'react';
import {View, StyleSheet, Image, Dimensions, TouchableOpacity, Text} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../styles/theme';

const InitialScreen = ({navigation}) => {

  return (
    <View style={backgroundstyle.style}>
        <View style={containerstyles(0.1).container}>
            <Text style={textstyle(theme.yellow, 40).style}>잡았다 요놈</Text>
        </View>
        <View style={containerstyles(0.4).container}>      
            <Image
                source={require('../assets/images/Logo.png')}
                style={{width: wp(50), resizeMode: 'contain'}}
            />
        </View>
        <View>
            <TouchableOpacity 
                style={containerstyles().button}
                onPress={() => navigation.navigate('LoginScreen')}
            >
            <Text style={textstyle(theme.purple, 20).style}>로그인</Text>
        </TouchableOpacity>
        <View style={containerstyles().btncontainer}>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={textstyle(theme.white, 20).style}>회원가입</Text>
            </TouchableOpacity>
                <TouchableOpacity>
                <Text style={textstyle(theme.grey, 20).style}>사용방법</Text>
            </TouchableOpacity>
      </View>
        </View>
    </View>
  );
};

export default InitialScreen;

const backgroundstyle = StyleSheet.create({
  style: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.purple
  }
  })

const containerstyles = (size) => StyleSheet.create({
  container: {
    flex: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height * 0.06,
  },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: theme.white,
    width: Dimensions.get('window').width * 0.65,
    height: Dimensions.get('window').height * 0.065,
    borderRadius: 5,
    elevation: 10,
  },
});

const textstyle = (color, size) => StyleSheet.create({
  style: {
    color: color,
    fontSize: size
  }
})