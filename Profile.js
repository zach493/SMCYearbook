import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from './AuthProvider'; 
import Header from './Header';

const Profile = () => {
  const { auth } = useAuth(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const alumId = auth?.user?.alum_id_num;
        if (!alumId) {
          Alert.alert('Error', 'Unable to fetch profile. Please log in again.');
          return;
        }
<<<<<<< HEAD
    
=======
>>>>>>> 40bdcf5b8af57d852e58e1ad5eb76422f081b2d3
        const response = await axios.get(`https://smcyearbookdb-smcdbyearbook.up.railway.app/alumniprof?idNumber=${alumId}`);
        const alumData = response.data;
        
        if (!alumData || !alumData.alumni) {
          Alert.alert('Error', 'No alumni data found.');
          return;
        }

        setProfile({
          name: `${alumData.alumni.alum_fname} ${alumData.alumni.alum_mname} ${alumData.alumni.alum_lname}`,
          idNumber: alumData.alumni.alum_id_num,
          yearGraduated: alumData.alumni.alum_year,
          college: alumData.alumni.alum_course,
          motto: alumData.alumni.motto,
<<<<<<< HEAD
          image: alumData.img_url,
=======
          image: alumData.img_url, 
>>>>>>> 40bdcf5b8af57d852e58e1ad5eb76422f081b2d3
        });

      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [auth]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#24348E" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#24348E' }}>No profile data available.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ImageBackground
        source={require('./images/profile-bg1.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Image
<<<<<<< HEAD
              source={{ uri: profile.image || 'https://via.placeholder.com/150' }} 
=======
              source={{ uri: profile.image || 'https://via.placeholder.com/150' }}
>>>>>>> 40bdcf5b8af57d852e58e1ad5eb76422f081b2d3
              style={styles.profileImage}
            />
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.detailBox}>
              <Text style={styles.name}>{profile.name}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>ID Number: {profile.idNumber}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>Year Graduated: {profile.yearGraduated}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>College: {profile.college}</Text>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.info}>Motto: {profile.motto}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#24348E',
  },
  profileDetails: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  detailBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24348E',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#24348E',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Profile;
