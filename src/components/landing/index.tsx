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
    <div
      className={`w-full h-[667px] flex justify-between items-center px-[215px] py-[130px] gap-x-14 ${
        index & 1 && 'bg-white'
      }`}
    >
      {index % 2 === 0 ? (
        <>
          <div className='flex flex-col gap-y-8 justify-center items-center mr-4'>
            <LandingTitle title={title} />
            <LandingDescription description={description} />
          </div>
          <div className='w-[630px] min-w-[630px] h-[382px] flex items-center justify-center drop-shadow-md'>
            <img src={src} alt='landing image' />
          </div>
        </>
      ) : (
        <>
          <div className='w-[630px] min-w-[630px] h-[382px] flex items-center justify-center drop-shadow-md'>
            <img src={src} alt='landing image' />
          </div>
          <div className='flex flex-col gap-y-8 justify-center items-center mr-4'>
            <LandingTitle title={title} />
            <LandingDescription description={description} />
          </div>
        </>
      )}
    </div>
  );
};
export default Landing;
