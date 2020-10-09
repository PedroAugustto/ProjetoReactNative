import 'react-native-gesture-handler';

import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import Routes from './routes'

import { UsuarioProvider } from './contexts/user'




export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UsuarioProvider>
        <Routes />
      </UsuarioProvider>
    </SafeAreaView>
  );
}