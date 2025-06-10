import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import AuthForm from './F_components/AuthForm';
import WelcomeModal from './Screens/WelcomeModal';

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [screen, setScreen] = useState('login');

  const toggleScreen = () => {
    setScreen(screen === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // TODO: Add API call
  };
  return (
      <View style={{ flex: 1 }}>
       <AuthForm type={screen} toggleScreen={toggleScreen} onSubmit={handleSubmit} />
       <WelcomeModal visible={showModal} onClose={()=> setShowModal(false)} />
      </View>
  );
};

export default App;
