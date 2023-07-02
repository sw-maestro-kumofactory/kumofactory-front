import { ExportSvg } from '@/src/utils/ExportSvg';

export const ExportButton = () => {
  return (
    <div className='absolute right-10 top-28 select-none'>
      <button onClick={ExportSvg} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Export
      </button>
      <input type='file' id='fileInput' className='hidden' />
    </div>
  );
};
