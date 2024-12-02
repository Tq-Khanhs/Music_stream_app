import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState('Playlists');
  const [likedSongs, setLikedSongs] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const tabs = ['Playlists', 'New tag', 'Songs', 'Albums', 'Artists'];
  
  // Sample data modified to match the image
  const libraryItems = [
    {
      id: 1,
      type: 'Artist',
      name: 'Mer Watson',
      followers: '1,234K',
      image: require('./assets/img10/Merwatson.png'),
    },
    {
      id: 2,
      type: 'Song',
      title: 'FLOWER',
      artist: 'Jessica Gonzalez',
      plays: '2.1M',
      duration: '3:36',
      image: require('./assets/img10/Flower.png'),
    },
    {
      id: 3,
      type: 'Song',
      title: 'Shape of You',
      artist: 'Anthony Taylor',
      plays: '68M',
      duration: '03:35',
      image: require('./assets/img10/Shapeofyou.png'),
    },
    {
      id: 4,
      type: 'Playlist',
      title: 'Blinding Lights',
      artist: 'Ashley Scott',
      songs: '4 songs',
      image: require('./assets/img10/BlindingLights.png'),
    },
    {
      id: 5,
      type: 'Song',
      title: 'Levitating',
      artist: 'Anthony Taylor',
      plays: '9M',
      duration: '07:48',
      image: require('./assets/img10/Levitating.png'),
    },
    {
      id: 6,
      type: 'Song',
      title: 'Astronaut in the Ocean',
      artist: 'Pedro Moreno',
      plays: '2.2M',
      duration: '3:36',
      image: require('./assets/img10/Astronautintheocean.png'),
    },
    {
      id: 7,
      type: 'Song',
      title: 'Dynamite',
      artist: 'Elena Jimenez',
      plays: '10M',
      duration: '06:22',
      image: require('./assets/img10/Dynamite.png'),
    },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    // Có thể thêm logic filter items theo tab
  };

  const toggleLike = (songId) => {
    setLikedSongs(currentLikedSongs => 
      currentLikedSongs.includes(songId)
        ? currentLikedSongs.filter(id => id !== songId)
        : [...currentLikedSongs, songId]
    );
  };

  const toggleFollow = (artistId) => {
    setFollowedArtists(currentFollowedArtists => 
      currentFollowedArtists.includes(artistId)
        ? currentFollowedArtists.filter(id => id !== artistId)
        : [...currentFollowedArtists, artistId]
    );
  };

  const handlePlaylistPress = (playlist) => {
    setSelectedPlaylist(playlist);
    Alert.alert(
      'Playlist Selected', 
      `Opened playlist: ${playlist.title}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  const renderItem = ({ item }) => {
    const isLiked = likedSongs.includes(item.id);
    const isFollowed = followedArtists.includes(item.id);

    return (
      <View style={styles.itemContainer}>
        {item.type === 'Artist' ? (
          <View style={styles.artistItem}>
            <Image source={item.image} style={styles.artistImage} />
            <View style={styles.artistInfo}>
              <Text style={styles.artistName}>{item.name}</Text>
              <Text style={styles.artistFollowers}>{item.followers} Followers</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.followButton, 
                isFollowed && styles.followedButton
              ]}
              onPress={() => toggleFollow(item.id)}
            >
              <Text style={styles.followButtonText}>
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : item.type === 'Playlist' ? (
          <TouchableOpacity 
            style={styles.songItem}
            onPress={() => handlePlaylistPress(item)}
          >
            <Image source={item.image} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist} • {item.songs}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ) : (
          <View style={styles.songItem}>
            <Image source={item.image} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <View style={styles.songDetails}>
                <Text style={styles.songArtist}>{item.artist}</Text>
                <View style={styles.statsContainer}>
                  <Text style={styles.songStats}>{item.plays} • {item.duration}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={isLiked ? "#FF0000" : "#1DB954"} 
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab, 
            activeTab === tab && styles.activeTab
          ]}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={[
            styles.tabText, 
            activeTab === tab && styles.activeTabText
          ]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const handleFooterNavigation = (screen) => {
    // Thêm logic điều hướng giữa các màn hình
    Alert.alert(
      'Navigation', 
      `Navigating to ${screen}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity onPress={() => Alert.alert('Search', 'Search functionality')}>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {renderTabs()}
      <FlatList
        data={libraryItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        {['Home', 'Search', 'Feed', 'Library'].map((screen, index) => (
          <TouchableOpacity 
            key={screen}
            style={[
              styles.footerItem, 
              screen === 'Library' && styles.activeFooterItem
            ]}
            onPress={() => handleFooterNavigation(screen)}
          >
            <Ionicons 
              name={
                screen === 'Home' ? 'home-outline' :
                screen === 'Search' ? 'search-outline' :
                screen === 'Feed' ? 'newspaper-outline' :
                'library-outline'
              }
              size={24} 
              color={screen === 'Library' ? '#1DB954' : '#666'} 
            />
            <Text style={[
              styles.footerText, 
              screen === 'Library' && styles.activeFooterText
            ]}>{screen}</Text>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 13,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  listContainer: {
    paddingTop: 8,
  },
  itemContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  artistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
  },
  artistFollowers: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  songDetails: {
    marginTop: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songStats: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeFooterItem: {
    color: '#1DB954',
  },
  activeFooterText: {
    color: '#1DB954',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  followedButton: {
    backgroundColor: '#666',
  },
});

export default LibraryScreen;