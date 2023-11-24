interface IProps {
  description: string;
}
const LandingDescription = ({ description }: IProps) => {
  return <div className='text-[#33404F] text-base'>{description}</div>;
};

export default LandingDescription;
