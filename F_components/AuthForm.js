import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Image,
  StatusBar,
  Alert,
  ScrollView, // Import ScrollView
  TouchableWithoutFeedback, // Import TouchableWithoutFeedback
  Keyboard, // Import Keyboard
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your API functions
import { register, login } from './frontend/api/auth'; // Adjust the path as needed

const AuthForm = ({ type = 'login', onSubmit, toggleScreen }) => {
  const isLogin = type === 'login';

  const appLogo = require('../assets/oSense_profile.png');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [isPickerActive, setIsPickerActive] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isPickerActive ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isPickerActive]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleFormSubmit = async () => {
    if (!email || !password || (!isLogin && (!name || !role))) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

    try {
      if (isLogin) {
        const response = await login({ email, password });
        Alert.alert('Success', 'Logged in successfully!');
        console.log('Login successful:', response);
        onSubmit(response);
      } else {
        const has_seen_modal = false;
        const response = await register({
          username: name,
          email,
          password,
          role,
          has_seen_modal,
        });
        Alert.alert('Success', 'Account created successfully!');
        console.log('Registration successful:', response);
        onSubmit(response);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred.';
      Alert.alert('Error', errorMessage);
      console.error('API Error:', error);
    }
  };

  return (
    // ScrollView and TouchableWithoutFeedback wrapping for 
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      keyboardShouldPersistTaps="handled" // Handling taps outside inputs
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle={'dark-content'} />
          <View
            style={{
              width: '100%',
              height: verticalScale(150),
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: verticalScale(10),
              alignSelf: 'center',
            }}
          >
            <Image
              source={appLogo}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Welcome,</Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? 'Login to your account'
              : 'Create an account to get started'}
          </Text>

          {!isLogin && (
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Enter your password"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconContainer}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={scale(24)}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <View>
              <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                value={role}
                items={[
                  { label: 'Consumer', value: 'consumer' },
                  { label: 'Waste Collector', value: 'collector' },
                ]}
                placeholder={{ label: 'Select your role', value: null }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                onOpen={() => setIsPickerActive(true)}
                onClose={() => setIsPickerActive(false)}
                Icon={() => (
                  <View style={{ position: 'absolute', right: 10, top: 12 }}>
                    <Animated.View
                      style={{ transform: [{ rotate: rotateInterpolate }] }}
                    >
                      {/* Increased icon size */}
                      <Icon name="chevron-down" size={scale(28)} color="#999" />
                    </Animated.View>
                  </View>
                )}
              />
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>
              {isLogin ? 'Login' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            {isLogin ? `Don't have an account? ` : 'Already have an account? '}
            <Text style={styles.link} onPress={toggleScreen}>
              {isLogin ? 'Register' : 'Login'}
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Add a style for the ScrollView's content container
  scrollContentContainer: {
    flexGrow: 1, // Allows content to grow and be scrollable
    justifyContent: 'center', // Centers content vertically if it doesn't fill the screen
    backgroundColor: '#fffff0',
  },
  container: {
    padding: scale(20),
    // Removed flex: 1 and backgroundColor from here as it's now on scrollContentContainer
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: scale(14),
    marginBottom: verticalScale(20),
    color: '#777',
  },
  input: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(15),
    fontSize: scale(14),
    backgroundColor: '#f9f9f9',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scale(8),
    marginBottom: verticalScale(15),
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: scale(10),
    fontSize: scale(14),
  },
  eyeIconContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
  },
  button: {
    backgroundColor: '#00ff88',
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    marginTop: verticalScale(10),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
    textAlign: 'center',
  },
  socialIcons: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  footer: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: scale(12),
  },
  link: {
    color: '#00ff88',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: verticalScale(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(15),
    fontSize: scale(15),
    backgroundColor: '#f9f9f9',
    color: '#000',
    paddingRight: scale(40), // Make space for the icon on the right
  },
  inputAndroid: {
    height: verticalScale(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(15),
    fontSize: scale(15),
    backgroundColor: '#f9f9f9',
    color: '#000',
    paddingRight: scale(40), // Make space for the icon on the right
  },
  placeholder: {
    color: '#999',
  },
});

export default AuthForm;