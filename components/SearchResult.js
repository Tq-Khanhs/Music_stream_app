import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('me');
  
  const images = {
    merWatson: require('./assets/image/MerWatson.png'),
    me: require('./assets/image/Me.png'),
    meInc: require('./assets/image/MeInc.png'),
    dozzMe: require('./assets/image/DozzMe.png'),
    eastssMe: require('./assets/image/EastssMe.png'),
    meAli: require('./assets/image/MeAli.png'),
    meQuisa: require('./assets/image/MeQuisa.png'),
    meLight: require('./assets/image/MeLight.png'),
  };
  
  const searchResults = [
    { id: 1, name: 'Mer Watson', followers: '1.234K', image: images.merWatson, showFollow: true },
    { id: 2, name: 'Me', artist: 'Jessica Gonzalez', plays: '2,1M', duration: '3:36', image: images.me },
    { id: 3, name: 'Me Inc', artist: 'Anthony Taylor', plays: '68M', duration: '03:35', image: images.meInc },
    { id: 4, name: 'Dozz me', artist: 'Brian Bailey', plays: '93M', duration: '04:39', image: images.dozzMe },
    { id: 5, name: 'Eastss me', artist: 'Anthony Taylor', plays: '9M', duration: '07:48', image: images.eastssMe },
    { id: 6, name: 'Me Ali', artist: 'Pedro Moreno', plays: '23M', duration: '3:36', image: images.meAli },
    { id: 7, name: 'Me quis a', artist: 'Elena Jimenez', plays: '10M', duration: '06:22', image: images.meQuisa },
    { id: 8, name: 'Me light', artist: 'John Smith', plays: '81M', duration: '05:15', image: images.meLight },
  ];

  const categories = ['All', 'Tracks', 'Albums', 'Artists'];
  const [activeCategory, setActiveCategory] = useState('All');

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

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {searchResults.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.resultItem}
            activeOpacity={0.7}
          >
            <Image
              source={item.image}
              style={[
                styles.thumbnail,
                item.name === 'Mer Watson' && styles.circularThumbnail
              ]}
            />
            <View style={styles.itemInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.showFollow && (
                  <TouchableOpacity 
                    style={styles.followButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                )}
              </View>
              {item.artist ? (
                <View style={styles.songInfo}>
                  <Text style={styles.itemArtist}>{item.artist}</Text>
                  <View style={styles.statsContainer}>
                    <Ionicons name="play" size={12} color="#999" style={styles.playIcon} />
                    <Text style={styles.plays}>{item.plays}</Text>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.duration}>{item.duration}</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.itemFollowers}>{item.followers} Followers</Text>
              )}
            </View>
            <TouchableOpacity 
              style={styles.moreButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="more-vert" size={20} color="#999" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="search" size={24} color="#1DA1F2" />
          <Text style={[styles.footerText, styles.activeFooterText]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <MaterialIcons name="dynamic-feed" size={24} color="#666" />
          <Text style={styles.footerText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="library-outline" size={24} color="#666" />
          <Text style={styles.footerText}>Library</Text>
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
  // Header Styles
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

  // Footer Styles
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
});

export default SearchScreen;