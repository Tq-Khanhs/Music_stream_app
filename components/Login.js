import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,SafeAreaView,KeyboardAvoidingView,Platform} from'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon4 from 'react-native-vector-icons/MaterialIcons'



export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
      return;
    }

    try {

        
        
        const response = await fetch('https://6748bf4a5801f5153592092a.mockapi.io/users');
        const users = await response.json();

        
        const user = users.find(u => u.email === email);

        if (user) {
            if (user.password === password) {
                navigation.navigate('Home',user);
            } else {
                setPasswordError('Sai mật khẩu');
                setPassword('');
            }
        } else {
            setEmailError('Không tìm thấy tài khoản');
            setPassword('');
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        Alert.alert('Lỗi đăng nhập', 'Lỗi. Hãy thử lại');
    }
};


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
            <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{emailError}</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#rgba(255,255,255,0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{passwordError}</Text>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={()=>navigation.navigate('SignUp')} >
              <Text style={styles.forgotPasswordText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
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
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 16,
      color: '#fff',
      marginBottom: 10,
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
    errorContainer: {
      height: 35,
      justifyContent: 'center',
      marginBottom:6
    },
    errorText: {
      color: '#ff0000',
      fontSize: 14,
      marginLeft: 16
    },
  });