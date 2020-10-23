import React from 'react';
import { FiArrowLeft, FiPower, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface SidebarProps {
  dashboard: boolean;
  screen?: Function | any;
  signOut?: Function | any;
};

const Sidebar: React.FC<SidebarProps> = ({ dashboard, screen, signOut }) => {

  const { goBack } = useHistory();

  return(
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      { dashboard ? (
        <div className="control-panel">
          <button type="button" style={{ marginBottom: '10px' }} onClick={() => screen(true)}> 
            <FiMapPin size={24} color="#FFF" />
          </button>

          <button type="button" onClick={() => screen(false)} >
            <FiAlertCircle size={24} color="#FFF" />
          </button>
        </div>
      ) : (
        <div>

        </div>
      ) }

      <footer>
          { dashboard ? (
            <button type="button" onClick={() => signOut()}>
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