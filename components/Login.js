import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon4 from 'react-native-vector-icons/MaterialIcons'



export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <LinearGradient
        colors={['#9c27b0', '#673ab7']}
        style={styles.container}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <SafeAreaView style={styles.container}>
            
  
            <View style={styles.formContainer}>
              
              
              <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon4 name="arrow-back-ios" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.formTitle}>Welcome Back</Text>
            </View>
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#rgba(255,255,255,0.7)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
  
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#rgba(255,255,255,0.7)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
  
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.submitButton}  onPress={() => navigation.navigate('Home')}>
                <Text style={styles.submitButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    logoContainer: {
      alignItems: 'center',
      paddingTop: 60,
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    header:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 80,
      
      

    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    welcomeImage: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
    },
    textContainer: {
      marginTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    buttonContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    createButton: {
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 30,
      marginBottom: 16,
    },
    createButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    loginButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingVertical: 16,
      borderRadius: 30,
    },
    loginButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    formTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 3
    },
    input: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 16,
      color: '#fff',
      marginBottom: 16,
    },
    forgotPassword: {
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: 40
    },
    forgotPasswordText: {
      color: '#fff',
      fontSize: 14,
    },
    submitButton: {
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 30,
      marginBottom: 16,
    },
    submitButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    termsText: {
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'center',
      fontSize: 14,
      marginTop: 20,
    },
  });