import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { MyProvider } from './src/contextApi/ContextApi';

const App = () => {

  return (
    <MyProvider>
      <AppNavigation />
    </MyProvider>

  );
}

export default App;
