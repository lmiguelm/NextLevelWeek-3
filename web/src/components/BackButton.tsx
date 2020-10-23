import React from 'react';

import { useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../styles/components/backbutton.css';

interface BackbuttonProps {
  color?: string;
};

const BackButton: React.FC<BackbuttonProps> = ({ color }) => {

  const { goBack } = useHistory();
 
  return (
    <button type="button" onClick={goBack} className="back-button">
          <FiArrowLeft size={24} color={color || '#15b6d6'} />
    </button>
  );
}

export default BackButton;