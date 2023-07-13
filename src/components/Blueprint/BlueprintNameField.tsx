import { useState } from 'react';

interface IProps {
  name: string;
  setName: (name: string) => void;
}
const BlueprintNameField = ({ name, setName }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {isEdit ? (
        <input
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      ) : (
        <div onClick={() => setIsEdit(true)}>{name}</div>
      )}
    </>
  );
};

export default BlueprintNameField;
