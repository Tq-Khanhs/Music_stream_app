import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert, Share,ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

const FeedScreen = () => {
   const navigation = useNavigation();
  const [feedPosts, setFeedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  const fetchFeedPosts = async () => {
    try {
      const response = await fetch('https://my.api.mockaroo.com/feed.json?key=8e25acb0');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Validate data before setting state
      const validPosts = data.filter(post => 
        post && 
        post.id && 
        post.user && 
        post.user.name && 
        post.track
      );
      setFeedPosts(validPosts);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to fetch feed posts');
      setIsLoading(false);
      setFeedPosts([]); 
    }
  };
  
 const handleCommentPress = (post) => {
  navigation.navigate('FeedComment', { 
    screen: 'CommentSection',  // If using nested navigation
    params: {
      post: post,  // Ensure this is a complete post object
      trackImage: post.track?.image,  
      trackTitle: post.track?.title,
      trackArtist: post.track?.artist
    }
  });
};
 
  const toggleLike = (postId) => {
    setLikedPosts(currentLikedPosts => 
      currentLikedPosts.includes(postId)
        ? currentLikedPosts.filter(id => id !== postId)
        : [...currentLikedPosts, postId]
    );
  };


  const toggleRepost = (postId) => {
    setReposts(currentReposts => 
      currentReposts.includes(postId)
        ? currentReposts.filter(id => id !== postId)
        : [...currentReposts, postId]
    );
  };

  const handleMoreOptions = (post) => {
    Alert.alert(
      'More Options',
      'Choose an action',
      [
        { 
          text: 'Share', 
          onPress: () => sharePost(post) 
        },
        { 
          text: 'Report', 
          onPress: () => reportPost(post),
          style: 'destructive'
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const sharePost = async (post) => {
    try {
      const result = await Share.share({
        message: `Check out this track: ${post.track.title} by ${post.track.artist}`,
        url: '', // Thêm link nếu có
        title: 'Share Track'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const reportPost = (post) => {
    Alert.alert(
      'Report Post',
      'Why are you reporting this post?',
      [
        { text: 'Inappropriate Content', onPress: () => submitReport(post, 'Inappropriate Content') },
        { text: 'Spam', onPress: () => submitReport(post, 'Spam') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const submitReport = (post, reason) => {
    // Simulate reporting logic
    Alert.alert(
      'Report Submitted', 
      `You reported the post by ${post.user.name} for ${reason}`
    );
  };
  const handleTrackPress = (track) => {
    // Logic phát nhạc
    Alert.alert(
      'Play Track', 
      `Playing ${track.title} by ${track.artist}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };
  const handleFooterNavigation = (screen) => {
    // Điều hướng giữa các màn hình
    Alert.alert(
      'Navigation', 
      `Navigating to ${screen}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };
  const renderFeedItem = (post) => {
    if (!post || !post.user) {
    return null; // Skip rendering this item if data is incomplete
  }
    const isLiked = likedPosts.includes(post.id);
    const isReposted = reposts.includes(post.id);

    return (
      <View key={post.id} style={styles.feedItem}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userInfoLeft}>
            <Image 
              source={{ uri: post.avatar }} 
              style={styles.userAvatar} 
            />
            <View style={styles.postInfo}>
              <View style={styles.nameContainer}>
             <Text style={styles.userName}>
                 {post.user?.name || 'Unknown User'}
                </Text>
              {post.user?.verified && (
               <Ionicons name="checkmark-circle" size={14} color="#1DA1F2" style={styles.verifiedIcon} />
              )}
           </View>
              <Text style={styles.postTime}>Posted a track • {post.timePosted}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleMoreOptions(post)}>
            <Feather name="more-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Track Card */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          style={styles.trackCard}
          onPress={() => handleTrackPress(post.track)}
        >
          <Image 
            source={{ uri: post.track.image }} 
            style={styles.trackImage} 
          />
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
            <TouchableOpacity 
              style={styles.interactionButton}
              onPress={() => toggleLike(post.id)}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={22} 
                color={isLiked ? "#FF0000" : "#666"} 
              />
            </TouchableOpacity>
            <Text style={styles.interactionCount}>
              {post.interactions.likes + (isLiked ? 1 : 0)}
            </Text>
          </View>

          {/* Add Comment Button */}
        <View style={styles.interactionGroup}>
          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={() => handleCommentPress(post)}
          >
            <Ionicons 
              name="chatbubble-outline" 
              size={22} 
              color="#666" 
            />
          </TouchableOpacity>
          <Text style={styles.interactionCount}>
            {post.interactions.comments || 0}
          </Text>
        </View>
          
          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={() => handleMoreOptions(post)}
          >
            <Feather name="more-horizontal" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity>
            <Icon4 name="mobile-screen-share" size={25} color="black" />
          </TouchableOpacity>
      </View>

          {isLoading ? (
      <SafeAreaView style={styles.containerLoad}>
      <ActivityIndicator size="large" color="#6200EE" />
    </SafeAreaView>
    ) : feedPosts.length === 0 ? (
      <View style={styles.loadingContainer}>
        <Text>No posts available</Text>
      </View>
    ) : (
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {feedPosts.map(post => renderFeedItem(post))}
      </ScrollView>
    )}

      {/* Footer */}
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
  );
};
export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 13
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
    marginRight: 16,
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
  loadingContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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