import BeatLoader from 'react-spinners/FadeLoader';

const Loading = () => {
  console.log('Loading.....');
  return (
    <div className='contentWrap'>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <BeatLoader color='#195091' height={20} width={5} radius={2} margin={2} />
      </div>
    </div>
  );
};

export default Loading;
