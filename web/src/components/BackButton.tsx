import React from 'react';

import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../styles/components/backbutton.css';

export default function BackButton() {

  const { goBack } = useHistory();
 
  return (
    <button type="button" onClick={goBack} className="back-button">
          <FiArrowLeft size={24} color="#15b6d6" />
    </button>
  );
}