import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PlaylistScreen = () => {
  // State to manage playlists
  const [playlists, setPlaylists] = useState([
    {
      id: '1',
      title: 'Ipsum sit nulla',
      artist: 'Ashley Scott',
      songs: '12 songs',
      image: require('./assets/img11/Image 110.png')
    },
    {
      id: '2',
      title: 'Occaecat aliq',
      artist: 'Jose Garcia',
      songs: '4 songs',
      image: require('./assets/img11/Image 111.png')
    }
  ]);

// Hook for navigation
const navigation = useNavigation();

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
    image: require('./assets/img11/default-playlist.png') // Assume you have a default image
  };

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
    <Image source={item.image} style={styles.playlistImage} />
    <View style={styles.playlistInfo}>
      <Text style={styles.playlistTitle}>{item.title}</Text>
      <View style={styles.playlistDetails}>
        <Text style={styles.playlistArtist}>{item.artist}</Text>
        <Text style={styles.bulletPoint}> • </Text>
        <Text style={styles.songCount}>{item.songs}</Text>
      </View>
    </View>
    <Feather name="chevron-right" size={24} color="#666" />
  </TouchableOpacity>
);

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
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>

    {/* Add Button */}
    <TouchableOpacity style={styles.addButton} onPress={handleAddPlaylist}>
      <Ionicons name="add" size={32} color="#FFF" />
    </TouchableOpacity>

    {/* Bottom Navigation */}
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.footerItem} 
        onPress={() => handleBottomNavPress('Home')}
      >
        <Ionicons name="home-outline" size={24} color="#666" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.footerItem}
        onPress={() => handleBottomNavPress('Search')}
      >
        <Ionicons name="search-outline" size={24} color="#666" />
        <Text style={styles.footerText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.footerItem}
        onPress={() => handleBottomNavPress('Feed')}
      >
        <Ionicons name="newspaper-outline" size={24} color="#666" />
        <Text style={styles.footerText}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.footerItem, styles.activeFooterItem]}
      >
        <Ionicons name="library" size={24} color="#1DB954" />
        <Text style={[styles.footerText, styles.activeFooterText]}>Library</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});

export default PlaylistScreen;