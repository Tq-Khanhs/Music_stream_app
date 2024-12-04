import React,{useState,useEffect,useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudio } from '../context/AudioContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { useUser } from '../context/UserContext';
import { useUpdateUserMutation } from '../apiSlice';


const MiniPlayer = ({ navigation }) => {
  const { currentTrack, isPlaying, togglePlayPause } = useAudio(); // Added useAudio hook call
  const { user, setUser } = useUser();
  const [updateUser] = useUpdateUserMutation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentTrack) { 
      setIsLiked(user.likedTrack.includes(currentTrack.id));
    }
  }, [user.likedTrack, currentTrack]);

  const handleLikePress = useCallback(() => {
    if (!currentTrack) return;

    const updatedLikedTracks = isLiked
      ? user.likedTrack.filter(id => id !== currentTrack.id)
      : [...user.likedTrack, currentTrack.id];

    setIsLiked(!isLiked);
    setUser(prevUser => ({
      ...prevUser,
      likedTrack: updatedLikedTracks
    }));

    updateUser({
      id: user.id,
      likedTrack: updatedLikedTracks
    }).catch(error => {
      console.error('Failed to update user:', error);
      setIsLiked(isLiked);
      setUser(prevUser => ({
        ...prevUser,
        likedTrack: user.likedTrack
      }));
    });
  }, [isLiked, currentTrack, user, setUser, updateUser]);

  if (!currentTrack) return null;

  return (
    <TouchableOpacity style={styles.nowPlaying}  onPress={() => navigation.navigate('PlayAudio', currentTrack)}>
          <Image
            source={{uri: currentTrack.artwork} }
            style={styles.miniTrackImage}
          />
          <View style={styles.miniTrackInfo}>
            <Text style={styles.miniTrackTitle}>{currentTrack.title}</Text>
            <Text style={styles.miniTrackArtist}>{currentTrack.artist}</Text>
          </View>
          <TouchableOpacity onPress={handleLikePress}>
            <Icon name={isLiked ? "heart" : "hearto"} 
                  size={20} 
                  color={isLiked ? "red" : "white"}   style={{paddingRight:20}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Icon name={isPlaying ? "pause" : "play"} size={23} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    nowPlaying: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: 'black'
      },
      miniTrackImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
        backgroundColor: '#eee'
      },
      miniTrackInfo: {
        flex: 1,
        marginLeft: 12
      },
      miniTrackTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white'
      },
      miniTrackArtist: {
       
        fontSize: 12,
        color: 'white'
      },
});

export default MiniPlayer;