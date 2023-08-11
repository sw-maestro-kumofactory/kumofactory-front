import DeployMenuList from '@/src/components/DeployComponent/DeployMenuList';
import Setting from '@/src/components/DeployComponent/Application/ProjectSetting/Setting';

const SettingPage = ({ params }: { params: { repoId: string } }) => {
  const repositoryId = params.repoId;

  return (
    <div className='flex h-full overflow-y-hidden'>
      <DeployMenuList disabled={true} />
      <Setting id={repositoryId} />
    </div>
  );
};

export default SettingPage;
