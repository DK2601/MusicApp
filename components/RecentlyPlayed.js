import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    Pressable,
    Image
} from 'react-native'

function RecentlyPlayed({item}) {
    const navigation = useNavigation()
    return (
        <Pressable style={{margin: 12}} onPress={() => navigation.navigate('SongInfo',{
            item: item
        }) }>
            <Image style={{ width: 130, height: 130, borderRadius: 5 }} source={{uri: item.track.album.images[0].url }} />
            <Text style={{fontSize: 13,fontWeight: 'bold', color: 'white', marginTop: 10, maxWidth: 130}}>{item.track.name}</Text>
        </Pressable>
    );
}

export default RecentlyPlayed;