import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import  LinearGradient  from 'react-native-linear-gradient';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TrackList(): JSX.Element {
  const [tracks, setTracks] = useState([]);
  const [find, setFind] = useState('');

  useEffect(() => {
      const accessToken = AsyncStorage.getItem('token');
      const searchSongs = async () => {
        try{
          const response = await axios.get('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=track&limit=50&include_external=audio',
          {
            headers: {
              Authorization: `Bearer ${token}` // token is a variable which holds the access_token or
            }
          })
        } catch(err) {
            console.log(err.message)
        }
      } 
      searchSongs()
  })

  return (
    <LinearGradient style={styles.container} colors={['#9896F0', '#FBC8D5']}>
      <View style={styles.containerMain}>
        
        <View style={styles.containerHeader}>
          <Text style={[styles.headerText]}>Music <Text style={{ color: '#FBC8D5',fontWeight: 'bold'}}>Explorer</Text></Text>
        </View>

        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {/* <TextInput style= {[styles.searchBar]} */}
            <TextInput
              placeholder="What song do you want to listen?"
              mode="outlined"
              value={find}
              onChangeText={(text) => setFind(text)}
              style={{       
                width: 390,      
                borderRadius: 10 ,   
                marginHorizontal: 10,
                height: 48,
                fontFamily: 'tahoma' ,
                textAlign: 'center',
                color: 'black',
                backgroundColor: '#F0FFF0',
                alignContent: 'center',
                fontSize: 18 ,
                fontWeight: '700'
              }}
            >
            
            </TextInput>
            {/* <TouchableOpacity onPress={() => {}}>
              <FontAwesome5 name={'search'} size={25} color="black" />
            </TouchableOpacity> */}
          </View>

          {tracks.map((track) => (
            <TouchableOpacity key={track.data.id}>
              <View style={styles.containerMovieInf}>
                <View style={styles.pictureContainer}>
                  <Image style={styles.moviePicture} source={{ uri: track.data.albumOfTrack.coverArt.sources[0].url }} />
                </View>

                <View style={styles.infContainer}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingHorizontal: 15,
                      },
                    ]}
                  >
                    {track.data.name}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 15,
                        paddingHorizontal: 15,
                        color: 'gray'
                      },
                    ]}
                  >
                  ({track.data.artists.items[0].profile.name})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    backgroundColor: 'blur',
    padding: 20,
    top: 5,
  },
  containerMain: {
    flex: 1,
  },
  containerMovieInf: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 90,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'cursive',
    fontSize: 40 ,
    marginRight: 10,
    textAlign: 'center'
    // top: 5,
  },
  moviePicture: {
    height: 72,
    width: 72,
    marginLeft: 20,
  },
  text: {
    marginTop: 5,
    marginLeft: 2,
    fontSize: 20,
    fontFamily:'verdana',

    
  },
  pictureContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 6,
  },
  infContainer: {
    flex: 3,
    marginTop: 15,
    marginLeft: 2,
  },
  searchBar: {
    width: 390,      
    borderRadius: 30 ,   
    marginHorizontal: 10,
    height: 40,
    fontFamily: 'tahoma' ,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#F0FFF0',
    alignContent: 'center',
  }
 
});

export default TrackList;
