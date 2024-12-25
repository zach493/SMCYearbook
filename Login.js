import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthProvider'; // Import useAuth
import { nanoid } from 'nanoid/non-secure';


const Login = ({ navigation }) => {
  const { login } = useAuth(); // Access login function from AuthProvider
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!idNumber) {
      Alert.alert('Error', 'ID Number is required');
      return;
    }

    try {
      const response = await axios.get(`https://smcyearbookdb-smcdbyearbook.up.railway.app/login?idNumber=${idNumber}`);
      const { message, user } = response.data;

      if (message === 'Login successful') {
        const token = nanoid(); // Generate a unique token
        await login(user, token); // Save user and token using AuthProvider
        navigation.navigate('Panel'); // Navigate to the main panel
      } else {
        Alert.alert('Error', 'Invalid ID Number');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Failed to log in. Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./images/my.SMC_border.png')} style={styles.headerImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Alumni</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image source={require('./images/user.png')} style={styles.icon} />
            <TextInput
              value={idNumber}
              onChangeText={setIdNumber}
              placeholder="Your ID Number"
              style={styles.input}
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
            <Image source={require('./images/padlock.png')} style={styles.icon} />
            <TextInput
              value={password}  // Capture password input, but don't use it
              onChangeText={setPassword}
              placeholder="Password (does nothing)"
              style={styles.input}
              placeholderTextColor="#aaa"
              secureTextEntry
            />
          </View>
    
          <View style={styles.divider} />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#24348E',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  headerImage: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    marginTop: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    marginTop: -90,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingVertical: -1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 20,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#24348E',
    borderRadius: 25,
    paddingVertical: 9,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#333',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    textDecorationLine: 'none',
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 15,
    marginTop: 25,
  },
});

export default Login;
