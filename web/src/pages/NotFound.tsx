import React from 'react';
import Lottie from 'react-lottie';

import Gif from '../images/lottie/4047-404-animation.json'

import '../styles/pages/not-found.css';

const NotFound = () => {
  return (
    <div id="not-found-page">
      <Lottie
        options={{
          autoplay: true,
          loop: false,

          animationData: Gif
        }}
        height="500px"
        width="500px"
      />  
      <h1>Página não encontrada.</h1>
    </div>
  );
}

export default NotFound;
