import React from 'react';

import '../../styles/components/form/button.css';

interface ButtonProps {
  text: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, disabled }) => {
  return (
    <button 
      disabled={disabled} 
      className="form-button" 
      type="submit"
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled ? '#8FA7B2' : ''
      }}
    >
      {text}
    </button>
  );
}

export default Button;