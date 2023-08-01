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
import LikedSong from './LikedSong';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [userProfile, setUserProfile] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const navigation = useNavigation();
  ////// 
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Chào buổi sáng!";
    } else if (currentTime < 18) {
      return "Chào buổi chiều!";
    } else {
      return "Chào buổi tối!";
    }
  };
  const message = greetingMessage();

  ////////////////////////////////////
  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    if(accessToken=null){
      navigation.navigate('Login')
    }
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
  return (
    <LinearGradient colors={['#9896F0', '#FBC8D5']} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 40,
                resizeMode: "cover",
                marginLeft: 10,
              }}
              source={{ uri: userProfile?.images[0].url }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
                fontFamily: 'georgia',
              }}
            > {message}
            </Text>
          </View>
          <View style={{ height: 10 }}></View>
          <Pressable
            onPress={() => navigation.navigate('LikedSong')}
            style={{
              marginBottom: 10,
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              flexDirection: 'row',
              backgroundColor: '#4d4d4d',
              elevation: 5,
              alignItems: 'center',
              borderRadius: 15,
              width: 390,
            }}>
            <LinearGradient colors={['#FF668A', '#FF003C']}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ff80aa',
                }}
              >
                <Ionicons name='heart' size={34} color='white'/>
              </Pressable>
            </LinearGradient>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Liked Songs</Text>
          </Pressable>
        </View>
        <FlatList data={recentlyPlayed} renderItem={renderItems} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between'}} />
        <Text style={{
          color: 'white',
          fontSize: 25,
          fontWeight:'bold', 
          marginHorizontal: 10, 
          marginTop: 16,
          }}>Top Artists</Text>        
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map((item, index) => (
            <Artist item={item} key={index} />
          ))}
        </ScrollView>
        <Text style={{
          color: 'white', 
          fontSize: 25,
          fontWeight:'bold', 
          marginHorizontal: 10, 
          marginTop: 20,
          }}>Recently Played</Text>        
          <FlatList data={recentlyPlayed} horizontal showsHorizontalScrollIndicator={false} renderItem={({item, index}) => (<RecentlyPlayed item={item} key={index}/>)} />
      </ScrollView>
    </LinearGradient>
  )
}

export default Home