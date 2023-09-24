import DeployMenuList from '@/src/components/DeployComponent/DeployMenuList';
import Setting from '@/src/components/DeployComponent/Application/ProjectSetting/Setting';
import GridWrapper from '@/src/components/Blueprint/Grid/GridWrapper';

const SettingPage = ({ params }: { params: { id: string; repoId: string } }) => {
  return (
    <div className='flex h-full'>
      <GridWrapper blueprintId={params.id}>
        <DeployMenuList disabled={true} />
        <Setting />
      </GridWrapper>
    </div>
  );
};

export default SettingPage;
