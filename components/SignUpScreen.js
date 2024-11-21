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
export  default function SignUpScreen() {
    const [name, setName] = useState('');
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
              <Text style={styles.formTitle}>Create Account</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#rgba(255,255,255,0.7)"
                value={name}
                onChangeText={setName}
              />
  
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
  
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Sign Up</Text>
              </TouchableOpacity>
  
              <Text style={styles.termsText}>
                By signing up, you agree to our Terms & Privacy Policy
              </Text>
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
      marginBottom: 80,
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
    
    submitButton: {
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 30,
      marginBottom: 16,
      marginTop:50
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