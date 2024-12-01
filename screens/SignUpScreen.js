import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,KeyboardAvoidingView,Platform,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon4 from 'react-native-vector-icons/MaterialIcons'

export default function SignUpScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateName = (name) => {
    const nameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z0-9]+$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
  
    let isValid = true;
  
    if (!name.trim()) {
      setNameError('Vui lòng nhập họ tên');
      isValid = false;
    } else if (!validateName(name)) {
      setNameError('Họ tên phải bắt đầu bằng chữ cái hoa và các từ cách nhau 1 khoảng trắng');
      isValid = false;
    }
  
    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ. Vui lòng nhập đúng định dạng email@gmail.com');
      isValid = false;
    }
  
    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Mật khẩu chỉ được chứa chữ cái và số');
      isValid = false;
    }
  
    if (!isValid) return;
  
    try {
      const response = await fetch('https://6748bf4a5801f5153592092a.mockapi.io/users');
      const users = await response.json();
  
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        setEmailError('Email đã được sử dụng');
        return;
      }
  
      const newUser = {
        name,
        email,
        password,
        likedTrack: [],
        likedAlbum: [],
        likedArtist: [],
        image: "https://vtrqwqpftgtlbphukqlc.supabase.co/storage/v1/object/public/image/Avatar%203.png?t=2024-11-26T14%3A39%3A24.744Z"
      };
  
      const createResponse = await fetch('https://6748bf4a5801f5153592092a.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (createResponse.ok) {
        Alert.alert('Đăng ký thành công', 'Bạn có thể đăng nhập ngay bây giờ');
        navigation.navigate('Login');
      } else {
        Alert.alert('Lỗi đăng ký', 'Không thể tạo tài khoản. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      Alert.alert('Lỗi đăng ký', 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
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
              <Text style={styles.formTitle}>Create Account</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#rgba(255,255,255,0.7)"
                value={name}
                onChangeText={setName}
              />
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{nameError}</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
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
            </View>

            <View style={styles.inputContainer}>
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
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword} onPress={()=>navigation.navigate('Login')} >
              <Text style={styles.forgotPasswordText}>Đăng nhập</Text>
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
    header:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 80,
      
      

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
    errorContainer: {
      height: 35,
      justifyContent: 'center',
      marginBottom:6
    },
    errorText: {
      color: '#ff0000',
      fontSize: 14,
      marginLeft: 15
    },
    
    forgotPassword: {
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: 10
    },
    forgotPasswordText: {
      color: '#fff',
      fontSize: 14,
    },
  });