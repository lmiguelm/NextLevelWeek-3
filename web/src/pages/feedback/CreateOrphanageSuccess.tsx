import React from 'react';

import '../../styles/pages/feedback/create-orphanage-success.css';

import SuccessImg from '../../images/create-success.svg';
import { useHistory } from 'react-router-dom';

const CreateOrphanageSuccess = () => {

  const history = useHistory()

  function handleToMapPage() {
    history.push('/app');
  }

  return (
    <div id="create-orphanage-success">

      <div className="text-container">
        <h2>Ebaaa!</h2>

        <p>
          O cadastro deu certo e foi enviado
          ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>

        <button onClick={handleToMapPage}>
          Voltar para o mapa
        </button>
      </div>

      <img src={SuccessImg} alt="Happy-feedback" />
    </div>
  );
}

export default CreateOrphanageSuccess;