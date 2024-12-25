import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Header from './Header';

const VisionMission = () => {
  const [activeSection, setActiveSection] = useState('mission');
  const [visionMissionData, setVisionMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headerImage, setHeaderImage] = useState(require('./images/Vision1.png'));

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setHeaderImage(
      section === 'mission' ? require('./images/Mission.png') : require('./images/Vision1.png')
    );
  };

  useEffect(() => {
    const fetchVisionMissionData = async () => {
      try {
        const response = await axios.get(
          'https://smcyearbookdb-smcdbyearbook.up.railway.app/api/vision-mission'
        );
        setVisionMissionData(response.data);
      } catch (error) {
        console.error('Error fetching vision and mission data:', error);
        Alert.alert('Error', 'Failed to load Vision and Mission data.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisionMissionData();
  }, []);

  if (loading) {
    return (
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#24348E" />
      </View>
    );
  }

  if (!visionMissionData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#24348E' }}>No data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
    <View style={styles.container}>
      <Image source={headerImage} style={styles.headerImage} />
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => handleSectionChange('mission')}>
          <Text style={[styles.headerText, activeSection === 'mission' && styles.activeText]}>Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('vision')}>
          <Text style={[styles.headerText, activeSection === 'vision' && styles.activeText]}>Vision</Text>
        </TouchableOpacity>
        <View style={[styles.activeLine, activeSection === 'mission' ? styles.lineLeft : styles.lineRight]} />
      </View>

      {activeSection === 'mission' && (
        <ScrollView style={styles.section}>
          <Text style={styles.sectionText}>{visionMissionData.mission}</Text>
        </ScrollView>
      )}

      {activeSection === 'vision' && (
        <ScrollView style={styles.section}>
          <Text style={styles.sectionText}>{visionMissionData.vision}</Text>
        </ScrollView>
      )}
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  headerImage: {
    marginTop: 10,
    marginLeft: -235,
    width: '230%',
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: 80,
    zIndex: 2,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#24348E',
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
  section: {
    marginTop: 120,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fff',
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
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default VisionMission;
