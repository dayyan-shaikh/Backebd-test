import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login) {
      navigate('/');
    }
  }, [navigate]); // Add dependencies to useEffect for better optimization

  return <Component />;
};

export default ProtectedRoute;
