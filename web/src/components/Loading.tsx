import React from 'react';
import Lottie from 'react-lottie';

import sun from '../images/lottie/35627-weather-day-clear-sky.json';

import '../styles/components/loading.css';

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div id="loading">
      <Lottie
        options={{ 
          autoplay: true,
          loop: true,
          animationData: sun
        }}
        width="500px"
        height="500px"
      />
      <h2>{text}</h2>
    </div>
  );
}

export default Loading;