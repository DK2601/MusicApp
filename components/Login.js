import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { authorize } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkTokenValidity = async () => {
      
      const accessToken = await AsyncStorage.getItem('token');
      const expirationDate = await AsyncStorage.getItem('expirationTime');
      console.log('accessToken', accessToken);
      console.log('expirationDate', expirationDate)
      
      if(accessToken || expirationDate){
        const currentTime = Date.now();
        if(currentTime < parseInt(expirationDate)){
          navigation.replace('Main')
        } else {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('expirationDate')
        }
      }
    }

    checkTokenValidity()
  }, [])
  async function Authentication(){
    const config = {
      issuer: "https://accounts.spotify.com",
      clientId: "a6f8298b2777437696815c56487499f3",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public"
      ],
      redirectUrl:"app://spotify-auth-callback"
    }
    const result = await authorize(config)
    console.log(result)
    if(result.accessToken){
      const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
      AsyncStorage.setItem('token',result.accessToken)
      AsyncStorage.setItem("expirationTime", expirationDate.toString())
      navigation.navigate('Main')
    }
  }

  return (
    <LinearGradient style={{flex: 1}} colors={['#9896F0', '#FBC8D5']}>
      <SafeAreaView>
        <View style = {{height: 80}} />
          <FontAwesome style={styles.iconSpotify} name="spotify" size={80} color='black' />
          <Text style={styles.textIntro}>Millions of Songs Free on Spotify</Text>
          <View style={{height: 80}} />
          <Pressable style={styles.btn1} onPress={Authentication}>
            <Text style={{fontWeight: 500, textAlign:'center'}}>Sign In with Spotify</Text>
          </Pressable>
          <Pressable style={styles.btn2}>
            <Text style={{fontWeight: 500, textAlign:'center', flex: 1}}>Continue with Phone Number</Text>
            <FontAwesome name='mobile-phone' size={26} color='black' />
          </Pressable>
          <Pressable style={styles.btn2}>
            <Text style={{fontWeight: 500, textAlign:'center', flex: 1}}>Continue with Google Account</Text>
            <FontAwesome name='google' size={26} color='red' />
          </Pressable>
          <Pressable style={styles.btn2}>
            <Text style={{fontWeight: 500, textAlign:'center',flex: 1}}>Continue with Facebook Account</Text>      
            <FontAwesome name='facebook-square' size={26} color='blue' />
          </Pressable>
      </SafeAreaView>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    iconSpotify: {
      textAlign:'center'
    },
    textIntro: {
      fontSize:40, 
      fontWeight:"bold", 
      textAlign: 'center', 
      marginTop: 40,
    },
    btn1: {
      backgroundColor: '#1DB954', 
      padding: 10, 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      width: 300, 
      borderRadius: 25, 
      alignItems: 'center', 
      justifyContent: 'center',
      
    },
    btn2: { 
      padding: 10, 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      width: 300, 
      borderRadius: 25, 
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1
    }
})
export default Login
