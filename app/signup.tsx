import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, SafeAreaView, TextInput as RNTextInput } from 'react-native';
import { router, Link } from 'expo-router';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import Logo from '@/components/Logo';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Add focus states for password fields
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const validate = () => {
    const newErrors = { email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = () => {
    if (validate()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to app home screen after signup
        router.push('/');
      }, 1500);
    }
  };

  // Updated password input component with focus state
  const PasswordField = ({ 
    value, 
    onChangeText, 
    placeholder, 
    showPassword, 
    toggleShowPassword, 
    error,
    isFocused,
    onFocus,
    onBlur
  }) => (
    <View style={[
      styles.passwordContainer,
      error ? { borderColor: '#ef4444' } : null,
      isFocused ? { borderColor: '#000000', borderWidth: 2 } : null
    ]}>
      <RNTextInput
        placeholder={placeholder || "••••••••"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        style={styles.passwordInput}
        placeholderTextColor="#9ca3af"
        selectionColor="#3b82f6"
        underlineColorAndroid="transparent"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <TouchableOpacity
        onPress={toggleShowPassword}
        style={styles.eyeIconContainer}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={showPassword ? "eye" : "eye-off"} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>

            <Text style={styles.headerText}>Sign up for Rezilia</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  placeholder="you@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                  style={styles.input}
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View
                  style={[
                    styles.passwordWrapper,
                    errors.password ? { borderColor: '#ef4444' } : null,
                    isPasswordFocused
                      ? { borderColor: '#000000', borderWidth: 2 }
                      : null,
                  ]}
                >
                  <View style={styles.passwordInnerContainer}>
                    <RNTextInput
                      placeholder="••••••••"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      style={styles.passwordInput}
                      placeholderTextColor="#9ca3af"
                      selectionColor="#3b82f6"
                      underlineColorAndroid="transparent"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIconContainer}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={[
                  styles.passwordWrapper,
                  errors.confirmPassword ? { borderColor: '#ef4444' } : null,
                  isConfirmPasswordFocused ? { borderColor: '#000000', borderWidth: 2 } : null
                ]}>
                  <View style={styles.passwordInnerContainer}>
                    <RNTextInput
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      style={styles.passwordInput}
                      placeholderTextColor="#9ca3af"
                      selectionColor="#3b82f6"
                      underlineColorAndroid="transparent"
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      onBlur={() => setIsConfirmPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeIconContainer}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>

            <Button
              title="Sign up"
              fullWidth
              loading={isLoading}
              onPress={handleSignup}
              gradientColors={['#f97316', '#4f46e5']}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.bodyText}>Already have an account? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white'
  },
  backButtonContainer: {
    marginTop: 38,
    marginBottom: 24
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 32
  },
  formContainer: {
    marginBottom: 24,
    gap: 24
  },
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    paddingBottom: Platform.OS === 'ios' ? 16 : 0
  },
  bodyText: {
    color: '#4b5563',
    fontFamily: 'Inter-Regular',
  },
  linkText: {
    color: '#3b82f6',
    fontFamily: 'Inter-Medium',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
    height: 50,
    overflow: 'hidden',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    height: '100%',
    // Remove all default TextInput borders and styling
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    outline: 'none', // For web
    outlineWidth: 0, // For web
    margin: 0,
  },
  eyeIconContainer: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
    passwordWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
    height: 50,
    overflow: 'hidden',
  },
    passwordInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});