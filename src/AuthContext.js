import { createContext, useContext, useState } from 'react';
// import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Add token state

  const signIn = (token) => {
    // Perform your sign-in logic here and set the user data
    try {
      const tokenPayload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      
      if (decodedPayload.sub) {
        setUser({ id: decodedPayload.sub }); // Update user state with user ID
      } else {
        console.error('Invalid token payload:', decodedPayload);
      }
    } catch (error) {
      console.error('Error decoding and updating user:', error);
    }
  };

  const signOut = () => {
    // Perform your sign-out logic here
    setUser(null);
    setToken(null); // Clear the token when signing out
  };

  const login = (newToken) => {
    // Set the token in the context's state
    setToken(newToken);

    // Perform any additional logic you need, such as decoding the token
    // and updating the user's authentication status

    // For example:
    // const decodedToken = decodeToken(newToken);
    // setUser(decodedToken.user);
    setUser(newToken)
  };

  const contextValue = {
    user,
    token, // Include the token in the context value
    signIn,
    signOut,
    login,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
