// src/ContactForm.js
import React, { useState } from 'react';
import { useIntegrationApp } from '@integration-app/react';

export default function ContactForm() {
  const integrationApp = useIntegrationApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [contactCreated, setContactCreated] = useState(false);
  const [createdContactId, setCreatedContactId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!integrationApp.connection('pipedrive-oauth').isConnected()) {
      alert('Please select a platform and connect it before creating a contact.');
      return;
    }

    try {
      const result = await integrationApp
        .connection('pipedrive-oauth') // Ensure the correct connection is configured
        .flow('create-contact')
        .run({
          input: {
            Name: name,
            Email: email,
            Phone: phone,
            Company: company,
          },
        });

      // Extract the contact ID from the result, assuming it's returned as { id: "XX" }
      const contactId = result.output.id;

      setCreatedContactId(contactId);
      setContactCreated(true);
      
      alert(`Contact created successfully for ${name}. Check your CRM.`);
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
    } catch (error) {
      console.error('Error creating contact:', error);
      alert('Error creating contact: ' + error.message);
    }
  };

  return (
    <div>
      {contactCreated ? (
        <div>
          <p>Contact created successfully! View it <a href={`https://gdlhm-sandbox.pipedrive.com/person/${createdContactId}`} target="_blank" rel="noopener noreferrer">here</a>.</p>
          <button onClick={() => setContactCreated(false)}>Create Another Contact</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Company:
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Create Contact</button>
        </form>
      )}
    </div>
  );
}
