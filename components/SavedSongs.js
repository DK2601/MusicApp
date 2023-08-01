import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable, 
    Image
} from 'react-native';


const SavedSongs = ({item}) => {
    return (
        <Pressable style={{flexDirection:'row', margin: 10, alignItems: 'center'}}>
            <Image style={{height: 70, width: 70, marginRight: 10}} source={{uri: item?.track?.album?.images[0].url}} />
            <View>
                <Text style={{fontWeight:'bold', fontSize: 17}}>{item?.track?.name}</Text>
                <Text style={{marginTop: 4}}>{item?.track?.artists[0].name}</Text>
            </View>
        </Pressable>
    );
}

export default SavedSongs;