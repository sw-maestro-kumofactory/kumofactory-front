import MenuItem from '@/src/components/Blueprint/Menu/MenuItem';
import EC2 from '@/src/components/AWSService/EC2';
const MenuBar = () => {
  return (
    <div className='w-80 min-w-fit h-full border-r-2 border-[#195091]-100'>
      <MenuItem name='ec2' onClick={() => {}} />
      <MenuItem name='rds' onClick={() => {}} />
      <MenuItem name='cloudFront' onClick={() => {}} />
    </div>
  );
};

export default MenuBar;
