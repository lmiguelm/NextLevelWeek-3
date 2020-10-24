import React from 'react';
import { Toast } from 'react-bootstrap';

interface ToastProps {
  title: string;
  text: string;
  color: string;
  callback(close: boolean): void;
}

const ToastComponent: React.FC<ToastProps> = ({ title, text, color, callback }) => {

  return (
    <Toast
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: '100%',
        backgroundColor: color,
        color: '#fff',
        fontSize: '15px'
      }}
      animation
      autohide
      delay={3000}
      onClose={() => callback(false)}
    >
      <Toast.Header
        style={{
          backgroundColor: color,
          color: '#fff',
          fontSize: '20px' 
        }}
      >
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
}

export default ToastComponent;