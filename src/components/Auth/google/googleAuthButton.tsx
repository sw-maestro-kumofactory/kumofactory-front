import Image from 'next/image';
import AuthButton from '@/src/components/Auth/Button';
interface IProps {
  onClick: () => void;
}

const GoogleAuthButton = ({ onClick }: IProps) => {
  return <AuthButton onClick={onClick} src={'icons/icon-google.svg'} alt={'google-icon'} />;
};

export default GoogleAuthButton;
