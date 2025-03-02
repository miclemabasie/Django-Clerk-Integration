import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';

const MainApp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:8000/api/v1/users/me/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Current User:', data);
      } else {
        console.error('Error:', data);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <View>
      <Text>Welcome to the App!</Text>
    </View>
  );
};

export default MainApp;