import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const LibraryScreen = () => {
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.type === 'Artist' ? (
        <View style={styles.artistItem}>
          <Image source={item.image} style={styles.artistImage} />
          <View style={styles.artistInfo}>
            <Text style={styles.artistName}>{item.name}</Text>
            <Text style={styles.artistFollowers}>{item.followers} Followers</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
      ) : item.type === 'Playlist' ? (
        <TouchableOpacity style={styles.songItem}>
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
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#1DB954" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity>
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
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="search-outline" size={24} color="#666" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="newspaper-outline" size={24} color="#666" />
          <Text style={styles.footerText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerItem, styles.activeFooterItem]}>
          <Ionicons name="library-outline" size={24} color="#1DB954" />
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
});

export default LibraryScreen;