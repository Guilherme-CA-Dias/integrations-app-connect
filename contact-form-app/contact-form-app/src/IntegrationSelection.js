// src/IntegrationSelection.js
import React, { useState } from 'react';
import { IntegrationAppProvider, useIntegrationApp } from '@integration-app/react';

const platforms = [
  { id: 'pipedrive-oauth', name: 'Pipedrive' },
  { id: 'hubspot-oauth', name: 'HubSpot' },
  // Add more platforms as needed
];

export default function IntegrationSelection() {
  const integrationApp = useIntegrationApp();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');

  const handlePlatformSelect = async () => {
    if (!selectedPlatform) return;

    try {
      await integrationApp.connection(selectedPlatform).create();
      setConnectionStatus('Connection created successfully!');
    } catch (error) {
      console.error('Error creating connection:', error);
      setConnectionStatus('Error creating connection: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Select a Platform for Integration</h1>
      <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
        <option value="">-- Select a Platform --</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
      <button onClick={handlePlatformSelect}>Create Connection</button>
      {connectionStatus && <p>{connectionStatus}</p>}
    </div>
  );
}

// In your main app file (e.g., MyApp.js), you can wrap this component with IntegrationAppProvider
// src/MyApp.js
import React from 'react';
import { IntegrationAppProvider } from '@integration-app/react';
import IntegrationSelection from './IntegrationSelection';

export default function MyApp() {
  const token = process.env.REACT_APP_INTEGRATION_APP_TOKEN;

  return (
    <IntegrationAppProvider token={token}>
      <IntegrationSelection />
    </IntegrationAppProvider>
  );
}
