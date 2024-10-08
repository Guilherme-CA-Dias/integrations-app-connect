// src/MyApp.js
import React from 'react';
import { IntegrationAppProvider } from '@integration-app/react';
import IntegrationSelection from './IntegrationSelection';
import ContactForm from './ContactForm'; // Import your existing ContactForm component

export default function MyApp() {
  const token = process.env.REACT_APP_INTEGRATION_APP_TOKEN;

  return (
    <IntegrationAppProvider token={token}>
      <h1>Welcome to the CRM Integration App</h1>
      <IntegrationSelection /> {/* This is your platform selection component */}
      <ContactForm /> {/* This is the existing contact form component */}
    </IntegrationAppProvider>
  );
}
