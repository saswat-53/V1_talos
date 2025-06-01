import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  gradientColors?: string[];
}

export default function Button({ 
  title, 
  variant = 'primary', 
  fullWidth = false,
  loading = false,
  disabled = false,
  gradientColors,
  style,
  ...props 
}: ButtonProps) {
  
  const getButtonStyle = () => {
    if (variant === 'primary') {
      return { backgroundColor: '#3b82f6' }; // primary-500 equivalent
    } else if (variant === 'secondary') {
      return { backgroundColor: 'white', borderWidth: 1, borderColor: '#d1d5db' };
    } else {
      return { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#d1d5db' };
    }
  };

  const getTextColor = () => {
    
    if (gradientColors) {
      return '#ffffff';
    }
    
    if (variant === 'primary') {
      return '#ffffff';
    } else if (variant === 'secondary') {
      return '#1f2937';
    } else {
      return '#3b82f6';
    }
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={gradientColors || variant === 'primary' ? 'white' : '#3366ff'} />;
    }
    
    return (
      <Text 
        style={[
          styles.buttonText,
          { color: getTextColor() }
        ]}
      >
        {title}
      </Text>
    );
  };

  if (gradientColors) {
    return (
      <TouchableOpacity 
        disabled={disabled || loading}
        style={[
          styles.button,
          fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' },
          { opacity: disabled ? 0.7 : 1 },
          style
        ]}
        {...props}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      disabled={disabled || loading}
      style={[
        styles.button,
        getButtonStyle(),
        fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' },
        { opacity: disabled ? 0.7 : 1 }, 
        style
      ]}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 28,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    fontWeight: '500',
  }
});