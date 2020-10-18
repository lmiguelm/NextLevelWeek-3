import React from 'react';

import '../../styles/pages/feedback/delete-orphanage-success.css';

import BackButton from '../../components/BackButton';

import SuccessImg from '../../images/delete-success.svg';

const DeleteOrphanageSuccess = () => {
  return (
    <div id="delete-orphanage-success">

      <BackButton color="#E4588A"/>

      <div className="text-container">
        <h2>Excluir!</h2>

        <p>
          Você tem certeza que quer
          excluir Orf. Esperança?
        </p>

        <button>
         Confirmar
        </button>
      </div>

      <img src={SuccessImg} alt="Happy-feedback" />
    </div>
  );
}

export default DeleteOrphanageSuccess;