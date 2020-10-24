import React from 'react';
import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import Routes from './routes/routes';
import { AuthProvider } from './contexts/auth'

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
