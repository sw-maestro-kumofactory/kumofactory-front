import AuthButton from '@/src/components/Auth/Button/Button';
interface IProps {
  onClick: () => void;
}

const GoogleAuthButton = ({ onClick }: IProps) => {
  return <AuthButton onClick={onClick} src={'/icons/icon-google.svg'} alt={'google-icon'} />;
};

export default GoogleAuthButton;
