import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
        <View style={{flex:1, }}> 
            <Text style={{fontSize:30,}}>알림</Text>
        </View>
        <View style={{flex:0.7, backgroundColor:'white', width:'100%', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', width:'85%'}}>
            <TouchableOpacity style={{marginHorizontal:10}}>
                <Text style={{fontSize:16}}>
                    전체 읽음
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:10}}>
                <Text style={{fontSize:16}}>
                    전체 삭제
                </Text>
            </TouchableOpacity>
        </View>
        <View style ={{flex:6, backgroundColor: 'white', width:'85%', alignItems:'center'}}>
            <ScrollView style={{width:'100%'}}>
                <Text style={{fontSize:29, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text numberOfLines={2} style={{fontSize:20, backgroundColor:'white',}}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={{fontSize:20, backgroundColor:'white',}}>차량 탐지 후 영상 목록에 저장</Text>
                </View>
                <Text style={{fontSize:30, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text numberOfLines={2} style={{fontSize:20, backgroundColor:'white',}}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={{fontSize:20, backgroundColor:'white',}}>차량 탐지 후 영상 목록에 저장</Text>
                </View><Text style={{fontSize:30, borderBottomWidth:1}}>2022.08.20</Text>
                <View style={{margin:17}}>
                    <Text numberOfLines={2} style={{fontSize:20, backgroundColor:'white',}}>서울 특별시 동작구...에서 끼어들기</Text>
                    <Text style={{fontSize:20, backgroundColor:'white',}}>차량 탐지 후 영상 목록에 저장</Text>
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


});