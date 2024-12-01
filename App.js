import React from 'react';
import Welcome from './screens/Welcome';
import HomeScreen from './screens/HomeScreen';
import Audiolist from './screens/AudiolistScreen';
import PlayAudio from './screens/PlayAudioScreen';
import ArtistFrofile from './screens/ArtistFrofileScreen';
import Login from './screens/Login';
import SignUp from './screens/SignUpScreen';
import Album from './screens/AlbumListTrack'
import SearchScreen from './screens/SearchResult';
import { UserProvider } from './context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { AudioProvider } from './context/AudioContext';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <UserProvider>
    <AudioProvider>
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
      </Stack.Navigator>
    </NavigationContainer>
    </AudioProvider>
    </UserProvider>
  );
}




