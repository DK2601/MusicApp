import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,


} from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';




const SongInfo = () => {
    const route = useRoute();
    console.log(route.params);
    const albumUrl = route?.params?.item?.track?.album?.uri;
    const [tracks, setTracks] = useState([]);
    const navigation = useNavigation();
    const albumId = albumUrl.split(":")[2];
    console.log(albumId);
    useEffect(() => {
      async function fetchSongs() {
        const accessToken = await AsyncStorage.getItem("token");
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/albums/${albumId}/tracks`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error("failed to fetch album songs");
          }
  
          const data = await response.json();
          const tracks = data.items;
          setTracks(tracks);
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchSongs();
    }, []);
    console.log(tracks);
    return (
      <LinearGradient colors={['#9896F0', '#FBC8D5']} style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", padding: 12 }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: route?.params?.item?.track?.album?.images[0].url }}
              />
            </View>
          </View>
          <Text
            style={{
              color: "black",
              marginHorizontal: 12,
              marginTop: 10,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {route?.params?.item?.track?.name}
          </Text>
          <View
            style={{
              marginHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 10,
              gap: 7,
            }}
          >
            {route?.params?.item?.track?.artists?.map((item, index) => (
              <Text style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}>
                {item.name}
              </Text>
            ))}
          </View>
            <View>
                <View style={{marginTop:10,marginHorizontal:12}}>
                    {tracks?.map((track,index) => (
                        <Pressable style={{marginVertical:10,flexDirection:"row",justifyContent:"space-between"}}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:"500",color:"black"}}>{track?.name}</Text>
                                <View style={{flexDirection:"row",alignItems:"center",gap:8,marginTop:5}}>
                                    {track?.artists?.map((item,index) => (
                                        <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>{item?.name}</Text>
                                    ))}
                                </View>
  
                            </View>
                        </Pressable>
                    ))}
                </View>
            </View>
  
        </ScrollView>
      </LinearGradient>
    );
}

export default SongInfo