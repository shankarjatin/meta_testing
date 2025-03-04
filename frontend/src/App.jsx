import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/get-templates');
      console.log(response.data);  // Log the full response for debugging
      setTemplates(response.data.data);  // Access the 'data' field which contains the array of templates
    } catch (err) {
      setError('Error fetching templates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>WhatsApp Business Message Templates</h1>
      <button onClick={getTemplates} disabled={loading}>
        {loading ? 'Loading...' : 'Get Templates'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {templates.length > 0 ? (
          templates.map((template) => (
            <li key={template.id}>
              <h3>{template.name}</h3>
              <p>Status: {template.status}</p>
              <p>Category: {template.category}</p>
              <p>Language: {template.language}</p>
              <ul>
                {template.components.map((component, index) => (
                  <li key={index}>
                    <strong>{component.type}:</strong> {component.text}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No templates available</p>
        )}
      </ul>
    </div>
  );
}

export default App;
