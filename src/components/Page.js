import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default function Page({item, style}) {
    const path = `'../assets/images/${item.source}'`;
  return (
    <View 
    style={{
        flex:1, 
        backgroundColor :item.color, 
        width:style.width, 
        marginHorizontal:style.marginHorizontal, 
        alignItems:'center',
        borderRadius:20, 
        justifyContent:'center',}}>
        <Image 
            source={item.source}
            style={{flex:1, width:'100%',borderRadius:20, borderColor:'gray', borderWidth:0.5}}
            />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:'20px',
    },

    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
  });