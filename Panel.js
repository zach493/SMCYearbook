import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

const Panel = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('VisionMission')}
        >
          <Image
            source={require('./images/vision.png')}
            style={styles.panelImage1}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('Alma')}
        >
          <Image
            source={require('./images/school hymn.png')}
            style={styles.panelImage2}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('SMC')}
        >
          <Image
            source={require('./images/st.m.png')}
            style={styles.panelImage3}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('Ignacia')}
        >
          <Image
            source={require('./images/ignacia.png')}
            style={styles.panelImage4}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('TA')}
        >
          <Image
            source={require('./images/topadmin.png')}
            style={styles.panelImage5}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.panel}
          onPress={() => navigation.navigate('ECHOES')}
        >
          <Image
            source={require('./images/echoes.png')}
            style={styles.panelImage6}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },

  panelImage1: {
    marginTop: 23,
    marginLeft: -235,
    width: '230%',
    height: 100,
    resizeMode: 'contain',
  },

  panelImage2: {
    marginTop: 10,
    width: '100%',
    height: 100,
    resizeMode: 'contain',  
  },

  panelImage3: {
    marginLeft: 20,
    marginTop: 10,
    width: '89.5%',
    height: 120,
    resizeMode: 'contain',
  },

  panelImage4: {
    marginLeft: 19,
    marginTop: -5,
    width: '89%',
    height: 101.5,
    resizeMode: 'contain',
  },

  panelImage5: {
    marginLeft: 23,
    marginTop: 10,
    width: '87%',
    height: 101.5,
    resizeMode: 'contain',
  },   

  panelImage6: {
    marginTop: 20,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },

});

export default Panel;
