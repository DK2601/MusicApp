import React, {useState, useEffect} from "react";
import {
    Image, 
    View,
    Text,
    ScrollView
} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [playlists, setPlaylists] = useState([]);
  
    useEffect(() => {
      const getPlaylists = async () => {
        try {
          const accessToken = await AsyncStorage.getItem("token");
          const response = await axios.get(
            "https://api.spotify.com/v1/me/playlists",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
            }
          );
          setPlaylists(response.data.items);
        } catch (error) {
          console.error(error);
        }
      };
  
      getPlaylists();
    }, []);
    useEffect(() => {
      getProfile();
    }, []);
    const getProfile = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setUserProfile(data);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
    console.log(playlists);
    return (
      <LinearGradient colors={['#9896F0', '#FBC8D5']} style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 50 }}>
          <View style={{ padding: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
                source={{ uri: userProfile?.images[0].url }}
              />
              <View>
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  {userProfile?.display_name}
                </Text>
                <Text style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}>
                  {userProfile?.email}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 12,
            }}
          >
            Your Playlists
          </Text>
          <View style={{padding:15}}>
            {playlists.map((item, index) => (
              <View style={{flexDirection:"row",alignItems:"center",gap:8,marginVertical:10}}>
                <Image
                  source={{
                    uri:
                      item?.images[0]?.url ||
                      "https://images.pexels.com/photos/3944091/pexels-photo-3944091.jpeg?auto=compress&cs=tinysrgb&w=800",
                  }}
                  style={{ width: 50, height: 50, borderRadius: 4 }}
                />
                <View>
                  <Text style={{color:"black"}}>{item?.name}</Text>
                  <Text  style={{color:"gray",marginTop:7}}>{item?.owner?.display_name}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  };
  
  export default UserProfile