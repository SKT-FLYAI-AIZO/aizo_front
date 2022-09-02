import React, { useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import Carousel from '../components/Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
  {
    source: require('../assets/images/guide.jpg'),
    color: '#86E3CE',
    comment: '주행 영상 촬영'
  },
  {
    source: require('../assets/images/guide1.jpg'),
    color: '#D0E6A5',
    comment: '촬영 영상 분석 요청'
  },
  {
    source: require('../assets/images/guide2.jpg'),
    color: '#FFDD94',
    comment: '편집 영상 목록 확인'
  },
  {
    source: require('../assets/images/guide3.jpg'),
    color: '#FA897B',
    comment: '영상 확인 및 다운로드'
  },
  {
    source: require('../assets/images/guide4.jpg'),
    color: '#CCABD8',
    comment: '설정 변경 및 서비스 이용'
  },
];

export default function app() {
    return (
        <View style={styles.container}>
            <Carousel
                gap={16}
                offset={68}
                pages={PAGES}
                pageWidth={screenWidth - (16 + 68) * 2}/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,  
      //marginTop: Dimensions.get('window').width * 0.25,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent:'center'
    },
})