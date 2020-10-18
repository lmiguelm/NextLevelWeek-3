import React, {ChangeEvent, FormEvent, useState} from 'react';

import Wallpaper from '../components/Wallpaper';
import BackButton from '../components/BackButton';
import Input from '../components/form/Input';
import FormButton from '../components/form/Button';


import '../styles/pages/forgot-password.css';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log({email});
  }

  return (
    <div id="forgot-password">

      <Wallpaper/>
      
      <main>
        <BackButton/>

        <div className="text-container">
          <h2>Esqueci a senha</h2>
          <span>Sua redefinição de senha será enviada para o e-mail cadastrado.</span>
        </div>

        <form onSubmit={handleSubmit} className="form-forgot-password">
          <Input
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          >
            <label htmlFor="email">E-mail</label>
          </Input>

          <FormButton text="Enviar"/>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;