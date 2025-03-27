import { createContext, useState } from 'react';

import auth from '../utils/auth';

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const handleRegister = async (registerData) => {
    try {
      await auth.register('/signup', registerData);
      return;
    } catch (error) {
      console.log(`POST /signup`, error);
      throw error;
    }
  };

  const handleLogin = async (loginData) => {
    try {
      const token = await auth.authorize('/signin', loginData);
      return token;
    } catch (error) {
      console.log(`POST /signin`, error);
      throw error;
    }
  };

  return (
    <LoginContext.Provider
      value={{ handleRegister, handleLogin, isLoggedIn, setIsloggedIn }}
    >
      {children}
    </LoginContext.Provider>
  );
}
