import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const College = () => {
  const route = useRoute();
  const { collegeName, year } = route.params || {};

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [activeTabWidth, setActiveTabWidth] = useState(0); // State to hold the width of the active tab

  const getTabStyle = (collegeName) => {
    switch (collegeName) {
      case 'College of Arts And Sciences':
        return [styles.tab, styles.artsAndSciencesTab];
      case 'College of Education':
        return [styles.tab, styles.educationTab];
      case 'College of Business Administration and Accountancy':
        return [styles.tab, styles.businessTab];
      case 'College of Engineering':
        return [styles.tab, styles.engineeringTab];
      case 'College of Computer Studies':
        return [styles.tab, styles.computerStudiesTab];
      default:
        return styles.tab;
    }
  };
  
  const getTabTextStyle = (collegeName) => {
    switch (collegeName) {
      case 'College of Arts And Sciences':
        return [styles.tabText, styles.artsAndSciencesTabText];
      case 'College of Education':
        return [styles.tabText, styles.educationTabText];
      case 'College of Business Administration and Accountancy':
        return [styles.tabText, styles.businessTabText];
      case 'College of Engineering':
        return [styles.tabText, styles.engineeringTabText];
      case 'College of Computer Studies':
        return [styles.tabText, styles.computerStudiesTabText];
      default:
        return styles.tabText;
    }
  };
  
  // Define courses for each college with abbreviations
  const coursesData = {
    "College of Arts And Sciences": {
      tabs: ["BAP", "BSP"],
      courses: {
        "BAP": "BACHELOR OF ARTS IN PHILOSOPHY",
        "BSP": "BACHELOR OF SCIENCE IN PSYCHOLOGY",
      },
    },
    "College of Education": {
      tabs: ["BAEL", "BECEd", "BEEd", "BSEd-ENGLISH", "BSEd-MATH", "BSNEd"],
      courses: {
        "BAEL": "BACHELOR OF ARTS IN ENGLISH LANGUAGE",
        "BECEd": "BACHELOR OF EARLY CHILDHOOD EDUCATION",
        "BEEd": "BACHELOR OF ELEMENTARY EDUCATION",
        "BSEd-ENGLISH": "BACHELOR OF SECONDARY EDUCATION MAJOR IN ENGLISH",
        "BSEd-MATH": "BACHELOR OF SECONDARY EDUCATION MAJOR IN MATHEMATICS",
        "BSNEd": "BACHELOR OF SPECIAL NEEDS EDUCATION (Generalist)",
      },
    },
    "College of Business Administration and Accountancy": {
      tabs: ["BSA", "BSBA-FM", "BSBA-HRM", "BSBA-MM", "BSBA-OM"],
      courses: {
        "BSA": "BACHELOR OF SCIENCE IN ACCOUNTANCY",
        "BSBA-FM": "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN FINANCIAL MANAGEMENT",
        "BSBA-HRM": "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN HUMAN RESOURCE MANAGEMENT",
        "BSBA-MM": "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN MARKETING MANAGEMENT",
        "BSBA-OM": "BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN OPERATIONS MANAGEMENT",
      },
    },
    "College of Engineering": {
      tabs: ["BSCE", "BSCpE", "BSECE"],
      courses: {
        "BSCE": "Bachelor Of Science In Civil Engineering",
        "BSCpE": "Bachelor Of Science In Computer Engineering",
        "BSECE": "Bachelor Of Science In Electronics Engineering",
      },
    },
    "College of Computer Studies": {
      tabs: ["BSCS", "BSIS", "BSIT"],
      courses: {
        "BSCS": "BACHELOR OF SCIENCE IN COMPUTER SCIENCE",
        "BSIS": "BACHELOR OF SCIENCE IN INFORMATION SYSTEMS",
        "BSIT": "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
      },
    },
  };

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

 // Set the active tab to the first course of the selected college by default
    if (coursesData[collegeName]?.tabs.length > 0) {
      setActiveTab(coursesData[collegeName].tabs[0]);
    }
  }, [collegeName, year]);

  const handleTabLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    if (activeTabWidth !== width) {
      setActiveTabWidth(width);
    }
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    // Trigger layout update for the active tab

  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />;
    }
  
    // Filter alumni data based on the selected tab
    const filteredAlumniData = alumniData.filter(alumni => alumni.alum_course === coursesData[collegeName]?.courses[activeTab]);
  
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {filteredAlumniData.length > 0 ? (
            filteredAlumniData.map((alumni, index) => (
              <View key={index} style={styles.profileCard}>
                <Image
                  source={{ uri: alumni.img_url }} 
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>
                  {`${alumni.alum_fname} ${alumni.alum_mname} ${alumni.alum_lname}`}
                </Text>
                <Text style={styles.profileCaption}>"{alumni.alum_course}"</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No alumni found for this course.</Text>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{collegeName || 'College Name'}</Text>
        <View style={styles.line1} />
        <Text style={styles.subtitle}>{year || 'S.Y 2023 - 2024'}</Text>
        <Text style={styles.activeCourse}>
          {activeTab ? coursesData[collegeName]?.courses[activeTab] : ''}
        </Text>
      </View>
      <View style={styles.tabContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {coursesData[collegeName]?.tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            id={tab} // Assign an ID for layout measurement
            style={[
              getTabStyle(collegeName), 
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => handleTabPress(tab)}
            onLayout={handleTabLayout}
          >
            <Text style={[getTabTextStyle(collegeName), activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      {activeTab && (
        <View style={[styles.activeLine, { width: activeTabWidth }]} /> 
      )}
      {renderContent()}
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
    fontSize: 30,
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
    marginTop: 15,
    alignSelf: 'center',
  },
  activeCourse: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 10,
    backgroundColor: '#000080',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  artsAndSciencesTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.025, 
    paddingHorizontal: width * 0.04, 
    paddingVertical: height * 0.02, 
  },
  artsAndSciencesTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  educationTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.025, 
    paddingHorizontal: width * 0.04, 
    paddingVertical: height * 0.02, 
  },
  educationTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  businessTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.025, 
    paddingHorizontal: width * 0.04, 
    paddingVertical: height * 0.02, 
  },
  businessTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  engineeringTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.08, 
    marginLeft: 25,
  },
  engineeringTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  computerStudiesTab: {
    alignItems: 'center',
    marginHorizontal: width * 0.08, 
    marginLeft: 25,
  },
  computerStudiesTabText: {
    color: '#fff',
    fontSize: width * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingBottom: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#329AFE',
  },
  activeTab: {
    alignItems: 'center',
  },
  activeLine: {
    height: 2,
    backgroundColor: '#329AFE',
    marginTop: 5,
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
    borderColor: '#1C2768',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
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