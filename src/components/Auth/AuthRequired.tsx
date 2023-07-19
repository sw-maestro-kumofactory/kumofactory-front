import { useEffect } from 'react';

interface IProps {
  children: React.ReactNode;
}

const AuthRequired = ({ children }: IProps) => {
  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem('accessToken');
      alert('please login!');
      if (!token) window.location.href = '/auth/login';
    }
  }, []);
  return <>{children}</>;
};

export default AuthRequired;
