import { useLogin } from '@/src/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import Image from 'next/image';
import AuthButton from '@/src/components/Auth/Button';
interface IProps {
  onClick: () => void;
}

const KakaoAuthButton = ({ onClick }: IProps) => {
  return <AuthButton onClick={onClick} src={'icons/icon-kakao.svg'} alt={'kakao-icon'} />;
};

export default KakaoAuthButton;
