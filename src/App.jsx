import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import AppRoutes from './AppRoutes';
import { initializeAuth } from './utils/authUtils';
import SessionTimeoutWarning from './components/common/SessionTimeoutWarning';
import { CurrencyProvider } from './contexts/CurrencyContext.jsx';

function App() {
  useEffect(() => {
    // Initialize authentication system
    const cleanup = initializeAuth();
    
    // Cleanup function
    return cleanup;
  }, []);

  return (
    <CurrencyProvider>
      <CssBaseline />
      <AppRoutes /> 
      <SessionTimeoutWarning />
    </CurrencyProvider>
  );
}

export default App;