import DeployMenuList from '@/src/components/DeployComponent/DeployMenuList';
import DeployComponent from '@/src/components/DeployComponent/Application/DeployComponent';
import GridWrapper from '@/src/components/Blueprint/Grid/GridWrapper';
import DeployWrapper from '@/src/components/DeployComponent/DeployWrapper';

const DeployPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='h-full flex'>
      <GridWrapper blueprintId={params.id}>
        <DeployWrapper>
          <DeployMenuList />
          <DeployComponent />
        </DeployWrapper>
      </GridWrapper>
    </div>
  );
};

export default DeployPage;
