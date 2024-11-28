// import Welcome from "./components/Welcome";
// import HomeScreen from "./components/HomeScreen";
// import Audiolist from './components/AudiolistScreen'
// import PlayAudio from './components/PlayAudioScreen'
// import ArtistFrofile from './components/ArtistFrofileScreen'
// import Login from './components/Login'
// import SignUp from './components/SignUpScreen'


// export default function App() {
//   return (
//     // <Login></Login>
//     <HomeScreen></HomeScreen>
//     // <Audiolist></Audiolist>
//     // <PlayAudio></PlayAudio>
//     // <ArtistFrofile></ArtistFrofile>
//     // <Login></Login>
//     // <SignUp></SignUp>
    
//   );
// }

import React from 'react';
import Welcome from './components/Welcome';
import HomeScreen from './components/HomeScreen';
import Audiolist from './components/AudiolistScreen';
import PlayAudio from './components/PlayAudioScreen';
import ArtistFrofile from './components/ArtistFrofileScreen';
import Login from './components/Login';
import SignUp from './components/SignUpScreen';
import Album from './components/AlbumListTrack'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { AudioProvider } from './components/AudioContext';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
    </AudioProvider>
  );
}




