import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
  isShow: boolean;
  setShow: (isShow: boolean) => void;
}

const ModalContainer = ({ children, isShow, setShow }: IProps) => {
  return (
    isShow &&
    createPortal(
      <div
        className='fixed top-0 left-0 absolute flex justify-center items-center w-full h-full bg-black/50 z-20'
        onClick={() => setShow(false)}
      >
        {children}
      </div>,
      document.body,
    )
  );
};

export default ModalContainer;
