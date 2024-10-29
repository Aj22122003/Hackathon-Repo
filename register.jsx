import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/register',
        {
          name,
          username,
          email,
          password,
          phone,
        },
        { withCredentials: true }
      );

      // Redirect to admin or handle success
      if (response.status === 200) {
        window.location.href = '/login'; // Redirect to the login page on success
      }
    } catch (err) {
      // Handle error response
      if (err.response && err.response.status === 400) {
        setError('User already exists');
        console.log(err);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container flex flex-col gap-2 bg-background text-text px-14 py-16  rounded-lg h-fit">
      <h1 className="text-center text-3xl">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-6 lg:grid lg:grid-cols-2 lg:grid-row-auto"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <Input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          className="col-span-2"
          variant="ghost"
          color="primary"
          type="submit"
        >
          Register
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
