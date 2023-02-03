import React, {useEffect} from 'react';
import {Routing} from './routing';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Routing />;
};

export default App;
