/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PlayMusic from './components/PlayMusic';
import Home from './components/Home';

AppRegistry.registerComponent(appName, () => App);

// if (Platform.OS === 'android') {
//     const rootTag = document.getElementById('root') || document.getElementById('X');
//     AppRegistry.runApplication('MusicApp', { rootTag });
// }
