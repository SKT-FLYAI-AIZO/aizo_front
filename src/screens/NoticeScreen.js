import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../styles/theme';

export default function App({navigation}) {
  const preURL = require('../preURL');
  const [email, setEmail] = useState('');
  const [Data, setData] = useState([]);

  useEffect(()=>{
    console.log(typeof(Data))
    AsyncStorage.getItem('Email', (err, result) => {
      console.log(result);
      setEmail(result);
    });

  fetch(preURL.preURL + '/account/alarm'+'?email='+ email)
      .then(response => response.json())
      .then(response => {
        console.log(Object.values(response))
        const len = JSON.parse(Object.values(response)[1]).length
        console.log(JSON.parse(Object.values(response)[1]).length)
        const inputData = []
          for (let i = 0; i < len; i++) {
            const id = i
            const message_id = JSON.parse(Object.values(response)[1])[i].pk
            const message = JSON.parse(Object.values(response)[1])[i].fields.content
            const read = JSON.parse(Object.values(response)[1])[i].fields.is_read
            inputData.push({"message_id": message_id, "id": id, "read": read, "message": message});
          }
          setData(inputData)
    })
    .catch(err => console.error(err));
  }, [])

    const re_Render_FlatList = (id) =>{
      const newdata = Data.map(obj => {
          if (obj.id === id) {
            fetch(preURL.preURL +'/account/alarm', {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
              },
              body: JSON.stringify({
                  "alarm_id_list" : [obj.message_id],
              }),
          }).then((response) => response.json())
          .then((response) => {  
              console.log(response)
          }).catch((err) => {
              console.log("error", err.text())
          })
            return {...obj, "read": true};
          }
          return obj;
        });
      setData(newdata);
    }

    const readAllFlatList = () =>{
        let all = []
        const newdata = Data.map(obj => {
            all.push(obj.message_id)
            obj.read = true
            return obj;
          });
          fetch(preURL.preURL +'/account/alarm', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                "alarm_id_list" : all,
            }),
        }).then((response) => response.json())
        .then((response) => {  
            console.log(response)
        }).catch((err) => {
            console.log("error", err)
        })
    
        setData(newdata);
    }

    const DeleteNotification = () =>{
      fetch(preURL.preURL + '/account/alarm?email=' + email,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        }).then((response) => response.json())
        .then((response) => {  
          console.log(response.message)
          if(response.message === `Account email '${email}' deleted!`){
            setData([]);
          }
        }).catch((err) => {
            console.log("error", err)
        })
    }

    return (
        <View style ={{flex:1, paddingTop:hp(10), backgroundColor: '#FFFFFF'}}><View style={styles.container}>
            <View style={styles.btncontainer}>
                <TouchableOpacity onPress={readAllFlatList}>
                <Text style={{fontSize:16, fontWeight:'400', color:theme.purple, textDecorationLine:'underline'}}>전체 읽음</Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={DeleteNotification}>
                <Text style={{fontSize:16, fontWeight:'400', color:theme.purple, textDecorationLine:'underline'}}>전체 삭제</Text>
            </TouchableOpacity>
            </View>
            </View>
            <View style ={{flex:9, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
                {!(Object.keys(Data).length === 0) && <FlatList 
                    extradata={Data}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                    data={Data}
                    showsVerticalScrollIndicator ={false}
                    renderItem={({ item }) => 
                        <TouchableOpacity onPress={()=>re_Render_FlatList(item.id)} style={{backgroundColor:(item.read === false) ? theme.white : 'rgba(115, 119, 123, 0.2)', width: wp(95), height: hp(10)}}>
                            <Text style={{color: (item.read === false) ? theme.black : 'grey'}}>{item.date}</Text>
                            <Text style={{color: (item.read === false) ? theme.black : 'grey'}}>{item.message}</Text>
                        </TouchableOpacity>}
                    keyExtractor={(item) => item.id}
                />}
                {(Object.keys(Data).length === 0) && <Text>알림 없음</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
  },
  btncontainer: {
    flexDirection: 'row',
    width: wp(50),
    marginTop: wp(5),
    marginBottom: wp(5),
    justifyContent: 'space-evenly',
  },
  text:{
    fontSize:20, 
    backgroundColor: 'white'  ,
  },
  item: {
    width: wp(95),
    height: hp(10),
    fontSize: 15,
    marginTop: 5,
  }
});