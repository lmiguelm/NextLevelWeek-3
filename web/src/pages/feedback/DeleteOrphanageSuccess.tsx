import React from 'react';

import '../../styles/pages/feedback/delete-orphanage-success.css';

import BackButton from '../../components/BackButton';

import SuccessImg from '../../images/delete-success.svg';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';

interface OrphanageParams {
  id: string;
}

const DeleteOrphanageSuccess = () => {

  const { id } = useParams<OrphanageParams>();
  const history = useHistory();

  async function handleDeteOrphanage() {
    try {
      await api.delete(`orphanage-delete/${id}`);
      history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="delete-orphanage-success">

      <BackButton color="#E4588A"/>

      <div className="text-container">
        <h2>Excluir!</h2>

        <p>
          Você tem certeza que quer
          excluir Orf. Esperança?
        </p>

        <button onClick={handleDeteOrphanage}>
         Confirmar
        </button>
      </div>

      <img src={SuccessImg} alt="Happy-feedback" />
    </div>
  );
}

export default DeleteOrphanageSuccess;