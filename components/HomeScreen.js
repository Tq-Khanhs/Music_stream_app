import React from 'react';
import {View,Text,Image,FlatList,TouchableOpacity,StyleSheet,SafeAreaView,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/AntDesign'


const HomeScreen = () => {
 
  const suggestions = [
    { id: '1',  image: require('../assets/Container 26.png') },
    { id: '2',  image: require('../assets/Container 27.png') },
  ];

  const charts = [
    { id: '1',  image: require('../assets/Container 31.png') },
    { id: '2',  image: require('../assets/Container 32.png') },
    { id: '3',  image: require('../assets/Container 33.png') },
  ];

  const trendingAlbums = [
    { id: '1', title: 'ME', artist: 'Jessica Gonzalez', image: require('../assets/Image 45.png') },
    { id: '2', title: 'Magna nost', artist: 'Brian Thomas', image: require('../assets/Image 46.png') },
    { id: '3', title: 'Magna nost', artist: 'Christop', image: require('../assets/Image 47.png') },
  ];

  const popularArtists = [
    { id: '1', name: 'Jennifer Wilson', image: require('../assets/Image 39.png') },
    { id: '2', name: 'Elizabeth Hall', image: require('../assets/Image 40.png') },
    { id: '3', name: 'Antho', image: require('../assets/Image 41.png') },
  ];

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
            source={require('../assets/Avatar 3.png')}
            style={styles.avatar}
          />
          </View>
          
        </View>
       
        
      
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.username}>Ashley Scott</Text>
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
                data={suggestions}
                renderItem={({ item }) => (
                  <View style={styles.suggestionCard}>
                    <TouchableOpacity>
                        <Image source={item.image} style={styles.suggestionImage} />
                    </TouchableOpacity>
                    
                    
                    
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>

            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Charts</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={charts}
                renderItem={({ item }) => (
                  
                    <TouchableOpacity style={styles.chartCard }>
                        <Image source={item.image} style={styles.chartImage} />
                        <Text>Daily chart-toppers update</Text>
                     </TouchableOpacity>
                    

                  
                  
                )}
                keyExtractor={item => item.id}
                style ={styles.chartList}
              />
            </View>

            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending albums</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trendingAlbums}
                renderItem={({ item }) => (
                  <View style={styles.albumCard}>
                    <Image source={item.image} style={styles.albumImage} />
                    <Text style={styles.albumTitle}>{item.title}</Text>
                    <Text style={styles.albumArtist}>{item.artist}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>

            
            <View style={styles.section}>
              
              <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular artists</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={popularArtists}
                renderItem={({ item }) => (
                  <View style={styles.artistCard}>
                    <Image source={ item.image } style={styles.artistImage} />
                    <Text style={styles.artistName}>{item.name}</Text>
                    <TouchableOpacity style={styles.followButton}>
                      <Text style={styles.followButtonText}>Follow</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </>
        )}
      />

      
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
    marginLeft: 15,
    marginBottom: 12,
  },
  seeAll: {
    color: '#666',
  },
  suggestionCard: {
    width: 200,
    marginLeft: 16,
  },
  suggestionImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionArtist: {
    fontSize: 14,
    color: '#666',
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
});

export default HomeScreen;