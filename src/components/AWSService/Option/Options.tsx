import { IComponent } from '@/src/types/Services';
import { OptionList } from '@/src/assets/OptionList';

const Options = ({ serviceType }: { serviceType: 'EC2' | 'RDS' | 'S3' }) => {
  const optionList = OptionList[serviceType];

  return (
    <div className='absolute top-16 right-0 w-80  h-full bg-amber-50 select-none pointer-events-none bg-opacity-50'>
      {Object.keys(optionList).map((key) => (
        <div key={key}>
          <span>{key} : </span>
          <select>
            {/*@ts-ignore*/}
            {optionList[key].map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Options;
