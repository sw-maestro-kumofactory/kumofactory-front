import MenuBar from '@/src/components/Blueprint/Menu/MenuList';
import Grid from '@/src/components/Blueprint/Grid';
import Options from '@/src/components/AWSService/Options/OptionContainer';
import EC2OptionForm from '@/src/components/AWSService/Options/Forms/EC2OptionForm';
import { EC2OptionComponent } from '@/src/components/AWSService/OptionFactory/Options/EC2Option';

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
