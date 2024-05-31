import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Heading, Alert, AlertIcon } from '@chakra-ui/react';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Box align="center" justify="center" minHeight="100vh" paddingTop="120px">
      <Box width="sm">
        <Heading mb={6}>Login</Heading>
        
        {showAlert && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            Invalid username or password
          </Alert>
        )}
        
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb={3}
        />
        <Button onClick={handleLogin} width="100%">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
