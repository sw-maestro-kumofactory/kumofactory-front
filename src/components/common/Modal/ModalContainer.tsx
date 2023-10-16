'use client';
import { createPortal } from 'react-dom';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface IProps {
  children: React.ReactNode;
  isShow: boolean;
  setShow: (isShow: boolean) => void;
}

const ModalContainer = ({ children, isShow, setShow }: IProps) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    isShow &&
    createPortal(
      <div
        className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black/50 z-20'
        onClick={() => {
          setShow(false);
          router.replace(pathName, undefined);
        }}
      >
        {children}
      </div>,
      document.body,
    )
  );
};

export default ModalContainer;
