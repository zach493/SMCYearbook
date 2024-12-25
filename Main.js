import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

function Main({ navigation }) {
  return (
    <ImageBackground
      source={require('./images/login-bg.png')} 
      style={styles.background}
    >
              <Image source={require('./images/smclogo.png')} style={styles.logo} pointerEvents="none" />
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to St. Michael’s{'\n'}College Alumni Yearbook!
        </Text>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Alumni Yearbook</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    top: 295,
    flex: 1,
    backgroundColor: '#24348E', 
    width: 360,
    paddingVertical: 20,
  },

  logo: {
    width: 220,
    height: 220,
    top: 150,
    opacity: 0.9,
  },

  title: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 20,
    marginTop: -90,
    marginBottom: -50,
  },

  button: {
    zIndex: 1,
    paddingVertical: 6,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    marginLeft: 55,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b9eff',
    textAlign: 'center',
  },

  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 15,
    marginTop: 85,
  },
});

export default Main;
