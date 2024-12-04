import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator,SafeAreaView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'


const LibraryScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Playlists');
  const [libraryItems, setLibraryItems] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ['Playlists', 'New tag', 'Songs', 'Albums', 'Artists'];
  
  useEffect(() => {
    fetchLibraryItems();
  }, []);

  const fetchLibraryItems = async () => {
    try {
      const response = await fetch('https://my.api.mockaroo.com/library.json?key=8e25acb0');
  
      if (!response.ok) {
        throw new Error('Failed to fetch library items');
      }
  
      const data = await response.json();
      setLibraryItems(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch library items');
      setLoading(false);
      console.error(err);
    }
  };
  


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
  
  if (loading) {
    return (
      <SafeAreaView style={styles.containerLoad}>
          <ActivityIndicator size="large" color="#6200EE" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchLibraryItems}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  containerLoad: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  retryText: {
    color: '#1DB954',
    fontSize: 16,
    marginTop: 10,
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
});

export default LibraryScreen;