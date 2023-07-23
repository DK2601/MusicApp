import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import {TextInput} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';


const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);


    const Register = (navigation) => {
        fetch(`http://10.7.188.21:8090/api/register`, {
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify ({
              "email": email,
              "username": username,
              "password": password
          })
        })
        .then(response => {
          if(!response){
            Alert.alert("Sign up failed");
          } else {
            Alert.alert('Successfully registered');
          }
          navigation.navigate('Login')
        })
      }
    const testHandler = () => {
        fetch('http://192.168.1.52:8090/api/test')
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function setSecureTextInput(newState) {
        this.setState({
          secure: newState
        })
      }

    const Login = (navigation) => {
      navigation.navigate('Login')
    }

    return (
        <LinearGradient style={styles.container} colors={[ '#9896F0', '#FBC8D5']}>
            <Text style={styles.text}> Sign Up </Text>
            <TextInput
                mode="outlined"
                label='Email'
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                mode="outlined"
                label='Username'
                style={styles.input}
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry={secure}
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                right={<TextInput.Icon icon="eye" onPress={() => setSecure(!secure)} />}
            />
            <TouchableOpacity style={styles.button} onPress={Register}>
                <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Login}>
                <Text style = {styles.subText} >Already have an account?</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,        
    },
    input: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 15,
        width: '80%'
    },
    button: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        margin: 5,
        width: '80%',
        height: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    subText: {
      alignSelf: 'center',
      paddingTop: 12,
      fontStyle: 'italic',
    }
});

export default SignUp
