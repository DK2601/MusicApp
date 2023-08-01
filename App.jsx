import React from 'react';
import TrackList from "./components/Playlist";
import Navigation from './Navigator';
import { PlayerContext } from './components/PlayerContext';
import { ModalPortal } from "react-native-modals";

const App = () => {
  return (
    <PlayerContext>
        <Navigation/>
        <ModalPortal/>
    </PlayerContext>
  )
}

export default App