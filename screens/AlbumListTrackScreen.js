import React, {useState,useCallback} from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet,FlatList ,ActivityIndicator} from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import { useAudio } from '../context/AudioContext';
import MiniPlayer from '../components/MiniPlayer'
import { useUser } from '../context/UserContext';
import { useGetTracksQuery, useUpdateUserMutation } from '../apiSlice';

export default function AlbumListTrack({ route, navigation }) {
    const { data: tracks = [], isLoading: isTracksLoading } = useGetTracksQuery();
    const selectedAlbum= route.params;
    const { playTrack } = useAudio();
    const { user, setUser } = useUser();
    const [updateUser] = useUpdateUserMutation();
    const [isLiked, setIsLiked] = useState(user.likedAlbum.includes(selectedAlbum.id));

    const handleTrackPress = (track) => {
      playTrack(track);
    };
    const handleLikePress = useCallback(async () => {
      const updatedLikedAlbums = isLiked
        ? user.likedAlbum.filter(id => id !== selectedAlbum.id)
        : [...user.likedAlbum, selectedAlbum.id];
  
      setIsLiked(!isLiked);
      setUser(prevUser => ({
        ...prevUser,
        likedAlbum: updatedLikedAlbums
      }));
  
      try {
        await updateUser({
          id: user.id,
          likedAlbum: updatedLikedAlbums
        });
      } catch (error) {
        console.error('Failed to update user:', error);
        
        setIsLiked(isLiked);
        setUser(prevUser => ({
          ...prevUser,
          likedAlbum: user.likedAlbum
        }));
      }
    }, [isLiked, selectedAlbum.id, user, setUser, updateUser]);

    if ( isTracksLoading) {
      return (
        <SafeAreaView style={styles.containerLoad}>
          <ActivityIndicator size="large" color="#6200EE" />
        </SafeAreaView>
      );
    }
    const albumTracks = tracks.filter(track => selectedAlbum.tracksId.includes(track.id));

    
      
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon4 name="arrow-back-ios" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity >
            <Feather name="cast" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.playlistInfo}>
          <Image
            source={{uri:selectedAlbum.image}}
            style={styles.playlistCover}
          />
          <View style={styles.playlist}>
          <Text style={styles.playlistTitle}>{selectedAlbum.name}</Text>
          <View style={styles.playlistStats}>
            <Icon name="heart" size={20} color="blue" />
            <Text style={styles.statsText}>{selectedAlbum.likes}</Text>
            <Text style={styles.statsText}>• {selectedAlbum.duration}</Text>
          </View>
          

          </View>
          
        </View>

        <View style={styles.controls}>
            <View style={styles.button}>
                <TouchableOpacity onPress={handleLikePress}>
                <Icon3 
                  name={isLiked ? "heart" : "hearto"} 
                  size={20} 
                  color={isLiked ? "red" : "black"} 
                  
            />
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
          data={albumTracks}
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
      

      <MiniPlayer navigation={navigation} />
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={30} color="black" />
            <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchScreen')}>
            <Icon name="search" size={30} color="black" />
            <Text style={styles.tabLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Feed')}>
            <Icon3 name="switcher" size={30} color="black" />
            <Text style={styles.tabLabel}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
            <Icon2 name="music-box-multiple-outline" size={30} color="black" onPress={() => navigation.navigate('MyLibrary')} />
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
  containerLoad: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
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
    justifyContent: 'center',
    
   
  },
  
  playlistCover: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#6b46c1',
    marginLeft:20
    
    
    
  },
  playlist:{
        width: "50%"
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    height: 80
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
    marginLeft: 12,
    
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