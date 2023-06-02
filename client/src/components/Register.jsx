import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation,setValidation]=useState({})
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });

      if (response.status === 200) {
        
        navigate("/profile");
        // Handle success, e.g., show a success message or redirect to another page
      }
    } catch (error) {
      setValidation(error.response.data.errors);
      // Handle error, e.g., show an error message
    }
  };

  return (
    
    <form onSubmit={handleRegister}>
      {JSON.stringify(validation)}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation,setValidation]=useState({})
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true });
      
      if (response.status === 200) {
      
        
        // const userToken = response.token;
        // var userToken = await response.data.usertoken
    
        // console.log(userToken)
    //     const userToken = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    
    // // Do something with the 'usertoken'
    // console.log(userToken);
    // const userToken = cookies.usertoken;
    //     localStorage.setItem('token', userToken);
        // const token = localStorage.getItem('token');
        // console.log(token)
        navigate("/profile");
        
        // Handle success, e.g., show a success message or redirect to another page
      }
    } catch (error) {
     setValidation(error.response.data.errors);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleLogin}>
       {JSON.stringify(validation)}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

const UserAuthentication = () => {
  const [validation,setValidation]=useState({})
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout');
      console.log('Logout successful');
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      setValidation(error.response.data.errors);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <RegistrationForm />
      <LoginForm />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserAuthentication;
