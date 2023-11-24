interface IProps {
  title: string;
}
const LandingTitle = ({ title }: IProps) => {
  return <div className='text-4xl font-bold'>{title}</div>;
};

export default LandingTitle;
