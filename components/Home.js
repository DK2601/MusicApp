import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Artist from './Artist';
import RecentlyPlayed from './RecentlyPlayed';

const Home = () => {
  const [userProfile, setUserProfile] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  ////// 
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Chào Buổi Sáng";
    } else if (currentTime < 16) {
      return "Chào Buổi Chiều";
    } else {
      return "Chào Buổi Tối";
    }
  };
  const message = greetingMessage();

  ////////////////////////////////////
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
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const getRecentlyPlayedSong = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const response = await axios({
        method: "GET",
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=4',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = await response.data.items
      setRecentlyPlayed(tracks);
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    getRecentlyPlayedSong();
  }, []);
  const renderItems = ({ item }) => {
    return (
      <Pressable style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: '#282828',
        borderRadius: 4,
        elevation: 3
      }}>
        <Image style={{ height: 55, width: 55 }} source={{ uri: item.track.album.images[0].url }} />
        <View style={{ flex: 1, marginHorizontal: 8, justifyContent: 'center' }} >
          <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>{item.track.name}</Text>
        </View>
      </Pressable>
    )
  }

  ////////////////////////////
  useEffect(() => {
    const getTopItems = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("token");
        const type = "artists";
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setTopArtists(response.data.items)

      } catch (err) {
        console.log(err.message);
      }
    }


    getTopItems();
  }, []);
  console.log(recentlyPlayed);
  return (
    <LinearGradient colors={['#9896F0', '#FBC8D5']} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: userProfile?.images[0].url }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            > {message}
            </Text>
          </View>
          <View style={{ height: 10 }}></View>
          <Pressable
            style={{
              marginBottom: 10,
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              flexDirection: 'row',
              backgroundColor: '#282828',
              borderRadius: 4,
              elevation: 5,
              alignItems: 'center'
            }}>
            <LinearGradient colors={['#FF668A', '#FF003C']}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name='heart' size={34} color='white' />
              </Pressable>
            </LinearGradient>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Liked Songs</Text>
          </Pressable>
        </View>
        <FlatList data={recentlyPlayed} renderItem={renderItems} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between' }} />
        <Text style={{color: 'white', fontSize: 19,fontWeight:'bold', marginHorizontal: 10, marginTop: 10}}>Top Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map((item, index) => (
            <Artist item={item} key={index} />
          ))}
        </ScrollView>
        <View style={{height: 20}} />
        <Text style={{color: 'white', fontSize: 19,fontWeight:'bold', marginHorizontal: 10, marginTop: 10}}>Recently Played</Text>
        <FlatList data={recentlyPlayed} horizontal showsHorizontalScrollIndicator={false} renderItem={({item, index}) => (<RecentlyPlayed item={item} key={index}/>)} />
      </ScrollView>
    </LinearGradient>
  )
}

export default Home