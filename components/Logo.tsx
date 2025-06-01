import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 28;
      case 'large':
        return 48;
      default:
        return 36;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 'text-lg';
      case 'large':
        return 'text-3xl';
      default:
        return 'text-2xl';
    }
  };

  return (
    <View className="flex-row items-center">
      <View 
        className="rounded-full overflow-hidden bg-gradient-to-br from-teal-300 to-teal-500"
        style={{ width: getSize(), height: getSize() }}
      >
        <View className="absolute right-1 bottom-1 bg-primary-400 rounded-full w-3/5 h-2/5" />
      </View>
      
      {showText && (
        <Text 
          className={`ml-2 font-semibold text-gray-700 ${getFontSize()}`}
          style={styles.logoText}
        >
          Rezilia
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: 'Inter-SemiBold',
  }
});