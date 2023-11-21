import LandingTitle from '@/src/components/landing/LandingTitle';
import LandingDescription from '@/src/components/landing/LandingDescription';

interface IProps {
  title: string;
  description: string;
  src: string;
  index: number;
}

const Landing = ({ title, description, src, index }: IProps) => {
  return (
    <div className={`w-full h-[667px] flex justify-between px-[215px] py-[130px] ${index & 1 && 'bg-white'}`}>
      <div className='flex flex-col justify-center items-center mr-4'>
        <LandingTitle title={title} />
        <LandingDescription description={description} />
      </div>
      <div className='w-[785px] h-[382px] bg-black' />
    </div>
  );
};
export default Landing;
