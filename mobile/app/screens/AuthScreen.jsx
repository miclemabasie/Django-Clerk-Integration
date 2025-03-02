import React from 'react';
import { useAuth, SignIn, SignUp } from '@clerk/clerk-expo';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';

const AuthScreen = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const token = await getToken();
    const response = await fetch('http:///localhost:8000/clerk-login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(setCredentials({ token: data.token }));
    } else {
      console.error('Error:', data.error);
    }
  };

  return (
    <>
      <SignIn afterSignIn={handleLogin} />
      <SignUp />
    </>
  );
};

export default AuthScreen;