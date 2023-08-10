import DeployMenuList from '@/src/components/DeployComponent/DeployMenuList';
import DeployComponent from '@/src/components/DeployComponent/Application/DeployComponent';
import GridWrapper from '@/src/components/Blueprint/Grid/GridWrapper';

const DeployPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='h-full flex'>
      <GridWrapper blueprintId={params.id}>
        <DeployMenuList />
        <DeployComponent />
      </GridWrapper>
    </div>
  );
};

export default DeployPage;
