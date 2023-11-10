import BlueprintMenuList from '@/src/components/Blueprint/Menu/Blueprint/BlueprintMenuList';
import Grid from '@/src/components/Blueprint/Grid/Grid';
import GridWrapper from '@/src/components/Blueprint/Grid/GridWrapper';

const Blueprint = ({ params }: { params: { id: string } }) => {
  const blueprintId = params.id;

  return (
    <div className='flex h-full overflow-y-hidden'>
      <BlueprintMenuList />
      <GridWrapper blueprintId={blueprintId}>
        <Grid id={blueprintId} />
      </GridWrapper>
    </div>
  );
};

export default Blueprint;
