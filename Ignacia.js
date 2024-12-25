import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const Ignacia = () => {
  const [activeSection, setActiveSection] = useState('ignacia');
  const [ignacia, setIgnacia] = useState('');
  const navigation = useNavigation();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission');
        const { ignacia } = response.data;
        setIgnacia(ignacia);
      } catch (error) {
        console.error('Error fetching Ignacia data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      
      

      {activeSection === 'ignacia' && (
        <View style={styles.section}>
          <Image source={require('./images/ignacia.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {ignacia || 'Loading Ignacia data...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#329AFE',
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: '#329AFE',
    width: '50%',
  },
  lineLeft: { left: 0 },
  lineRight: { right: 0 },
  section: {
    marginBottom: 20,
  },
  headerImage: {
    marginLeft: 20,
    marginTop: 10,
    width: '89.5%',
    height: 120,
    resizeMode: 'contain',
    zIndex: 2,
  },
  contentContainer: {
    width: 314,
    marginLeft: 24,
    marginTop: -20,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  sectionText: {
    color: '#000',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default Ignacia;
