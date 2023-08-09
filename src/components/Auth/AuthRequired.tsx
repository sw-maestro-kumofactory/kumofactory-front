import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';

interface IProps {
  children: React.ReactNode;
}

const AuthRequired = ({ children }: IProps) => {
  const accessToken = useLoginStore((state) => state.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      alert('please login!');
      router.replace('/auth/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthRequired;
