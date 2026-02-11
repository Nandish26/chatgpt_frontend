import React, { useState } from 'react';

const Signin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Updates state dynamically based on input "name" attribute
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', { // Ensure this matches your login route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Typically you'd store a token and redirect the user
        console.log('Login Success:', data);
        alert('Welcome back!');
        // localStorage.setItem('token', data.token); 
      } else {
        // Error: Display the message from the backend
        setError(data.detail || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <form onSubmit={handleSignIn} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={credentials.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={credentials.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? {...styles.button, opacity: 0.7} : styles.button}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

// Inline styles for a quick, clean UI
const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'sans-serif' },
  card: { padding: '2rem', border: '1px solid #eaeaea', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
  title: { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#4F46E5', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  error: { color: '#D60000', fontSize: '14px', marginTop: '10px', textAlign: 'center' }
};

export default Signin;