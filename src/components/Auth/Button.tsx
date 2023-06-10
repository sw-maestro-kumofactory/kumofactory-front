'use client';
import Image from 'next/image';

interface IProps {
  onClick: () => void;
  src: string;
  alt: string;
}

const AuthButton = ({ onClick, src, alt }: IProps) => {
  return (
    <div onClick={onClick}>
      <Image
        width='100'
        height='100'
        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default AuthButton;
