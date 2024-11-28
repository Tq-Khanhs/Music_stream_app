import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import { useState,useEffect,useCallback } from 'react'
import { LogBox } from 'react-native';
import { useAudio } from './AudioContext';
import MiniPlayer from './MiniPlayer'

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);
export default function ProfileScreen( {route,navigation}) {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [showFullAbout, setShowFullAbout] = useState(false);
  

  const selectedArtist = route.params;
  const { playTrack } = useAudio();

  const fetchData = useCallback(async () => {
    try {
      const [albumsResponse, tracksResponse] = await Promise.all([
        fetch('https://my.api.mockaroo.com/albums.json?key=5b678c00'),
        fetch('https://my.api.mockaroo.com/tracks.json?key=5b678c00')
      ]);

      const albumsData = await albumsResponse.json();
      const tracksData = await tracksResponse.json();

      setAlbums(albumsData);
      setTracks(tracksData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Failed to load data. Please try again.');
    } finally {
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const artistAlbums = albums.filter(album => selectedArtist.albumsId.includes(album.id));
  const artistTracks = tracks.filter(track => selectedArtist.tracksId.includes(track.id));
  const otherArtistAlbums = albums.filter(album => album.artist !== selectedArtist.name);

  const handleTrackPress = useCallback((track) => {
    playTrack(track);
  }, [playTrack]);

    


    const aboutText = "Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    const toggleAbout = () => {
    setShowFullAbout(!showFullAbout)
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon4 name="arrow-back-ios" size={20} color="black" />
            </TouchableOpacity>
        </View>
        
      <ScrollView>
        
        <View style={styles.profile}>
          <Image
            source={{uri:selectedArtist.image}}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{selectedArtist.name}</Text>
          <Text style={styles.followersCount}>{selectedArtist.followers} Followers</Text>
          <View style={styles.profileActions}>
            <View style= {styles.buttonContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon2 name="dots-horizontal" size={20} color="black" />
            </TouchableOpacity>
            

            </View>

            <View style= {styles.buttonContainer}>
            <TouchableOpacity>
                <Icon2 name="shuffle-variant" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
                <Icon3 name="play" size={40} color="black" />
            </TouchableOpacity>
            </View>

            </View>
            
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular</Text>
          <FlatList
          data={artistTracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleTrackPress(item)}
            >
            <View style={styles.trackItem}>
              <Image
                source={{ uri: item.artwork }}
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
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Albums</Text>
          <FlatList
            data={artistAlbums}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.albumItem}>
                <Image source={{uri:item.image }} style={styles.albumImage} />
                <Text style={styles.albumTitle}>{item.name}</Text>
                <Text style={styles.albumTitle}>{item.artist}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Image source={require('../assets/Image 73.png')}/>
          <Text style={styles.aboutText}>
            {showFullAbout ? aboutText : `${aboutText.slice(0, 150)}...`}
          </Text>
          <TouchableOpacity onPress={toggleAbout}>
            <Text style={styles.viewMoreText}>
              {showFullAbout ? 'View less' : 'View more'}
            </Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fans also like</Text>
          <FlatList
            data={otherArtistAlbums}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.artistItem} onPress={() => navigation.navigate('Album',item)}>
                <Image source={{uri: item.image }} style={styles.artistImage} />
                <Text style={styles.artistName}>{item.name}</Text>
                <Text style={styles.artistName}>{item.artist}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>
      </ScrollView>
      <MiniPlayer navigation={navigation} />

     
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
    paddingTop: 30,
    padding: 16
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profile: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#eee'
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  followersCount: {
    color: '#666',
    marginBottom: 16
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    gap: 100
  },
  buttonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  followButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    height: 36
    
  },
  followButtonText: {
    color: 'black',
    fontWeight: '600'
  },
  playButton: {
    width: 60,
    height: 60,
    
    backgroundColor: '#fff',
    
   
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  songImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#eee'
  },
  songInfo: {
    flex: 1,
    marginLeft: 12
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  songMeta: {
    color: '#666',
    fontSize: 14,
    marginTop: 2
  },
  albumsContainer: {
    flexDirection: 'row',
    gap: 16
  },
  albumList:{
    gap:20

  },
  albumItem: {
    width: 160
  },
  albumImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  aboutText: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 8
  },
  viewMoreText: {
    color: 'purple',
    fontWeight: '600',
    marginLeft:'40%'
  },
  artistsContainer: {
    flexDirection: 'row',
    gap: 16
  },
  artistItem: {
    width: 140,
    alignItems: 'center',
    marginLeft: -10
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 2,
    backgroundColor: '#eee',
    marginBottom: 8
  },
  artistName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
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
})