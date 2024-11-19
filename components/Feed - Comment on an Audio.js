import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Import hình ảnh avatar
import avatarSource from './assets/img9/Avatar8.png';

const CommentSection = () => {
  const comments = [
    { id: 1, user: 'Sally Rooney', comment: 'Do this cu!', time: '5m' },
    { id: 2, user: 'Jason', comment: 'Minim magna ex', time: '48m' },
    { id: 3, user: 'Michael Key', comment: 'Deserunt offcia consectetur adipi', time: '40m' },
    { id: 4, user: 'Liam Pham', comment: 'Commodo', time: '48m' },
    { id: 5, user: 'Kiran Glaucus', comment: 'Esse consequat cilium ex', time: '40m' },
  ];

  return (
    <View style={styles.commentSection}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Image source={avatarSource} style={styles.avatar} />
            <View style={styles.commentContent}>
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
            <Text style={styles.commentTime}>{item.time}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FeedCommentScreen = () => {
  // Import hình ảnh bài đăng
  const postImage = require('./assets/img9/Track1.png');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <FontAwesome5 name="share-alt" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.postContainer}>
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
        </View>
        <CommentSection />
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
});

export default FeedCommentScreen;