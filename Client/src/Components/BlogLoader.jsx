import React from 'react';
import { ThreeDots, Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDots
        visible={true}
        height={80}
        width={80}
        color="#ffff"
        radius={9}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
