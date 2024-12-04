import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, Share } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const API_BASE_URL = 'https://my.api.mockaroo.com/FeedComment.json?key=8e25acb0';

const CommentSection = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState([]);

  const { post } = route.params || { post: {} };

  // Import hình ảnh avatar và bài đăng
  const avatarSource = require('../assets/img9/Avatar8.png');
  const postImage = require('../assets/image8/Track1.png');

   useEffect(() => {
    if (post && post.id) {
      loadComments(post.id);
    } else {
      console.warn('No post data available');
    }
  }, [post]);

 const loadComments = async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments?postId=${postId}`, {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE'
        }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Comment loading error:', error);
    }
  };
  const sendComment = async () => {
  if (newComment.trim() === '') return;

  const newCommentObj = {
    id: Date.now(), // Temporary ID (sẽ được thay thế nếu server trả về ID mới)
    user: 'Current User',
    comment: newComment,
    time: 'Just now', // Tạm thời hiển thị "Just now"
  };

  setComments([...comments, newCommentObj]);
  setNewComment('');

  try {
    const response = await axios.post(`${API_BASE_URL}`, newCommentObj, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_TOKEN_HERE' },
    });

    // Cập nhật comment với ID từ server (nếu có)
    setComments((prev) =>
      prev.map((comment) => (comment.id === newCommentObj.id ? response.data : comment))
    );
  } catch (error) {
    console.error('Error sending comment:', error);
    Alert.alert('Error', 'Failed to send comment.');
  }
};


//const newCommentObj = {
 //       id: Date.now(), // temporary id
 //       postId: post.id,
 //       user: 'Current User',
  //      comment: newComment,
 //      time: new Date().toLocaleTimeString()
  //    };
//
 //     setComments([...comments, newCommentObj]);
//      setNewComment('');
  //  } catch (error) {
  //    console.error('Send comment error:', error);
 //     Alert.alert('Error', 'Could not send comment');
 //   }
 // };

  // Hàm like comment
  const toggleLikeComment = async (commentId) => {
    try {
      const isCurrentlyLiked = likedComments.includes(commentId);
      const response = await axios.put(`${API_BASE_URL}/comments/${commentId}`, {
        liked: !isCurrentlyLiked
      });

      setLikedComments((current) =>
        isCurrentlyLiked
          ? current.filter((id) => id !== commentId)
          : [...current, commentId]
      );
    } catch (error) {
      console.error('Toggle like error:', error);
    }
  };


  // Hàm chia sẻ bài đăng
  const sharePost = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing track: FLOWER by Jessica Gonzalez',
        title: 'Share Track',
      });
      if (result.action === Share.sharedAction) {
        Alert.alert('Shared', 'Track shared successfully');
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

// Render từng comment
const renderComment = ({ item }) => (
  <View style={styles.commentItem}>
    <Image source={avatarSource} style={styles.avatar} />
    <View style={styles.commentContent}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <View style={styles.commentActions}>
        <Text style={styles.commentTime}>{item.time}</Text>
        <TouchableOpacity onPress={() => toggleLikeComment(item.id)}>
          <Ionicons
            name={likedComments.includes(item.id) ? 'heart' : 'heart-outline'}
            size={16}
            color={likedComments.includes(item.id) ? '#FF0000' : '#666'}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


// Hàm quay lại màn hình trước
  const goBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      Alert.alert('Go Back', 'Returning to previous screen');
    }
  };

return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={sharePost}>
            <FontAwesome5 name="share-alt" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.postContainer}
          onPress={() => Alert.alert('Play Track', 'Playing FLOWER by Jessica Gonzalez')}
        >
          <Image source={postImage} style={styles.postImage} />
          <View style={styles.postInfo}>
            <Text style={styles.postTitle}>FLOWER</Text>
            <Text style={styles.postArtist}>Jessica Gonzalez</Text>
            <View style={styles.postStats}>
              <Ionicons name="play" size={14} color="#fff" />
              <Text style={styles.postPlays}>125</Text>
              <Text style={styles.postDuration}>05:15</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderComment}
          contentContainerStyle={styles.commentList}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor="#ccc"
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendComment}
            disabled={newComment.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newComment.trim() === '' ? "#ccc" : "#1DA1F2"} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FeedCommentScreen = ({ route, navigation }) => {  
 const { post, trackImage, trackTitle, trackArtist } = route.params || {};
  const postImage = trackImage ? { uri: trackImage } : require('../assets/image8/Track1.png');
  return (
    <View style={styles.container}>
      <CommentSection route={route} />
    </View>
  );
};

CommentSection.defaultProps = {
  post: {}
};

export default CommentSection;

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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  postArtist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postPlays: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  postDuration: {
    fontSize: 12,
    color: '#666',
  },
  commentSection: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    color: '#333',
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
    marginRight: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  sendButton: {
    padding: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likeButton: {
    marginLeft: 10,
  },
  commentList: {
    paddingBottom: 20,
  },
});
