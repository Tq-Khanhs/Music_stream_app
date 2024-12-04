import React ,{useState,useCallback,useEffect}from 'react';
import {View,Text,Image,FlatList,TouchableOpacity,StyleSheet,SafeAreaView,TextInput,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'
import { useUser } from '../context/UserContext';
import { useAudio } from '../context/AudioContext';
import MiniPlayer from '../components/MiniPlayer'
import { useGetArtistsQuery, useGetAlbumsQuery, useGetChartsQuery, useGetTracksQuery, useUpdateUserMutation } from '../apiSlice';
import { Menu } from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const { data: artists = [], isLoading: isArtistsLoading } = useGetArtistsQuery();
  const { data: albums = [], isLoading: isAlbumsLoading } = useGetAlbumsQuery();
  const { data: charts = [], isLoading: isChartsLoading } = useGetChartsQuery();
  const { data: tracks = [], isLoading: isTracksLoading } = useGetTracksQuery();
  const { user, setUser } = useUser()
  const { playTrack } = useAudio();
  const [updateUser] = useUpdateUserMutation();
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [followedArtists, setFollowedArtists] = useState(user.likedArtist);

  useEffect(() => {
    setFollowedArtists(user.likedArtist);
  }, [user.likedArtist]);

  const getFollowStatus = useCallback((artistId) => {
    return followedArtists.includes(artistId);
  }, [followedArtists]);


  const handlePressFollow = useCallback(async (artistId) => {
    const isFollowing = followedArtists.includes(artistId);
    let updatedLikedArtists;

    if (isFollowing) {
      updatedLikedArtists = followedArtists.filter((id) => id !== artistId);
    } else {
      updatedLikedArtists = [...followedArtists, artistId];
    }

    setFollowedArtists(updatedLikedArtists);
    setUser((prevUser) => ({
      ...prevUser,
      likedArtist: updatedLikedArtists,
    }));

    try {
      await updateUser({
        id: user.id,
        likedArtist: updatedLikedArtists,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      
      setFollowedArtists(user.likedArtist);
      setUser((prevUser) => ({
        ...prevUser,
        likedArtist: user.likedArtist,
      }));
    }
  }, [followedArtists, setUser, updateUser, user.id, user.likedArtist]);

  if (isArtistsLoading || isAlbumsLoading || isChartsLoading || isTracksLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  const handleTrackPress = (track) => {
    playTrack(track);
  };
  
  const handleLogOut = () => {
    closeMenu();
    Alert.alert(
      "Đăng xuất", 
      "Bạn có chắc chắn muốn đăng xuất?", 
      [
        {
          text: "Không", 
          onPress: () => console.log("Hủy đăng xuất"), 
          style: "cancel", 
        },
        {
          text: "Có", 
          onPress: () => {
            
            navigation.reset({
              index: 0, 
              routes: [{ name: 'Welcome' }], 
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleUpgrade = () => {
    
    closeMenu();
    navigation.navigate('Plan')
  };


  const suggestionTracks = tracks.slice(0, 3);
  const handleSubmit = () => {
    if (searchText.trim()) {
      
      navigation.navigate('SearchScreen',searchText);
    }
    
  };
  
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
            <Icon name="bell" size={30} color="black" style={styles.bell} />
            <Menu
            style={styles.menu}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Image
                  source={{ uri: user.image }}
                  style={[styles.avatar, styles.anchor]}
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={handleLogOut} title="Log out" style={styles.menuItem} />
            <Menu.Item onPress={handleUpgrade} title="Upgrade to premium" style={styles.menuItem} />
          </Menu>
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
        onSubmitEditing={handleSubmit} 
        onChangeText={setSearchText}
        returnKeyType="done" 
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
                  <Image source={{ uri: item.image }} style={styles.artistImage} />
                  <Text style={styles.artistName}>{item.name}</Text>

                    <TouchableOpacity
                      style={[styles.followButton, getFollowStatus(item.id) && styles.followedButton]}
                      onPress={() => handlePressFollow(item.id)} 
                    >
                      <Text style={[styles.followButtonText, getFollowStatus(item.id) && styles.followedButtonText]}>
                        {getFollowStatus(item.id)?"Followed": "Follow"}  
                        {console.log(getFollowStatus(item.id))}
                      </Text>
                    </TouchableOpacity>
                   </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id.toString()}
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
  menu:{
    width: 40,
    height:40,
    paddingLeft:-200
  },
  bell:{
    marginLeft:230
  }
  ,
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
    alignItems: "center",
    justifyContent: 'flex-end'

    
    
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
  followedButtonText:{
    fontSize: 12,
    fontWeight: '600',
    color: 'black'

  },
  followedButton:{
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 20,

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
  avatar: {
    width: 40,  
    height: 40,
    borderRadius: 20,  
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  anchor: {
      
    borderColor: 'gray', 
    padding: 4,  
    width: 40,
    marginLeft: 10
  },
  menu:{
    marginTop:50
  }

});

export default HomeScreen;