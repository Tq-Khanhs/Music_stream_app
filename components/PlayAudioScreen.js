import React, { useState,useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet,ImageBackground,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAudio } from '../context/AudioContext';
import Slider from '@react-native-community/slider'


export default function PlayaudioScreen({route,navigation}) {
  
  const { currentTrack, isPlaying, togglePlayPause, sound } = useAudio()
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (sound) {
      const updateStatus = async () => {
        const status = await sound.getStatusAsync()
        if (status.isLoaded) {
          setPosition(status.positionMillis)
          setDuration(status.durationMillis)
        }
      }
      updateStatus()
      const interval = setInterval(updateStatus, 1000)
      return () => clearInterval(interval)
    }
  }, [sound])

  const onSliderValueChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value)
    }
  }

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (!currentTrack) return null

  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{uri:currentTrack.artwork}}
        style={styles.background}
      >
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.headerText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-down" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.trackInfo}>
            <Text style={styles.title}>{currentTrack.title}</Text>
            <Text style={styles.artist}>{currentTrack.artist}</Text>
          </View>
          <View style={styles.progressContainer}>
          <Slider
              style={styles.progressBar}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={onSliderValueChange}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
            />
            <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity>
              <Icon2 name="shuffle-variant" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="skip-back" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
              <Icon name={isPlaying ? "pause" : "play"} size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="skip-forward" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon2 name="dots-horizontal" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.socialContainer}>
            <View style={styles.socialStats}>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="heart" size={24} color="white" />
                <Text style={styles.socialText}>12K</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Icon2 name="comment-processing-outline" size={24} color="white" />
                <Text style={styles.socialText}>450</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon name="share" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#171A1F66',
    paddingTop:30
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    backgroundColor: '#171A1F66',
  },
  trackInfo: {
    marginBottom: 24,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
  },
  progressContainer: {
    marginBottom: 24,
  },
  waveform: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialStats: {
    flexDirection: 'row',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  socialText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
})