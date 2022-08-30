import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';

export default function App({navigation}) {

    const data = [
        {
            id: "1",
            read: true,
            message: "Earnest Green",
            date: "2022-08-25"
          },
          {
            id: "2",
            read: true,
            message: "Winston Orn",
            date: "2022-08-26"
          },
          {
            id: "3",
            read: false,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "4",
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "5",
            read: true,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "6",
            read: false,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "7",
            read: false,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "8",
            read: false,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "9",
            read: false,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
          {
            id: "10",
            read: false,
            message: "Carlton Collins",
            date: "2022-08-27"
          },
        ]

         useEffect(() => {
 
            setData(Data);
        
        }, []);

    const [Data, setData] = useState(data);
        
        const re_Render_FlatList = (id) =>{
            const newdata = Data.map(obj => {
                if (obj.id === id) {
                  return {...obj, "read": true};
                }
                return obj;
              });
        
            setData(newdata);
        }

        const readAllFlatList = () =>{
            const newdata = Data.map(obj => {
                obj.read = true
                return obj;
              });
        
            setData(newdata);
        }

        const DeleteNotification = () =>{
            setData(null);
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
                {Data && <FlatList 
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
                {!Data && <Text>알림 없음</Text>}
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