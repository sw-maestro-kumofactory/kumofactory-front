interface IProps {
  text: string;
}

const OptionAttributeName = ({ text }: IProps) => {
  return <div className='text-[#323438] text-sm font-bold mb-2 mt-4'>{text}</div>;
};

export default OptionAttributeName;
