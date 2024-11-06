import React from 'react';
import {View,Text,TouchableOpacity,ImageBackground, StyleSheet,SafeAreaView,Image} from 'react-native';

const WelcomeScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        
          <ImageBackground
            source={require('../assets/Image 30.png')}
            style={styles.background}
            blurRadius={3}
          >
          <View style={styles.iconContainer}>
            <Image source={require('../assets/Image 33.png')} style={styles.icon}/>
          </View>
            
  
          
            <View style={styles.textContainer}>
              <Text style={styles.title}>Your music</Text>
              <Text style={styles.title}>Your</Text>
              <Text style={styles.title}>artists</Text>
            </View>
  
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create an account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>I already have an account</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    background: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
      height:"500px"
    },
   
    
    iconContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
   
    textContainer: {
      alignItems: 'center',
      marginVertical: 40,
      marginTop: 100
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      lineHeight: 40,
    },
    buttonContainer: {
      gap: 12,
      marginBottom: 40,
    },
    createButton: {
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 25,
      alignItems: 'center',
    },
    createButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    loginButton: {
      backgroundColor: 'white',
      paddingVertical: 16,
      borderRadius: 25,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#2196f3',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  
  export default WelcomeScreen;