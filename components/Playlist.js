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

function TrackList(): JSX.Element {
  const [tracks, setTracks] = useState([]);
  const [find, setFind] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const url = `https://spotify23.p.rapidapi.com/search/?q=${find}&type=tracks&offset=0&limit=20&numberOfTopResults=20`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '44cdbc3b95msh83c6cf649adae52p1071d5jsn448fb2f3f007',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.tracks && data.tracks.items) {
          setTracks(data.tracks.items);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTracks();
  }, [find]);

  return (
    <LinearGradient style={styles.container} colors={['#9896F0', '#FBC8D5']}>
      <View style={styles.containerMain}>
        <View style={styles.containerHeader}>
          <Text style={[styles.headerText]}>Music Explorer</Text>
        </View>

        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="What song do you want to listen?"
              mode="outlined"
              value={find}
              onChangeText={(text) => setFind(text)}
              style={{       
                width: 300,         
                marginHorizontal: 20,
                height: 50,
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'white',
                alignContent: 'center'
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
                        fontSize: 15,
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
    height: 65,
    backgroundColor: 'blur',
    padding: 20,
    top: 10,
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
    fontSize: 15,
    top: 5,
  },
  moviePicture: {
    height: 70,
    width: 70,
  },
  text: {
    marginTop: 5,
    fontSize: 20,
    
  },
  pictureContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
  },
  infContainer: {
    flex: 3,
    marginTop: 15,
    marginLeft: 15,
  },
});

export default TrackList;
