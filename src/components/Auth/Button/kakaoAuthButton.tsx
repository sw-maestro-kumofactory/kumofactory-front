import AuthButton from '@/src/components/Auth/Button/Button';
interface IProps {
  onClick: () => void;
}

const KakaoAuthButton = ({ onClick }: IProps) => {
  return <AuthButton onClick={onClick} src={'/icons/icon-kakao.svg'} alt={'kakao-icon'} />;
};

export default KakaoAuthButton;
