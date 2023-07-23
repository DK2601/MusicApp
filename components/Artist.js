import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

const Artist = ({ item }) => {
    return (
        <View style={{ margin: 10 }}>
            <Image style={{ width: 130, height: 130, borderRadius: 5 }} source={{ uri: item.images[0].url }} />
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 10 }}>{item?.name}</Text>
        </View>
    )

}

export default Artist