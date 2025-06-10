import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import AuthForm from './F_components/AuthForm';



const App = () => {
  
  const [screen, setScreen] = useState('login');

  const toggleScreen = () => {
    setScreen(screen === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };
  return (
      <View style={{ flex: 1 }}>
       <AuthForm type={screen} toggleScreen={toggleScreen} onSubmit={handleSubmit} />
      </View>
  );
};

export default App;
