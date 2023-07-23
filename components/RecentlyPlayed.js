import React from 'react';
import {
    View,
    Text,
    Pressable,
    Image
} from 'react-native'

function RecentlyPlayed({item}) {
    return (
        <Pressable style={{margin: 12}}>
            <Image style={{ width: 130, height: 130, borderRadius: 5 }} source={{uri: item.track.album.images[0].url }} />
            <Text numberOfLines={2} style={{fontSize: 13,fontWeight: 'bold', color: 'white', marginTop: 10}}>{item.track.name}</Text>
        </Pressable>
    );
}

export default RecentlyPlayed;