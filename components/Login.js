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
          <FontAwesome style={styles.iconSpotify} name="spotify" size={90} color='#4d4dff' />
          <Text style={styles.textIntro}>A million songs are <Text style={{ color: '#4d4dff'}}>free on Spotify</Text></Text>
          <View style={{height: 80}} />
          <Pressable style={styles.btn1} onPress={Authentication}>
            <Text style={{fontWeight: 500, textAlign:'center', color:'white', fontFamily: 'tahoma', fontSize: 20 , fontWeight:"bold", }}>Sign In with Spotify</Text>
          </Pressable>
          <Pressable style={styles.btn2}>
            <Text style={{fontSize:16,marginLeft: 1, fontWeight: 500, textAlign:'left', flex: 1, fontFamily: 'tahoma',fontWeight: 'bold'}}>Continue with Phone Number</Text>
            {/* <Text style={styles.con}>Continue with Phone Number</Text> */}
            <FontAwesome style = {styles.icon1} name='mobile-phone' size={28} color='black' />
          </Pressable>
          <Pressable style={styles.btn2}>
            <Text style={{fontSize:16,marginLeft: 1,fontWeight: 500, textAlign:'left', flex: 1, fontFamily: 'tahoma',fontWeight: 'bold'}}>Continue with Google Account</Text>
            {/* <Text style={styles.con}>Continue with Google Account</Text> */}
            <FontAwesome style = {styles.icon} name='google' size={26} color='red' />
          </Pressable>
          <Pressable style={styles.btn2}>
            <Text style={{fontSize:16,marginLeft: 1,fontWeight: 500, textAlign:'left',flex: 1, fontFamily: 'tahoma',fontWeight: 'bold'}}>Continue with Facebook Account</Text> 
            {/* <Text style={styles.con}>Continue with Facebook Account</Text>            */}
            <FontAwesome style = {styles.icon} name='facebook-square' size={26} color='blue' />
          </Pressable>
      </SafeAreaView>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    iconSpotify: {
      marginTop: 30,
      textAlign:'center',
      width: 400,
      heigh: 400,
    },
    textIntro: {
      fontSize:40, 
      fontWeight:"bold", 
      textAlign: 'center', 
      marginTop: 10,
      fontFamily: 'tahoma',
      marginBottom: 50,
    },
    btn1: {
      // backgroundColor: '#1DB954', 
      backgroundColor: '#4d4dff', 
      padding: 10, 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      width: 300, 
      heigh: 160,
      borderRadius: 25, 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: 40
      
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
      borderWidth: 1,
      fontWeight: 'bold',
      fontSize: 50
      
    },
    icon:{
      marginRight: 5,

    },
    icon1: {
      marginRight:11,

    },

})
export default Login
