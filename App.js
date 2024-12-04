import React from 'react';
import Welcome from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import Audiolist from './screens/ChartListTrackScreen';
import PlayAudio from './components/PlayAudioScreen';
import ArtistFrofile from './screens/ArtistFrofileScreen';
import Login from './screens/LoginScreen';
import SignUp from './screens/SignUpScreen';
import Album from './screens/AlbumListTrackScreen'
import SearchScreen from './screens/SearchScreen';
import Feed from './screens/Feed'
import FeedComment from './screens/FeedComment'
import MyLibrary from './screens/MyLibrary'
import MyPlaylist from './screens/MyPlaylists'
import Plan from './screens/SubscriptionPlans'
import Premium from './screens/LaunchScreenPremium'
import { UserProvider } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { AudioProvider } from './context/AudioContext';
import { store } from './store';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider store={store}>
    <UserProvider>
    <AudioProvider>
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Audiolist" component={Audiolist} options={{ headerShown: false }}/>
        <Stack.Screen name="PlayAudio" component={PlayAudio} options={{ headerShown: false ,cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,}}/>
        <Stack.Screen name="ArtistFrofile" component={ArtistFrofile} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Album" component={Album} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
        <Stack.Screen name="FeedComment" component={FeedComment} options={{ headerShown: false }}/>
        <Stack.Screen name="MyLibrary" component={MyLibrary} options={{ headerShown: false }}/>
        <Stack.Screen name="MyPlaylist" component={MyPlaylist} options={{ headerShown: false }}/>
        <Stack.Screen name="Premium" component={Premium} options={{ headerShown: false }}/>
        <Stack.Screen name="Plan" component={Plan} options={{ headerShown: false }}/>
       
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </AudioProvider>
    </UserProvider>
    </Provider>
  );
}




