import React, {useState, FormEvent, ChangeEvent } from 'react';

import Wallpaper from '../components/Wallpaper';
import Input from '../components/form/Input';
import FormButton from '../components/form/Button';

import '../styles/pages/reset-password.css';

const ResetPassword = () => {

  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log({
      newPassword,
      newPassword2
    });
  }

  return (
    <div id="reset-password">

      <Wallpaper/>

      <main>
        <div className="text-container">
          <h2>Redefinição de senha</h2>
          <span>Escolha uma nova senha para você acessar o dashboard do Happy</span>
        </div>

        <form onSubmit={handleSubmit} className="form-reset-password">
          <Input
            id="newPass"
            type="password"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          >
            <label htmlFor="newPass">Nova senha: </label>
          </Input>

          <Input
            id="newPass2"
            value={newPassword2}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword2(e.target.value)}
          >
            <label htmlFor="newPass2">Repetir senha: </label>
          </Input>

          <FormButton text="Enviar"/>
        </form>
      </main>
    </div>
  );
}

export default ResetPassword;