import React, {useState} from 'react';
import {FlatList, StyleSheet,View, Text} from 'react-native';
import Page from './Page';
import { theme } from '../styles/theme';

const styles = StyleSheet.create({
    container: {
      height:'80%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    indicatorWrapper: {
        flexDirection:'Row',
        alignItems:'center',
        marginTop: '16px',
    },
})

// const Container = styled.View`
//   height: 60%;
//   justify-content: center;
//   align-items: center;
// `;

// const Indicator = styled.View<{focused}>`
//   margin: 0px 4px;
//   background-color: ${(props) => (props.focused ? '#262626' : '#dfdfdf')};
//   width: 6px;
//   height: 6px;
//   border-radius: 3px;
// `;


export default function Carousel({gap,offset,pages, pageWidth}) {
  const [page, setPage] = useState(0);

  function renderItem({item}) {
    return (
      <View style={{alignItems:'center'}}>
        <View style={{backgroundColor:theme.purple, marginBottom:3, borderRadius:8,}}>
          <Text style={{color:theme.white, fontSize:15, marginHorizontal:13, marginVertical:3}}>{item.comment}</Text>
        </View>

        <Page item={item} style={{width: pageWidth, marginHorizontal: gap / 2,}} />
      </View>
    );
  }

  const onScroll = (e) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
        <FlatList
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{
            paddingHorizontal: offset + gap / 2,
          }}
          data={pages}
          decelerationRate="fast"
          horizontal
          keyExtractor={(item) => `page__${item.color}`}
          onScroll={onScroll}
          pagingEnabled
          renderItem={renderItem}
          snapToInterval={pageWidth + gap}
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}/>
      {/* <View style={styles.indicatorWrapper}>
        {Array.from({length: pages.length}, (_, i) => i).map((i) => (
          <View key={`indicator_${i}`} focused={i === page} />
        ))}
      </View> */}
      {/* <IndicatorWrapper>
        {Array.from({length: pages.length}, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper> */}
      
    </View>
  );
}