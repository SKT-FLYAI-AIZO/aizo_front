import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
        <View style={{flex:1, flexDirection:'row', width:'85%'}}>
            <View style={{flex:1}}/> 
            <View style={{flex:1, justifyContent: "center", alignItems: "center",}}>
                <Text style={{fontSize:25 , width:'50%', alignSelf:'center'}}>알림</Text>
            </View>
            <View style={{flex:1}}>    
                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end',}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack(null)}}>
                        <Ionicons name='close' size={35} color={theme.black}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={{flex:0.7, backgroundColor:'white', width:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', width:'85%'}}>
            <TouchableOpacity style={{marginHorizontal:10,}} onPress={()=>{}}>
                <Text style={{fontSize:16, fontWeight:'400', color:'gray'}}>
                    전체 읽음
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:10}}>
                <Text style={{fontSize:16, fontWeight:'400', color:theme.purple, textDecorationLine:'underline'}}>
                    전체 삭제
                </Text>
            </TouchableOpacity>
        </View>
        <View style ={{flex:6, backgroundColor: 'white', width:'85%', alignItems:'center'}}>
            <ScrollView style={{width:'100%'}}>
                <Text style={{fontSize:25, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text style={styles.text}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={styles.text}>차량 탐지 후 영상 목록에 저장</Text>
                </View>
                <Text style={{fontSize:25, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text style={styles.text}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={styles.text}>차량 탐지 후 영상 목록에 저장</Text>
                </View><Text style={{fontSize:25, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text style={styles.text}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={styles.text}>차량 탐지 후 영상 목록에 저장</Text>
                </View>
                <Text style={{fontSize:25, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text style={styles.text}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={styles.text}>차량 탐지 후 영상 목록에 저장</Text>
                </View>
            </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  text:{
    fontSize:20, 
    backgroundColor:'white',
    numberOfLines:2,
  }


});