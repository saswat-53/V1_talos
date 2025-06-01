import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';

interface BackButtonProps {
  onPress?: () => void;
}

export default function BackButton({ onPress }: BackButtonProps) {
  const pathname = usePathname();
  
  const handlePress = () => {
    if (onPress) {
      // Use custom handler if provided
      onPress();
      return;
    }
    
    // Special handling for auth flow navigation
    if (pathname === '/signup') {
      // If on login screen, go back to signup
      router.replace('/login');
    } else if (pathname === '/login') {
      // If on signup screen, go back to index/home
      router.replace('/');
    } else {
      // Default back navigation for other screens
      try {
        router.back();
      } catch {
        if (pathname === '/signup') router.replace('/login');
        else if (pathname === '/login') router.replace('/');
        else router.replace('/');
      }
    }
  };

  return (
    <TouchableOpacity 
      className="w-10 h-10 rounded-full items-center justify-center"
      onPress={handlePress}
    >
      <ArrowLeft size={24} color="#333333" />
    </TouchableOpacity>
  );
}