import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const College = () => {
  const route = useRoute();
  const { collegeName, year } = route.params || {};

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await axios.get(
          `https://smcyearbookdb-smcdbyearbook.up.railway.app/api/alumnicollege?course=${collegeName}&year=${year}`
        );
        setAlumniData(response.data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
        Alert.alert('Error', 'There was an issue fetching the alumni data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, [collegeName, year]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{collegeName || 'College Name'}</Text>
        <View style={styles.line1} />
        <Text style={styles.subtitle}>{year || 'S.Y 2023 - 2024'}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profileContainer}>
            {alumniData.map((alumni, index) => (
              <View key={index} style={styles.profileCard}>
                <Image
                  source={{ uri: alumni.img_url }} // Updated to use img_url
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>
                  {`${alumni.alum_fname} ${alumni.alum_mname} ${alumni.alum_lname}`}
                </Text>
                <Text style={styles.profileCaption}>"{alumni.motto}"</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24348E',
  },
  loader: {
    marginTop: 50,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  line1: {
    width: 200,
    height: 1,
    backgroundColor: 'white',
    marginTop: 10,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  profileCard: {
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    width: '40%',
  },
  profileImage: {
    width: 100,
    height: 140,
    borderWidth: 3,
    borderColor: '#6A3C88',
  },
  profileName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  profileCaption: {
    color: '#fff',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 3,
    textAlign: 'center',
  },
});

export default College;
