import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

import '../styles/pages/login.css';

import Wallpaper from '../components/Wallpaper';
import BackButton from '../components/BackButton';
import Input from '../components/form/Input';
import ButtonForm from '../components/form/Button';
import Toast from '../components/bootstrap/Toast';

import { useAuth } from '../contexts/auth';
import { validateEmail } from '../utils/email';

export default function Login() {

  const { sign } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showMsgError, setShowMsgError] = useState(false); 
  const [msgError, setMsgError] = useState(''); 
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if(!validateEmail(email) || password.length < 5) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [password, email])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await sign(email, password, remember);
    } catch (err) {
      setMsgError(err);
      setShowMsgError(true);
    } 
  }

  return (
    <div id="page-login">

      <Wallpaper/>
  
      <main>
      
        <BackButton/>

        { showMsgError && (
          <Toast
            color="#FF669D"
            title="Erro!"
            text={msgError}
            callback={callback => setShowMsgError(callback)}
          /> 
        )}
      
        <form onSubmit={handleSubmit} className="login-form">

          <h2 onClick={() => setShowMsgError(true)}>Fazer login</h2>

          <Input
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          >
            <label htmlFor="email">E-mail</label>
          </Input>

          <Input
            id="pass"
            type="password"
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

          <ButtonForm disabled={disableButton} text="Entrar"/>
        </form>     
      </main>
    </div>
  );
}