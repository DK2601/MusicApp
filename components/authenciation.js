import { SpotifRemote, Scopes } from 'react-native-spotify-remote';

useEffect(() => {
    const connectToSpotify = async () => {
      await SpotifRemote.authorize({
        clientId: 'a6f8298b2777437696815c56487499f3',
        redirectUrl: 'your-app-scheme://callback',
        scopes: [Scopes.AppRemoteControl, Scopes.UserLibraryRead],
      });
  
      await SpotifRemote.connect();
    };
  
    connectToSpotify();
  }, []);
  