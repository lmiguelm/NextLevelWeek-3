import React from 'react';
import Lottie from 'react-lottie';


import checked from '../images/lottie/4973-check-animation.json';

export default function OrphanageChecked() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#CEDEE5',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
       <Lottie
        options={{ 
          autoplay: true,
          loop: false,
          animationData: checked
        }}
        width="500px"
        height="500px"
      />
      <h1 style={{
        fontSize: '32px',
        fontWeight: 700,
        color: '#4D6F80',
        lineHeight: '34px',
      }}>
        Orfanato Aprovado!
      </h1>
    </div>
  );
}