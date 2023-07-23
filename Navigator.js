import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import TrackList from './components/Playlist';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import Home from './components/Home';


const Tab = createBottomTabNavigator();

function BottomTab(){
    return (
        <Tab.Navigator>
            < Tab.Screen name = "Home"
            component = { Home }
            options = {
                {
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: {color: 'white'},
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Ionicons name="home" size={24} color="black" />
                    ) : (
                        <Ionicons name='home' size={24} />
                    )
                }
            }
            />
            <Tab.Screen 
                name="Playlist" 
                component={TrackList} 
                options = {
                {
                    tabBarLabel: "Profile",
                    headerShown: false,
                    tabBarLabelStyle: {color: 'white'},
                    tabBarIcon: ({focused}) => 
                    focused ? (
                        <Ionicons name='search' size={24} color="black" />
                    ) : (
                        <Ionicons name="search" size={24}  />
                    )
                }
            } />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
                <Stack.Screen name='Main' component={BottomTab} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation