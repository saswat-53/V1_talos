import React from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Logo from '@/components/Logo';
import family from '@/assets/images/Family.jpg';

const { height, width } = Dimensions.get('window');

export default function LandingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      
      {/* Hero Image - Full height now */}
      <View style={styles.imageContainer}>
        <Image 
          source={family}
          style={styles.image}
        />
        
        {/* Overlay gradient on the image */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.imageOverlay}
        />
      </View>
      
      {/* Content Container - Now positioned absolutely over the image */}
      <View style={styles.contentContainer}>
        {/* Top section with logo - Only for version 2 */}
        <View style={styles.logoSection}>
          <View style={styles.logoWrapper}>
            <Text style={styles.logoText}>Rezilia</Text>
          </View>
        </View>
        
        {/* Bottom section with text and buttons */}
        <View style={styles.bottomSection}>
          {/* Yellow section with text */}
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              Take Care of your loved ones with ease.
            </Text>
            
            <Text style={styles.bodyText}>
              Connect, manage care, and stay updated - all in one place for your family's wellbeing.
            </Text>
          </View>
          
          {/* Blue section with buttons */}
          <LinearGradient
            colors={['#A5D8FF', '#86B6F6']}
            style={styles.buttonsContainer}
          >
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.buttonText}>Join Us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%', // Full height now
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%', // Half of the image from bottom
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoSection: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
  bottomSection: {
    width: '100%',
  },
  textContainer: {
    backgroundColor: '#FFD580',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  bodyText: {
    fontSize: 16,
    color: '#4D4D4D',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4D4D4D',
    fontFamily: 'Inter-Medium',
  }
});