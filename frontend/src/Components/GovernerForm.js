import { useState } from 'react';
import { useGovernerContext } from '../hooks/useGovernerContext';

const GovernerForm = () => {
  const { dispatch } = useGovernerContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for empty fields
    let emptyFieldsArr = [];
    if (!username) emptyFieldsArr.push('username');
    if (!password) emptyFieldsArr.push('password');
    
    if (emptyFieldsArr.length > 0) {
      setError('Please fill in all fields');
      setEmptyFields(emptyFieldsArr);
      return;
    }

    const governer = { username, password };

    const response = await fetch('/api/Admin/Governer', {
      method: 'POST',
      body: JSON.stringify(governer),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      if (json.error === 'This username or password already exists') {
        setError('The username or password already exists.');
      } else {
        setError(json.error);
      }
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setUsername('');
      setPassword('');
      dispatch({ type: 'CREATE_GOVERNER', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Governer</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className={emptyFields.includes('username') ? 'error' : ''}
      />

      <label>Password:</label>
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <button>Add Governer</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default GovernerForm
