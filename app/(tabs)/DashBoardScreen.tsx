import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../../components/tabbar';
import CalendarCard from '../../components/Calendercard';
import ModuleCard from '../../components/ModuleCard';
import CalendarScreen from './CalenderScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';

const DashboardScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('home');
  const userName = route?.params?.userName || 'NINA';

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <CalendarScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return <ProfileScreen userName={userName} onLogout={() => navigation.replace('Login')} />;
      default:
        return (
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Welcome Header */}
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeHeader}>
                <Text style={styles.welcomeText}>Welcome to Rezilia :)</Text>
                <View style={styles.headerIcons}>
                  <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.notificationBadge}>
                      <Text style={styles.badgeText}>1</Text>
                    </View>
                    <Ionicons name="notifications-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <View style={styles.notificationBadge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                    <Ionicons name="chatbubble-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.profileButton}
                    onPress={() => setActiveTab('profile')}
                  >
                    <Image 
                      source={require('../../assets/images/Family.jpg')} 
                      style={styles.profileImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.greetingCard}>
                <Image 
                  source={require('../../assets/images/Family.jpg')} 
                  style={styles.greetingAvatar}
                />
                <View style={styles.greetingText}>
                  <Text style={styles.greetingTitle}>HELLO, {userName.toUpperCase()}</Text>
                  <Text style={styles.greetingSubtitle}>How can we help you today?</Text>
                  <Text style={styles.greetingMessages}>Check messages (3 unread)</Text>
                </View>
              </View>
            </View>

            {/* Calendar Card */}
            <CalendarCard />

            {/* Modules Section */}
            <View style={styles.modulesContainer}>
              <Text style={styles.modulesTitle}>Modules</Text>
              
              <View style={styles.moduleRow}>
                <View style={styles.moduleColumn}>
                  <ModuleCard
                    title="Simplicia"
                    description="Simplifying daily routines"
                    backgroundColor="#E8F5E8"
                    onPress={() => console.log('Simplicia pressed')}
                  />
                </View>
                <View style={styles.moduleColumn}>
                  <ModuleCard
                    title="Admilia"
                    description="Automating administrative tasks"
                    backgroundColor="#E8F0FF"
                    onPress={() => console.log('Admilia pressed')}
                  />
                </View>
                <View style={styles.moduleColumn}>
                  <ModuleCard
                    title="Rezilia AI"
                    description="Your AI Resilience companion"
                    backgroundColor="#E0F7FA"
                    onPress={() => console.log('Rezilia AI pressed')}
                  />
                </View>
              </View>

              {/* Menu Items */}
              <View style={styles.menuItems}>
                <ModuleCard
                  title="❤️ Mom - Jane.D"
                  description=""
                  backgroundColor="#FFE8F0"
                  onPress={() => console.log('Mom profile pressed')}
                />
                
                <ModuleCard
                  title="💬 Talk :) - Where Life Connects"
                  description=""
                  backgroundColor="#F0F8FF"
                  onPress={() => console.log('Talk pressed')}
                />
                
                <ModuleCard
                  title="💊 Medication"
                  description=""
                  backgroundColor="#FFF0E8"
                  onPress={() => console.log('Medication pressed')}
                />
                
                <ModuleCard
                  title="📊 Expenses"
                  description=""
                  backgroundColor="#F8F0FF"
                  onPress={() => console.log('Expenses pressed')}
                  badge="7d"
                />
                
                <ModuleCard
                  title="🎁 Partners Offers"
                  description=""
                  backgroundColor="#E8FFE8"
                  onPress={() => console.log('Partners Offers pressed')}
                />
              </View>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/Background.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
          <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 16,
    marginLeft:16,
    marginRight:16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  scrollView: {
    flex: 1,
  },
  welcomeContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  greetingText: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  greetingMessages: {
    fontSize: 14,
    color: '#4169E1',
  },
  modulesContainer: {
    padding: 20,
    paddingTop: 10,
  },
  modulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  moduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moduleColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default DashboardScreen;