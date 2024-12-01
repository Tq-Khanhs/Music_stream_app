import React, { useState,useEffect,useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import MiniPlayer from '../components/MiniPlayer'
import { useAudio } from '../context/AudioContext';

const SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  
  

  const categories = ['All', 'Tracks', 'Albums', 'Artists'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchResult, setSearchResult] = useState([]);

  const { playTrack } = useAudio();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [artistsResponse, albumsResponse, tracksResponse] = await Promise.all([
        fetch('https://my.api.mockaroo.com/artists.json?key=5b678c00'),
        fetch('https://my.api.mockaroo.com/albums.json?key=5b678c00'),
        fetch('https://my.api.mockaroo.com/tracks.json?key=5b678c00')
      ]);

      const artistsData = await artistsResponse.json();
      const albumsData = await albumsResponse.json();
      const tracksData = await tracksResponse.json();

      setArtists(artistsData);
      setAlbums(albumsData);
      setTracks(tracksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchResults = useMemo(() => {
    const keyword = searchText.toLowerCase();
  
    const filteredAlbums = albums.filter(
      (album) =>
        album.name.toLowerCase().includes(keyword) ||
        album.artist.toLowerCase().includes(keyword)
    );
  
    const filteredTracks = tracks.filter((track) =>
      track.title.toLowerCase().includes(keyword) ||
      track.artist.toLowerCase().includes(keyword)
    );
  
    const filteredArtists = artists.filter((artist) =>
      artist.name.toLowerCase().includes(keyword)
    );
  
    let results = [];
  
    if (activeCategory === 'All' || activeCategory === 'Albums') {
      results.push(...filteredAlbums.map((item) => ({ ...item, type: "album" })));
    }
    if (activeCategory === 'All' || activeCategory === 'Tracks') {
      results.push(...filteredTracks.map((item) => ({ ...item, type: "track" })));
    }
    if (activeCategory === 'All' || activeCategory === 'Artists') {
      results.push(...filteredArtists.map((item) => ({ ...item, type: "artist" })));
    }
  
    return results;
  }, [searchText, activeCategory]); 
  
  const handleTrackPress = useCallback((track) => {
    playTrack(track);
  }, [playTrack]);
  
  useEffect(() => {
    setSearchResult(searchResults);
  }, [searchResults]);

  const renderSearchResult = (item) => {
    switch (item.type) {
      case 'track':
        return (
          <TouchableOpacity 
              onPress={() => navigation.navigate('Album',item)}
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
                  <Text style={styles.durationText}>•{item.duration}</Text>
                </View>
              </View>
              <TouchableOpacity>
                    <Icon2 name="dots-horizontal" size={20} color="black" />
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        );
      case 'artist':
        return (
      <TouchableOpacity style={styles.artistContainer} onPress={() => navigation.navigate('ArtistFrofile',item)} >
      <View style={styles.profileSection}>
        <Image
          source={{ uri: item.image }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.followersContainer}>
            <Text style={styles.followersCount}>{item.followers}</Text>
            <Text style={styles.followersLabel}>Followers</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.followButton}
        activeOpacity={0.7}
        onPress={() => console.log('Follow pressed')}
      >
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
        );
      case 'album':
        return (
          <TouchableOpacity 
          onPress={() => navigation.navigate('Album',item)}
            >
            <View style={styles.trackItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.trackImage}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.name}</Text>
                <Text style={styles.trackArtist}>{item.artist}</Text>
                <View style={styles.trackStats}>
                  
                  <Text style={styles.durationText}>•{item.duration}</Text>
                </View>
              </View>
              
            </View>
            </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          
          <TextInput 
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText !== '' && (
            <TouchableOpacity 
              onPress={() => setSearchText('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.categoryButton,
                category === activeCategory && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                category === activeCategory && styles.activeCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

     
      
      <ScrollView style={styles.resultsContainer}>
        {searchResult.map((item) => renderSearchResult(item))}
      </ScrollView>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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

  header: {
    paddingTop: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 40,
    marginTop:20
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft:10,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    marginRight: 32,
    paddingBottom: 8,
  },
  activeCategoryButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#1DA1F2',
  },
  categoryText: {
    fontSize: 15,
    color: '#666',
  },
  activeCategoryText: {
    color: '#1DA1F2',
    fontWeight: '600',
  },

  // Content Styles
  content: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingRight: 16,
    backgroundColor: '#fff',
  },
   thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  circularThumbnail: {
    borderRadius: 26, 
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  followButton: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1DA1F2',
  },
  followButtonText: {
    color: '#1DA1F2',
    fontSize: 13,
    fontWeight: '500',
  },
  songInfo: {
    flexDirection: 'column',
  },
  itemArtist: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIcon: {
    marginRight: 4,
  },
  itemFollowers: {
    fontSize: 13,
    color: '#666',
  },
  plays: {
    fontSize: 13,
    color: '#666',
  },
  bulletPoint: {
    fontSize: 13,
    color: '#666',
    marginHorizontal: 6,
  },
  duration: {
    fontSize: 13,
    color: '#666',
  },
  moreButton: {
    padding: 8,
  },

  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  footerItem: {
    alignItems: 'center',
    padding: 8,
  },
  footerText: {
    fontSize: 11,
    marginTop: 4,
    color: '#666',
  },
  activeFooterText: {
    color: '#1DA1F2',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical:5,
  },
  trackImage: {
    width: 55,
    height: 55,
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
  },  playsText: {
    color: '#666',
    fontSize: 12
  },
  durationText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 8
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical:5,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  followersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersCount: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  followersLabel: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'transparent',
  },
  followButtonText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  resultsContainer:{
    paddingHorizontal:10
  }
  
});

export default SearchScreen;