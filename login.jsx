import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        {
          username,
          password,
        },
        { withCredentials: true }
      ); // Send cookies with the request

      // If the login is successful, you will get a status of 200
      if (response.status === 200) {
        setSuccess('Login successful');
        setError('');
        localStorage.setItem('username', username);
        window.location.href = '/home';
        // You might want to redirect the user or update your app state after successful login
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred while logging in');
      }
      setSuccess('');
    }
  };

  return (
    <div className="login-container flex flex-col gap-2 bg-background text-text px-14 py-16  rounded-lg h-fit">
      <h2 className="text-center text-xl">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-5 text-lg">
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            size="lg"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            size="lg"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button variant="ghost" type="submit" color="primary">
          Login
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <p className="text-xs text-center">
        New user? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
