'use client';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import Loading from '@/src/components/common/Loading';

interface IProps extends React.PropsWithChildren {}
const DeployWrapper = ({ children }: IProps) => {
  const isLoading = useDeployStore((state) => state.isLoading);
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  return <>{children}</>;
};

export default DeployWrapper;
