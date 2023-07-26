import MenuBar from '@/src/components/Blueprint/Menu/MenuList';
import Grid from '@/src/components/Blueprint/Grid';

const Blueprint = ({ params }: { params: { id: string } }) => {
  const blueprintId = params.id;
  return (
    <div className='flex h-full'>
      <MenuBar />
      <Grid id={blueprintId} />
    </div>
  );
};

export default Blueprint;
