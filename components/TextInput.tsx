import React, { useState } from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  Text, 
  TouchableOpacity,
  TextInputProps as RNTextInputProps,
  StyleSheet
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  secureTextEntry?: boolean;
}

export default function TextInput({ 
  label, 
  error, 
  containerClassName = '', 
  secureTextEntry = false,
  ...props 
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="mb-2 text-gray-700" style={styles.label}>
          {label}
        </Text>
      )}
      
      <View className={`relative border rounded-lg px-4 py-3.5 ${
        error ? 'border-red-500' : (isFocused ? 'border-primary-500' : 'border-gray-300')
      }`}>
        <RNTextInput
          className="text-gray-800 w-full"
          style={styles.input}
          placeholderTextColor="#9ca3af"
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            className="absolute right-3 top-3.5"
            onPress={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff size={20} color="#6b7280" />
            ) : (
              <Eye size={20} color="#6b7280" />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="mt-1 text-red-500 text-sm" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter-Medium',
  },
  input: {
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
  }
});