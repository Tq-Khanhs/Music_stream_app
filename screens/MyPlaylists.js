import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator,SafeAreaView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'


const PlaylistScreen = ({navigation}) => {
  // State to manage playlists
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook for navigation


  // Fetch playlists from API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('https://my.api.mockaroo.com/playlist.json?key=8e25acb0');
  
        if (!response.ok) {
          throw new Error('Failed to load playlists');
        }
  
        const data = await response.json();
        setPlaylists(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        Alert.alert('Error', 'Failed to load playlists');
        console.error(err);
      }
    };
  
    fetchPlaylists();
  }, []);

// Function to handle back navigation
const handleBackPress = () => {
  navigation.goBack();
};

// Function to handle casting/sharing
const handleCastPress = () => {
  Alert.alert(
    'Cast Playlist',
    'Choose a device to cast your playlist',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Cast', onPress: () => console.log('Casting playlist') }
    ]
  );
};

// Function to add new playlist
const handleAddPlaylist = () => {
  const newPlaylist = {
    id: (playlists.length + 1).toString(),
    title: 'New Playlist',
    artist: 'You',
    songs: '0 songs',
    image: require('../assets/img11/Image 110.png') // Assume you have a default image
  };png

  setPlaylists([...playlists, newPlaylist]);
  Alert.alert('Playlist Created', 'A new playlist has been added to your library');
};

// Function to handle playlist item press
const handlePlaylistPress = (playlist) => {
  navigation.navigate('PlaylistDetail', { playlist });
};

// Function to handle bottom navigation
const handleBottomNavPress = (screen) => {
  navigation.navigate(screen);
};

const renderPlaylistItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.playlistItem} 
    onPress={() => handlePlaylistPress(item)}
  >
    <Image 
      source={{ uri: item.image }} 
      style={styles.playlistImage} 
      defaultSource={require('../assets/img11/Image 111.png')}
    />
    <View style={styles.playlistInfo}>
      <Text style={styles.playlistTitle}>{item.title}</Text>
      <View style={styles.playlistDetails}>
        <Text style={styles.playlistArtist}>{item.artist}</Text>
        <Text style={styles.bulletPoint}> • </Text>
        <Text style={styles.songCount}>{item.songs} songs</Text>
      </View>
    </View>
    <Feather name="chevron-right" size={24} color="#666" />
  </TouchableOpacity>
);

// Render loading state
if (loading) {
  return (
      <SafeAreaView style={styles.containerLoad}>
        <ActivityIndicator size="large" color="#6200EE" />
      </SafeAreaView>
  );
}

// Render error state
if (error) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Failed to load playlists</Text>
      <TouchableOpacity onPress={() => fetchPlaylists()} style={styles.retryButton}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

return (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Feather name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Playlists</Text>
      <TouchableOpacity onPress={handleCastPress}>
        <Feather name="cast" size={24} color="#000" />
      </TouchableOpacity>
    </View>

    {/* Playlists Section */}
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Your playlists</Text>
      <FlatList
        data={playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>

    {/* Add Button */}
    <TouchableOpacity style={styles.addButton} onPress={handleAddPlaylist}>
      <Ionicons name="add" size={32} color="#FFF" />
    </TouchableOpacity>

    {/* Bottom Navigation */}
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
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },tabBar: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playlistImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playlistDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistArtist: {
    fontSize: 14,
    color: '#666',
  },
  bulletPoint: {
    color: '#666',
    marginHorizontal: 4,
  },
  songCount: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeFooterItem: {
    color: '#1DB954',
  },
  activeFooterText: {
    color: '#1DB954',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoad: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#1DB954',
    borderRadius: 5,
  },
});

export default PlaylistScreen;