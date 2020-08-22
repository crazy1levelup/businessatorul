import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//screens

import store from './src/redux/store'
import { Provider } from 'react-redux'
import Routers from './Routers'



export default function App() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Routers />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}




