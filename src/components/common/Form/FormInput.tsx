interface IProps {
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}
const OptionInput = ({ type, value, onChange, disabled }: IProps) => {
  return (
    <input
      className='w-full appearance-none text-xs font-semibold py-2 px-2 rounded-md border border-[#DAE2EC] hover:border-[#CCD6E0] focus:ring-0'
      type={type ? type : 'text'}
      value={value}
      onChange={onChange ? onChange : () => {}}
      disabled={disabled}
    />
  );
};

export default OptionInput;
