import React, { ChangeEvent, useRef, useState } from 'react';

import { uploadSQLFile } from '@/src/api/deploy';

const SqlUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'sql') {
        setFile(file);
      } else {
        alert('Please choose a valid SQL file.');
      }
    }
  };

  const handleResetClick = () => {
    setFile(null);
    if (fileInputRef.current) {
    }
  };

  const handleSubmitClick = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('dbUsername', 'admin');
        formData.append('dbPassword', 'qwer1234');
        formData.append('sqlFile', file);
        await uploadSQLFile(formData);
      } catch (e) {
        alert('Failed to upload SQL file.');
      }
    } else {
      alert('Please choose a valid SQL file.');
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    } else {
      alert('Please choose a valid SQL file.');
    }
  };

  return (
    <div className='w-full h-full pl-[294px] py-8 flex flex-col items-center jsutify-center'>
      <div className='w-11/12 h-full flex flex-col gap-y-4'>
        <div className='text-2xl'>Database Setting</div>
        <div className='text-md text-gray-500'>Upload Your sql file by Drag & Drop or select from file explorer</div>
        <div className='flex flex-col gap-y-8 items-center h-full'>
          <div
            className='w-full h-4/5 border-blue-200 border-2 border-solid flex flex-col justify-center items-center text-2xl rounded-xl cursor-pointer'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className='text-4xl text-[#195091]'>Upload Your SQL File</div>
            {file && <div className='text-md mt-12 text-gray-600'>{file.name} is selected.</div>}
          </div>
          <form ref={formRef}>
            <input
              id='sql-file-input'
              ref={fileInputRef}
              type='file'
              accept='.sql'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </form>
          <div className='w-full -mt-8 flex justify-end gap-x-4'>
            <div
              className='text-xl p-4 border-2 border-solid border-[#799acf] text-[#195091] rounded-xl cursor-pointer'
              onClick={handleResetClick}
            >
              reset
            </div>
            <div className='text-xl p-4 bg-[#195091] text-white rounded-xl cursor-pointer' onClick={handleSubmitClick}>
              submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlUploader;
