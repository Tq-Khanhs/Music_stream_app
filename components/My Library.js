import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
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
    if (!response.ok) throw new Error('Failed to fetch library items');

    const data = await response.json();
    setLibraryItems(data);
    setFilteredItems(data); // Hiển thị toàn bộ dữ liệu ngay từ đầu
    setLoading(false);
  } catch (err) {
    setError('Failed to fetch library items');
    setLoading(false);
    console.error(err);
  }
};

  const handleTabPress = (tab) => {
  setActiveTab(tab);
  switch (tab) {
    case 'Playlists':
      setFilteredItems(libraryItems.filter(item => item.type === 'Playlist'));
      break;
    case 'New tag':
      setFilteredItems(libraryItems.filter(item => item.type === 'Tag'));
      break;
    case 'Songs':
      setFilteredItems(libraryItems.filter(item => item.type === 'Song'));
      break;
    case 'Albums':
      setFilteredItems(libraryItems.filter(item => item.type === 'Album'));
      break;
    case 'Artists':
      setFilteredItems(libraryItems.filter(item => item.type === 'Artist'));
      break;
    default:
      setFilteredItems(libraryItems); // Hiển thị toàn bộ dữ liệu nếu không chọn tab
      break;
  }
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
  navigation.navigate('Playlist', { playlist });
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
    contentContainerStyle={{ flexGrow: 1 }}
  >
    {tabs.map((tab, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.tab, activeTab === tab && styles.activeTab]}
        onPress={() => handleTabPress(tab)}
      >
        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
          {tab}
        </Text>
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
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
        data={activeTab ? filteredItems : libraryItems} // Nếu chưa chọn tab, hiển thị toàn bộ dữ liệu API
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          filteredItems.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items to display.</Text>
            </View>
          )
        }
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
    paddingTop: 30,
    paddingBottom: 13,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  tabsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between', // Phân bố đều các tab
  paddingHorizontal: 16,
  marginBottom: 8,
},

  tab: {
  paddingVertical: 8,
  flex: 1, // Mỗi tab chiếm không gian bằng nhau
  marginHorizontal: 4, // Tạo khoảng cách giữa các tab
  backgroundColor: '#f2f2f2',
  borderRadius: 20,
  alignItems: 'center', // Căn giữa nội dung tab
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
   backgroundColor: '#1DB954',
  },
  activeTabText: {
    color: '#fff',
   fontWeight: '600',
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
});

export default LibraryScreen;