import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const Alma = () => {
  const [activeSection, setActiveSection] = useState('almaMater');
  const [almaMater, setAlmaMater] = useState('');
  const [schoolHymn, setSchoolHymn] = useState('');
  const navigation = useNavigation();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission');
        const { almamater, schoolhymn } = response.data;
        setAlmaMater(almamater);
        setSchoolHymn(schoolhymn);
      } catch (error) {
        console.error('Error fetching Alma Mater and School Hymn:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container1}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => handleSectionChange('almaMater')}>
          <Text style={[styles.headerText, activeSection === 'almaMater' && styles.activeText]}>Alma Mater Hymn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('schoolHymn')}>
          <Text style={[styles.headerText, activeSection === 'schoolHymn' && styles.activeText]}>School Hymn</Text>
        </TouchableOpacity>
        <View style={[styles.activeLine, activeSection === 'almaMater' ? styles.lineLeft : styles.lineRight]} />
      </View>

      {activeSection === 'almaMater' && (
        <View style={styles.section}>
          <Image source={require('./images/alma.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {almaMater || 'Loading Alma Mater...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}

      {activeSection === 'schoolHymn' && (
        <View style={styles.section}>
          <Image source={require('./images/school.png')} style={styles.headerImage} />
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text style={styles.sectionText}>
                {schoolHymn || 'Loading School Hymn...'}
              </Text>
            </ScrollView>
          </View>
        </View>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: '#24348E',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginTop: -60,
    marginLeft: -233,
    width: '219%',
    height: 107.4,
    resizeMode: 'contain',
    position: 'absolute',
    top: 80,
    zIndex: 2,
  },
  contentContainer: {
    height: 3020,
    marginTop: 120,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#2FAFFF',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionText: {
    color: '#000',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default Alma;
