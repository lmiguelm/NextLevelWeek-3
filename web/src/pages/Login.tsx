import React, {useState, FormEvent, ChangeEvent} from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

import '../styles/pages/login.css';

import Wallpaper from '../components/Wallpaper';
import BackButton from '../components/BackButton';
import Input from '../components/form/Input';
import ButtonForm from '../components/form/Button';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log({
      email,
      password,
      remember
    });
  }

  return (
    <div id="page-login">

      <Wallpaper/>
  
      <main>
        
        <BackButton/>
       
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Fazer login</h2>

          <Input
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          >
            <label htmlFor="email">E-mail</label>
          </Input>

          <Input
            id="pass"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          >
            <label htmlFor="pass">Senha</label>
          </Input>
          
          <div className="footer-form">
            <div className="checkbox-container">
              { remember ? (
                <div className="checkbox active" onClick={() => setRemember(false)}>
                  <FiCheck size={24} color="#fff" />
                </div>
              ) : (
                <div className="checkbox" onClick={() => setRemember(true)}>
                
                </div>
              ) }
              <span>Lembrar me</span>
            </div>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </div>

          <ButtonForm text="Entrar"/>
        </form>     
      </main>
    </div>
  );
}