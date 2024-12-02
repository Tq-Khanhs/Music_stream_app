import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet,FlatList } from 'react-native'
import  { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/MaterialIcons'



const tracks  = [
  {
    id: '1',
    title: 'FLOWER',
    artist: 'Jessica Gonzalez',
    plays: '2.1M',
    duration: '3:36',
    image: require('../assets/Image 83.png')
  },
  {
    id: '2', 
    title: 'Shape of You',
    artist: 'Anthony Taylor',
    plays: '68M',
    duration: '3:35',
    image: require('../assets/Image 84.png')
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'Brian Bailey',
    plays: '93M',
    duration: '4:39',
    image: require('../assets/Image 86.png')
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Anthony Taylor',
    plays: '9M',
    duration: '7:48',
    image: require('../assets/Image 87.png')
  },
  {
    id: '5',
    title: 'Astronaut in the Ocean',
    artist: 'Pedro Moreno',
    plays: '23M',
    duration: '3:36',
    image: require('../assets/Image 55.png')
  },
  {
    id: '6',
    title: 'Dynamite',
    artist: 'Elena Jimenez',
    plays: '10M',
    duration: '6:22',
    image: require('../assets/Image 56.png')
  },
  
]

export default function AudiolistScreen() {
    const [selectedTrack, setSelectedTrack] = useState("");

    const handleTrackPress = (track) => {
        setSelectedTrack(track);
    };
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon4 name="arrow-back-ios" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon4 name="mobile-screen-share" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.playlistInfo}>
          <Image
            source={require('../assets/Container 31.png')}
            style={styles.playlistCover}
          />
          <View style={styles.playlist}>
          <Text style={styles.playlistTitle}>Top 50 - Canada</Text>
          <View style={styles.playlistStats}>
            <Icon name="heart" size={20} color="blue" />
            <Text style={styles.statsText}>1,234</Text>
            <Text style={styles.statsText}>• 05:10:18</Text>
          </View>
          <Text style={styles.playlistDescription}>Daily chart-toppers update</Text>

          </View>
          
        </View>

        <View style={styles.controls}>
            <View style={styles.button}>
                <TouchableOpacity>
                    <Icon name="heart" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon2 name="dots-horizontal" size={20} color="black" />
                </TouchableOpacity>

            </View>
            <View style={styles.button}>
                <TouchableOpacity>
                    <Icon2 name="shuffle-variant" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icon3 name="play" size={50} color="black" />
                </TouchableOpacity>
                
            </View>
          
          
        </View>
        
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleTrackPress(item)}
            >
            <View style={styles.trackItem}>
              <Image
                source={item.image }
                style={styles.trackImage}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist}</Text>
                <View style={styles.trackStats}>
                  <Text style={styles.playsText}>{item.plays}</Text>
                  <Text style={styles.durationText}>• {item.duration}</Text>
                </View>
              </View>
              <TouchableOpacity>
                    <Icon2 name="dots-horizontal" size={20} color="black" />
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.trackList}
        />
      

      {selectedTrack && (
        <View style={styles.nowPlaying}>
          <Image
            source={selectedTrack.image }
            style={styles.miniTrackImage}
          />
          <View style={styles.miniTrackInfo}>
            <Text style={styles.miniTrackTitle}>{selectedTrack.title}</Text>
            <Text style={styles.miniTrackArtist}>Me • {selectedTrack.artist}</Text>
          </View>
          <TouchableOpacity>
            <Icon name="heart" size={20} color="white"  style={{paddingRight:20}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="play" size={23} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
            <Icon name="home" size={30} color="black" />
            <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
            <Icon name="search" size={30} color="black" />
            <Text style={styles.tabLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
            <Icon3 name="switcher" size={30} color="black" />
            <Text style={styles.tabLabel}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
            <Icon2 name="music-box-multiple-outline" size={30} color="black" />
          <Text style={styles.tabLabel}>Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical:13
  },
  backButton: {
    fontSize: 24
  },
  playlistInfo: {
    alignItems: 'center',
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 50,
    justifyContent: 'center'
   
  },
  
  playlistCover: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#6b46c1'
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16
  },
  playlistStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  statsText: {
    color: '#666',
    marginLeft: 8
  },
  playlistDescription: {
    color: '#666',
    marginTop: 8
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 25
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  trackList: {
    padding: 16
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  trackImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#eee'
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  trackArtist: {
    color: '#666',
    marginTop: 2
  },
  trackStats: {
    flexDirection: 'row',
    marginTop: 2
  },
  playsText: {
    color: '#666',
    fontSize: 12
  },
  durationText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 8
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'black'
  },
  miniTrackImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#eee'
  },
  miniTrackInfo: {
    flex: 1,
    marginLeft: 12
  },
  miniTrackTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  },
  miniTrackArtist: {
   
    fontSize: 12,
    color: 'white'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
})