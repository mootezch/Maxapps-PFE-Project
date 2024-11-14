// AuthContext.js
import React, { createContext, useReducer } from 'react';
import { api_nestjs } from "../utils/client";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null, // Add token to the initial state
};

async function bootstrapUser() {
  let user = null;

  try {
    const dataUser = await api_nestjs.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (dataUser) {
      user = dataUser;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }

  return user;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGGED_IN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user, token } = state;

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    window.location.reload();
  };

  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      bootstrapUser().then(data => {
        if (data) {
          dispatch({ type: 'LOGGED_IN', payload: { user: data.username, token: storedToken } });
        }
      });
    }
  }, []);

  const value = React.useMemo(() => ({
    state,
    logout,
    dispatch,
  }), [state, logout, dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth, AuthProvider };
