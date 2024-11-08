import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const FeedScreen = () => {
  const feedPosts = [
    {
      id: 1,
      user: {
        name: 'Jessica Gonzalez',
        image: require('./assets/image8/AvatarGirl.png'),
        verified: true
      },
      timeAgo: '3d',
      track: {
        title: 'FLOWER',
        artist: 'Jessica Gonzalez',
        image: require('./assets/image8/Track1.png'), // Image of cassette on orange background
        plays: '125',
        duration: '05:15'
      },
      interactions: {
        likes: 20,
        comments: 3,
        reposts: 1
      }
    },
    {
      id: 2,
      user: {
        name: 'William King',
        image: require('./assets/image8/AvatarBoy.png'),
        verified: true
      },
      timeAgo: '5d',
      track: {
        title: 'Me',
        artist: 'William King',
        image: require('./assets/image8/Track2.png'), // Image of eye with colorful effects
        plays: '245',
        duration: '05:15'
      },
      interactions: {
        likes: 45,
        comments: 9,
        reposts: 2
      }
    }
  ];

  const renderFeedItem = (post) => (
    <View key={post.id} style={styles.feedItem}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.userInfoLeft}>
          <Image source={post.user.image} style={styles.userAvatar} />
          <View style={styles.postInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{post.user.name}</Text>
              {post.user.verified && (
                <Ionicons name="checkmark-circle" size={14} color="#1DA1F2" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.postTime}>Posted a track • {post.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Track Card */}
      <TouchableOpacity activeOpacity={0.9} style={styles.trackCard}>
        <Image source={post.track.image} style={styles.trackImage} />
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{post.track.title}</Text>
          <Text style={styles.trackArtist}>{post.track.artist}</Text>
          <View style={styles.trackStats}>
            <Ionicons name="play" size={14} color="#fff" />
            <Text style={styles.trackPlays}>{post.track.plays}</Text>
            <Text style={styles.trackDuration}>{post.track.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Interactions */}
      <View style={styles.interactions}>
        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="heart-outline" size={22} color="#666" />
          </TouchableOpacity>
          <Text style={styles.interactionCount}>{post.interactions.likes}</Text>
        </View>
        
        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.interactionCount}>{post.interactions.comments}</Text>
        </View>
        
        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="repeat-outline" size={22} color="#666" />
          </TouchableOpacity>
          <Text style={styles.interactionCount}>{post.interactions.reposts}</Text>
        </View>
        
        <TouchableOpacity style={styles.interactionButton}>
          <Feather name="more-horizontal" size={22} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="tv-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {feedPosts.map(post => renderFeedItem(post))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="search" size={24} color="#666" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <MaterialIcons name="dynamic-feed" size={24} color="#1DA1F2" />
          <Text style={[styles.footerText, styles.activeFooterText]}>Feed</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  headerButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  feedItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  postInfo: {
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 4,
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  trackCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  trackImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  trackInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 6,
    opacity: 0.9,
  },
  trackStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackPlays: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    marginRight: 8,
    opacity: 0.9,
  },
  trackDuration: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
  },
  interactionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  interactionButton: {
    marginRight: 4,
    padding: 2,
  },
  interactionCount: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
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

export default FeedScreen;