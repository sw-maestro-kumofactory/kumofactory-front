import React from 'react';

const CustomList = ({ title, content }: { title: string; content: string }) => {
  return (
    <li>
      <div className='flex gap-x-4'>
        <div className='font-semibold'>{title}</div>
        <div className='text-[#323438]'>{content}</div>
      </div>
    </li>
  );
};

export default CustomList;
