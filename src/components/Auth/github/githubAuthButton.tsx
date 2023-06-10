import AuthButton from '@/src/components/Auth/Button';

interface IProps {
  onClick: () => void;
}

const GithubAuthButton = ({ onClick }: IProps) => {
  return <AuthButton onClick={onClick} src={'icons/icon-github.svg'} alt={'github-icon'} />;
};

export default GithubAuthButton;
