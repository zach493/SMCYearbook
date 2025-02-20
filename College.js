import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Dimensions, Modal } from 'react-native';
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
  const [activeTabWidth, setActiveTabWidth] = useState(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageVisibility, setImageVisibility] = useState([true, true, true]);

  const toggleImageVisibility = (index) => {
    setImageVisibility(prev => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index]; 
      return newVisibility;
    });
  };

  const downloadImage = (uri) => {
    Alert.alert('Download', `Downloading image from ${uri}`);
  };

  const getTabStyle = (collegeName) => {
    switch (collegeName) {
      case 'College of Arts and Sciences':
        return [styles.tab, styles.artsAndSciencesTab];
      case 'College of Education':
        return [styles.tab, styles.educationTab];
      case 'College of Business Administration and Accountancy':
        return [styles.tab, styles.businessTab];
      case 'College of Engineering':
        return [styles.tab, styles.engineeringTab];
      case 'College of Computer Studies':
        return [styles.tab, styles.computerStudiesTab];
      case 'College of Hospitality and Tourism Management':
        return [styles.tab, styles.hospitalityTab];
      case 'College of Nursing':
        return [styles.tab, styles.nursingTab];
      case 'College of Criminology':
        return [styles.tab, styles.criminologyTab];
      default:
        return styles.tab;
    }
  };
  
  const getTabTextStyle = (collegeName) => {
    switch (collegeName) {
      case 'College of Arts and Sciences':
        return [styles.tabText, styles.artsAndSciencesTabText];
      case 'College of Education':
        return [styles.tabText, styles.educationTabText];
      case 'College of Business Administration and Accountancy':
        return [styles.tabText, styles.businessTabText];
      case 'College of Engineering':
        return [styles.tabText, styles.engineeringTabText];
      case 'College of Computer Studies':
        return [styles.tabText, styles.computerStudiesTabText];
      case 'College of Hospitality and Tourism Management':
        return [styles.tabText, styles.hospitalityTabText];
      case 'College of Nursing':
        return [styles.tabText, styles.nursingTabText];
      case 'College of Criminology':
        return [styles.tabText, styles.criminologyTabText];
      default:
        return styles.tabText;
    }
  };

  const coursesData = {
    "College of Arts and Sciences": {
      tabs: ["BAP", "BSP"],
      courses: {
       "BAP": "Bachelor of Arts in Philosophy",
       "BSP": "Bachelor of Science in Psychology",
      },
    },
    "College of Education": {
      tabs: ["BAEL", "BECEd", "BEEd", "BSEd-ENGLISH", "BSEd-MATH", "BSNEd"],
      courses: {
        "BAEL": "Bachelor of Arts in English Language",
        "BECEd": "Bachelor of Early Childhood Education",
        "BEEd": "Bachelor of Elementary Education",
        "BSEd-ENGLISH": "Bachelor of Secondary Education Major in English",
        "BSEd-MATH": "Bachelor of Secondary Education Major in Mathematics",
        "BSNEd": "Bachelor of Special Needs Education (Generalist)",
      },
    },
    "College of Business Administration and Accountancy": {
      tabs: ["BSA", "BSBA-FM", "BSBA-HRM", "BSBA-MM", "BSBA-OM"],
      courses: {
       "BSA": "Bachelor of Science in Accountancy",
       "BSBA-FM": "Bachelor of Science in Business Administration Major in Financial Management",
       "BSBA-HRM": "Bachelor of Science in Business Administration Major in Human Resource Management",
       "BSBA-MM": "Bachelor of Science in Business Administration Major in Marketing Management",
       "BSBA-OM": "Bachelor of Science in Business Administration Major in Operations Management",
      },
    },
    "College of Engineering": {
      tabs: ["BSCE", "BSCpE", "BSECE"],
      courses: {
        "BSCE": "Bachelor of Science in Civil Engineering",
        "BSCpE": "Bachelor of Science in Computer Engineering",
        "BSECE": "Bachelor of Science in Electronics Engineering",
 },
    },
    "College of Computer Studies": {
      tabs: ["BSCS", "BSIS", "BSIT"],
      courses: {
        "BSCS": "Bachelor of Science in Computer Science",
        "BSIS": "Bachelor of Science in Information Systems",
        "BSIT": "Bachelor of Science in Information Technology",
      },
    },
    "College of Hospitality and Tourism Management": {
      tabs: ["CHTM"],
      courses: {
        "CHTM": "Bachelor of Science in Hospitality and Tourism Management",
      },
    },
    "College of Criminology": {
      tabs: ["BSC"],
      courses: {
        "BSC": "Bachelor of Science in Criminology",
      },
    },
    "College of Nursing": {
      tabs: ["BSN"],
      courses: {
        "BSN": "Bachelor of Science in Nursing",
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
  };

  const openModal = (alumni) => {
    const images = [
      { type: 'Toga', uri: alumni.img_url },
      { type: 'SMC School Uniform', uri: alumni.img_url1 },
      { type: 'Corporate Attire', uri: alumni.img_url2 }
    ];
    setSelectedImages(images);
    setSelectedImage(images[0]);
    setModalVisible(true);
    const initialVisibility = images.reduce((acc, _, index) => {
      acc[index] = true; 
      return acc;
    }, {});
    setImageVisibility(initialVisibility);
    setImageVisibility([true, true, true]);
  };
  
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />;
    }
    const filteredAlumniData = alumniData.filter(alumni => alumni.alum_course === coursesData[collegeName]?.courses[activeTab]);
  
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          {filteredAlumniData.map((alumni, index) => (
            <TouchableOpacity key={index} style={styles.profileCard} onPress={() => openModal(alumni)}>
              <Image source={{ uri: alumni.img_url }} style={styles.profileImage} />
              <Text style={styles.profileName}>{`${alumni.alum_fname} ${alumni.alum_lname}`}</Text>
            </TouchableOpacity>
          ))}
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
              id={tab} 
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
  
      {renderContent()}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style ={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                {imageVisibility[index] ? (
                  <Image source={{ uri: image.uri }} style={styles.modalImage} />
                ) : null}
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => toggleImageVisibility(index)}>
                    <Image source={imageVisibility[index] ? require('./images/hide.png') : require('./images/show.png')} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => downloadImage(image.uri)}>
                    <Image source={require('./images/download.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalTitle}>{image.type}</Text>
              </View>
            ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#24348E', 
  },
  imageWrapper: {
    position: 'relative', 
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'right', 
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    position: 'absolute', 
    top: 10, 
    right: -6, 
    flexDirection: 'row',
  },
  icon: {
    width: 15,
    height: 15,
    marginTop: -57,
    marginHorizontal: 5,
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.8)', 
  },
  modalContent: { 
    maxHeight: '80%',
    padding: 20, 
    alignItems: 'center', 
    borderRadius: 10, 
    width: '90%', 
  },
  modalTitle: { 
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'semibold', 
    marginBottom: 10,
    marginTop: 5,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'left', 
    width: '98%',
  },
  modalImage: { 
    width: width * 0.6, 
    height: height * 0.4, 
    resizeMode: 'contain', 
  },
  imageSelectionContainer: { 
    flexDirection: 'row', 
    marginTop: 10, 
  },
  selectionImage: { 
    width: 60, 
    height: 60, 
    marginHorizontal: 5, 
    borderWidth: 2, 
    borderColor: '#24348E', 
  },

  closeButtonText: { 
    color: '#fff', 
    fontWeight: '800', 
    marginLeft: 276,
    fontSize: 20,
    marginTop: -30,
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
    fontSize: 16,
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