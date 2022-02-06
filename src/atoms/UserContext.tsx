import * as jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

type DecodedToken = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
};

const accessTokenKey = 'accessToken';

export const UserContext = createContainer(useUser);

function useUser() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(accessTokenKey);
    setAccessToken(token);
    if (token) {
      setUserInfo(token);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    setUserInfo(accessToken);
    localStorage.setItem(accessTokenKey, accessToken);
  }, [accessToken]);

  const setUserInfo = (token: string) => {
    const decodedToken = jwt.decode(token) as DecodedToken;
    setFullName(`${decodedToken.firstName} ${decodedToken.lastName}`.trim());
    setUserId(decodedToken.id);
  };

  const isTokenValid = () => {
    if (!accessToken) {
      return false;
    }

    const decodedToken = jwt.decode(accessToken) as DecodedToken;
    if (new Date(decodedToken.exp * 1000) < new Date()) {
      return false;
    }

    return true;
  };

  const clearTokens = () => {
    setAccessToken(null);
    setFullName(null);
    setUserId(null);
    localStorage.removeItem(accessTokenKey);
  };

  return {
    userId,
    accessToken,
    isTokenValid,
    fullName,
    loading,
    setAccessToken,
    clearTokens,
  };
}
