import React from 'react';
import {View,Text,Image,FlatList,TouchableOpacity,StyleSheet,SafeAreaView,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import MiniPlayer from '../components/MiniPlayer'


const HomeScreen = ({navigation}) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [charts, setCharts] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { user } = useUser();
  
  const { playTrack } = useAudio();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsResponse, albumsResponse, chartsResponse, tracksResponse] = await Promise.all([
          fetch('https://my.api.mockaroo.com/artists.json?key=5b678c00'),
          fetch('https://my.api.mockaroo.com/albums.json?key=5b678c00'),
          fetch('https://my.api.mockaroo.com/charts.json?key=5b678c00'),
          fetch('https://my.api.mockaroo.com/tracks.json?key=5b678c00')
        ]);

        const artistsData = await artistsResponse.json();
        const albumsData = await albumsResponse.json();
        const chartsData = await chartsResponse.json();
        const tracksData = await tracksResponse.json();

        setArtists(artistsData);
        setAlbums(albumsData);
        setCharts(chartsData);
        setTracks(tracksData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setError('Failed to load data. Please try again.');
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleTrackPress = (track) => {
    playTrack(track);
  };
  

  console.log(tracks)
  const suggestionTracks = tracks.slice(0, 3);
  
  return (
    <SafeAreaView style={styles.container}>
    
      
        <View style={styles.headerTop}>
          <View>
            <Image
                source={require('../assets/Image 36.png')}
                style={styles.avatar}
            />

          </View>
          
          <View style={styles.userContainer}>
            <Icon name="bell" size={30} color="black" />
            <Image
            source={{uri: user.image}}  
            style={styles.avatar}
          />
          </View>
          
        </View>
       
        
      
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.username}>{user.name}</Text>
        </View>
        
      </View>


      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="What you want to listen to"
          placeholderTextColor="#666"
        />
      </View>

      
      <FlatList
        style={styles.content}
        data={[{ key: 'content' }]}
        renderItem={() => (
          <>
           
           <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggestions for you</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={suggestionTracks}
                  renderItem={({ item }) => (
                    <View style={styles.suggestionCard}>
                    <TouchableOpacity onPress={() => handleTrackPress(item)}>
                      <Image source={{uri: item.artwork}} style={styles.suggestionImage} />
                    <View style={styles.overlay}>
                        <Text style={styles.suggestionTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.suggestionArtist} numberOfLines={1}>{item.artist}</Text>
                    </View>
                    </TouchableOpacity>
                  </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                  style ={styles.suggestionsFlat}
                  />
            </View>

            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Charts</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={charts}
                renderItem={({ item }) => (
                  
                    <TouchableOpacity style={styles.chartCard } onPress={() => navigation.navigate('Audiolist',item)}>
                        <Image source={{uri:item.coverImage}} style={styles.chartImage} />
                        <Text>Daily chart-toppers update</Text>
                     </TouchableOpacity>
                    

                  
                  
                )}
                keyExtractor={item => item.id}
                style ={styles.chartList}
              />
            </View>

            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle2}>Trending albums</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={albums}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.albumCard} onPress={() => navigation.navigate('Album',item)}>
                    <Image source={{uri:item.image}} style={styles.albumImage} />
                    <Text style={styles.albumTitle}>{item.name}</Text>
                    <Text style={styles.albumArtist}>{item.artist}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                style ={styles.albumFlat}
              />
            </View>

            
            <View style={styles.section}>
              
              <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle2}>Popular artists</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={artists}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.artistCard}  onPress={() => navigation.navigate('ArtistFrofile',item)}>
                    <Image source={{uri:item.image }} style={styles.artistImage} />
                    <Text style={styles.artistName}>{item.name}</Text>
                    <TouchableOpacity style={styles.followButton}>
                      <Text style={styles.followButtonText}>Follow</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </>
        )}
      />

      
      <MiniPlayer navigation={navigation} />

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={30} color="black" />
            <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchScreen')}>
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
    paddingHorizontal: 20,
    
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle2:{
    fontSize: 20,
    fontWeight: 'bold',
    
    marginBottom: 12,

  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  userContainer: {
    
    flexDirection: 'row',
    marginVertical:20,

    
    
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 15
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 12,
  },
  seeAll: {
    color: '#666',
    
  },
  suggestionCard: {
    width: 200,
    marginLeft: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  suggestionsFlat:{
    paddingLeft:20

  },
  suggestionCard: {
    marginRight: 15,
    width: 150,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  suggestionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  suggestionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  suggestionArtist: {
    color: 'white',
    fontSize: 14,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  suggestionArtist: {
    fontSize: 14,
    color: 'white',
  },
  chartList:{
    
  },
 
  chartCard: {
    width: 170,
    height: 190,
    marginLeft: 10,
    borderRadius: 20,
    padding: 12,
    justifyContent: 'flex-end',
  },
  chartImage:{
    height:'100%',
    width: '100%'
  },
  chartTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chartSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  albumCard: {
    width: 150,
    marginLeft: 17,
  },
  albumFlat:{
    paddingLeft:5

  },
  albumImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  albumArtist: {
    fontSize: 14,
    color: '#666',
  },
  artistCard: {
    alignItems: 'center',
    width: 140,
    marginLeft: 16,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  artistName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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

export default HomeScreen;