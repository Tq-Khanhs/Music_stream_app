import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudio } from '../context/AudioContext';
import Icon from 'react-native-vector-icons/Feather';

const MiniPlayer = ({ navigation }) => {
  const { currentTrack, isPlaying, togglePlayPause } = useAudio();

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
          <TouchableOpacity>
            <Icon name="heart" size={20} color="white"  style={{paddingRight:20}}/>
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