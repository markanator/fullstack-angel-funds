import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// tailwind components provider
import { Windmill } from '@windmill/react-ui';

// locals
import './styles/index.css';
import App from './App';
// notifcation context provider
import NotificationProvider from './context/Notifications/NotifcationProvider';

ReactDOM.render(
  <Router>
    <Windmill>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Windmill>
  </Router>,
  document.getElementById('root')
);
