import BlueprintMenuList from '@/src/components/Blueprint/Menu/Blueprint/BlueprintMenuList';
import Grid from '@/src/components/Blueprint/Grid/Grid';

const Blueprint = ({ params }: { params: { id: string } }) => {
  const blueprintId = params.id;

  return (
    <div className='flex h-full overflow-y-hidden'>
      <BlueprintMenuList />
      <Grid id={blueprintId} />
    </div>
  );
};

export default Blueprint;
