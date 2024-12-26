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
    marginLeft: -275,
    width: '240%',
    height: 110,
    resizeMode: 'contain',
  },

  panelImage2: {
    marginTop: 10,
    width: '240%',
    height: 110,
    marginLeft: -275,

    resizeMode: 'contain',  
  },

  panelImage3: {
    marginLeft: -274,
    marginTop: 10,
    width: '240%',
    height: 128,
    resizeMode: 'contain',
  },

  panelImage4: {
    marginLeft: -225,
    marginTop: -10,
    width: '215%',
    height: 109,
    resizeMode: 'contain',
  },

  panelImage5: {
    marginLeft: 28,    
    marginTop: 10,
    width: '85.8%',
    height: 101.5,
    resizeMode: 'contain',
  },   

  panelImage6: {
    marginLeft: 24,    
    marginTop: 20,
    width: '87.4%',
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20,
  },

});

export default Panel;
