import React from 'react';

import '../../styles/components/form/button.css';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="form-button" type="submit">
      {text}
    </button>
  );
}

export default Button;