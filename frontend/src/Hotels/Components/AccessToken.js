import React, { useEffect} from 'react';
import { fetchAccessToken } from '../api';

const AccessToken = ({ setToken }) => {
  useEffect(() => {
    const getToken = async () => {
      const token = await fetchAccessToken();
      setToken(token);
    };
    getToken();
  }, [setToken]);

  return <div>Loading Access Token...</div>;
};

export default AccessToken;
