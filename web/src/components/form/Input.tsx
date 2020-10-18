import React from 'react';

import '../../styles/components/form/input.css';

interface InputProps {
  id: string;
  value: string;
  onChange: any;
}

const Input: React.FC<InputProps> = ({ children, id, value, onChange }) => {
  return (
    <div className="input-block">
      {children}
      <input id={id} type="text" value={value}  onChange={onChange} />
    </div>
  );
}

export default Input;