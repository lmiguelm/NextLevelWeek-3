import React from 'react';

import '../styles/components/wallpaper.css';

import logoTipo from '../images/Logotipo.svg';

export default function Wallpaper() {
  return (
    <div className="app-wallpaper">
      <img src={logoTipo} alt="happy"/>

      <div className="text-container">
        <strong>Araraquara</strong>
        <span>São Paulo</span>
      </div>
    </div>
  );
}