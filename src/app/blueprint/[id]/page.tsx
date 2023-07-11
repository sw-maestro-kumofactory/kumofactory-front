import MenuBar from '@/src/components/Blueprint/Menu/MenuList';
import Grid from '@/src/components/Blueprint/Grid';

const Blueprint = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return (
    <div className='flex h-full'>
      <MenuBar />
      <Grid />
    </div>
  );
};

export default Blueprint;
