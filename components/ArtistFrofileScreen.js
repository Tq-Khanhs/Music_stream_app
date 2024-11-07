import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react'





const popularSongs = [
  {
    id: '1',
    title: 'Let you free',
    artist: 'Ryan Young',
    date: '4 JAN • 2023',
    image: require('../assets/Image 66.png')
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'Ryan Young',
    date: '15 MAR • 2023',
    image: require('../assets/Image 67.png')
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Ryan Young',
    date: '22 APR • 2023',
    image: require('../assets/Image 68.png')
  },
  {
    id: '4',
    title: 'Astronaut in the Ocean',
    artist: 'Ryan Young',
    date: '30 MAY • 2023',
    image: require('../assets/Image 69.png')
  },
  {
    id: '5',
    title: 'Dynamite',
    artist: 'Ryan Young',
    date: '12 JUN • 2023',
    image: require('../assets/Image 70.png')
  }
]

const albums = [
  {
    id: '1',
    title: 'ME',
    artist: 'Jessica Gonzalez',
    image: require('../assets/Image 71.png')
  },
  {
    id: '2',
    title: 'Magna nost',
    artist: 'Jessica Gonzalez',
    image: require('../assets/Image 72.png')
  },
  {
    id: '3',
    title: 'Proident',
    artist: 'Jessica Gonzalez',
    image: require('../assets/Image 77.png')
  }
]

const similarAlbums = [
  {
    id: '1',
    name: 'Magna nost',
    artist: 'Jessica Gonzalez',
    image: require('../assets/Image 74.png')
  },
  {
    id: '2',
    name: 'Exercitatio',
    artist: 'Brian Harris',
    image: require('../assets/Image 75.png')
  },
  {
    id: '3',
    name: 'Tempor no',
    artist: 'Tyler Anderson',
    image: require('../assets/Image 76.png')
  }
]

export default function ProfileScreen() {
    const [showFullAbout, setShowFullAbout] = useState(false)

    const aboutText = "Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    const toggleAbout = () => {
    setShowFullAbout(!showFullAbout)
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <Icon4 name="arrow-back-ios" size={20} color="black" />
            </TouchableOpacity>
        </View>
      <ScrollView>
        
        <View style={styles.profile}>
          <Image
            source={require("../assets/Image 63.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Ryan Young</Text>
          <Text style={styles.followersCount}>56.1K Followers</Text>
          <View style={styles.profileActions}>
            <View style= {styles.buttonContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon2 name="dots-horizontal" size={20} color="black" />
            </TouchableOpacity>
            

            </View>

            <View style= {styles.buttonContainer}>
            <TouchableOpacity>
                <Icon2 name="shuffle-variant" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
                <Icon3 name="play" size={40} color="black" />
            </TouchableOpacity>
            </View>

            </View>
            
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular</Text>
          <FlatList
            data={popularSongs}
            keyExtractor={(item) => item.id}
            style = {styles.albumList}
            renderItem={({ item }) => (
              <View style={styles.songItem}>
                <Image source={item.image} style={styles.songImage} />
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle}>{item.title}</Text>
                  <Text style={styles.songMeta}>{item.date}</Text>
                </View>
                <TouchableOpacity>
                    <Icon2 name="dots-horizontal" size={20} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Albums</Text>
          <FlatList
            data={albums}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.albumItem}>
                <Image source={item.image } style={styles.albumImage} />
                <Text style={styles.albumTitle}>{item.title}</Text>
                <Text style={styles.albumTitle}>{item.artist}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Image source={require('../assets/Image 73.png')}/>
          <Text style={styles.aboutText}>
            {showFullAbout ? aboutText : `${aboutText.slice(0, 150)}...`}
          </Text>
          <TouchableOpacity onPress={toggleAbout}>
            <Text style={styles.viewMoreText}>
              {showFullAbout ? 'View less' : 'View more'}
            </Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fans also like</Text>
          <FlatList
            data={similarAlbums}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.artistItem}>
                <Image source={ item.image } style={styles.artistImage} />
                <Text style={styles.artistName}>{item.name}</Text>
                <Text style={styles.artistName}>{item.artist}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>
      </ScrollView>

     
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
            <Icon name="home" size={30} color="black" />
            <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingTop: 30,
    padding: 16
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profile: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#eee'
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  followersCount: {
    color: '#666',
    marginBottom: 16
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    gap: 100
  },
  buttonContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  followButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    height: 36
    
  },
  followButtonText: {
    color: 'black',
    fontWeight: '600'
  },
  playButton: {
    width: 60,
    height: 60,
    
    backgroundColor: '#fff',
    
   
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  songImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#eee'
  },
  songInfo: {
    flex: 1,
    marginLeft: 12
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  songMeta: {
    color: '#666',
    fontSize: 14,
    marginTop: 2
  },
  albumsContainer: {
    flexDirection: 'row',
    gap: 16
  },
  albumList:{
    gap:20

  },
  albumItem: {
    width: 160
  },
  albumImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  aboutText: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 8
  },
  viewMoreText: {
    color: 'purple',
    fontWeight: '600',
    marginLeft:'40%'
  },
  artistsContainer: {
    flexDirection: 'row',
    gap: 16
  },
  artistItem: {
    width: 140,
    alignItems: 'center'
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 2,
    backgroundColor: '#eee',
    marginBottom: 8
  },
  artistName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
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
})