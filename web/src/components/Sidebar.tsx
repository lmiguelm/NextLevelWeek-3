import React from 'react';
import { FiArrowLeft, FiPower, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface SidebarProps {
  logged: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ logged }) => {

  const { goBack } = useHistory();

  return(
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      { logged ? (
        <div className="control-panel">
          <button type="button" style={{ marginBottom: '10px' }}>
            <FiAlertCircle size={24} color="#FFF" />
          </button>

          <button type="button"> 
            <FiMapPin size={24} color="#FFF" />
          </button>
        </div>
      ) : (
        <div>

        </div>
      ) }

      <footer>
          { logged ? (
            <button type="button" onClick={goBack}>
              <FiPower size={24} color="#FFF" />
            </button>
          ) : (
            <button type="button" onClick={goBack}>
              <FiArrowLeft size={24} color="#FFF" />
            </button>
          ) }
      </footer>
    </aside>
  );
}

export default Sidebar;