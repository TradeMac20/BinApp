import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, Text, SafeAreaView } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import AuthForm from './F_components/AuthForm';
import './F_components/firebase'; // Firebase config
//import userPage from './F_components/userPage';


//MapboxGL.setAccessToken(null); // Required for MapLibre
//import mapTest from './F_components/Screens/mapTest';

const App = () => {
  // 🔐 Auth screen toggle logic
  const [screen, setScreen] = useState('login');
  const toggleScreen = () => {
    setScreen(screen === 'login' ? 'signup' : 'login');
  };
  const toggleUser = () => {
    setScreen(screen === 'user' ? 'customer' : 'wasteCollector');
  };
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  {/*

  // 🌍 Map setup
  const initialCoords = [-74.0060, 40.7128]; // [lng, lat]

  const markers = [
    {
      id: 'nyc',
      title: 'New York City',
      coordinates: [-74.0060, 40.7128],
    },
    {
      id: 'times-square',
      title: 'Times Square',
      coordinates: [-73.9855, 40.7580],
    },
  ];

  const osmStyle = {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors',
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
        minzoom: 0,
        maxzoom: 19,
      },
    ],
  };

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  */}

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <AuthForm type={screen} toggleScreen={toggleScreen} onSubmit={handleSubmit} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default App;
