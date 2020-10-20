import React,{ ChangeEvent }  from 'react';

import '../../styles/components/form/input.css';

interface InputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input: React.FC<InputProps> = ({ children, id, value, type, onChange }) => {
  return (
    <div className="input-block">
      {children}
      <input id={id} type={type || 'text'} value={value}  onChange={onChange} />
    </div>
  );
}

export default Input;