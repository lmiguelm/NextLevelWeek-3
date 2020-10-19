import React, {useState, useEffect} from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiEdit3, FiTrash } from 'react-icons/fi';

import '../../styles/components/dashboard/orphanages.css';

import mapIcon from '../../utils/mapIcon';

import api from '../../services/api';

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  id: number;
}

const Orphanages = () => {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    async function loadOrphanages() {
      const res = await api.get<Orphanage[]>('orphanages');
      setOrphanages(res.data);
    }
    loadOrphanages();
  }, []);

  return (
    <div id="orphanages-page">
      <div className="text-container">
        <h2>Orfanatos Cadastrados</h2>
        <span>{orphanages.length} Orfanato(s)</span>
      </div>

      <hr/>

      <div className="orphanages-container">
        { orphanages.map(orphanage => {
          return (
            <div key={orphanage.id} className="orphanage">
              <div className="map-container">
                  <Map 
                    center={[orphanage.latitude, orphanage.longitude]} 
                    zoom={16} 
                    style={{ width: '100%', height: 225 }}
                    dragging={false}
                    touchZoom={false}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer 
                      url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                    <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}/>
                  </Map>
              </div>

              <div className="map-footer">
                <span>{orphanage.name}</span>

                <div className="control-panel">
                  <button style={{ marginRight: '10px' }}>
                    <FiEdit3 size={24} color="#15C3D6" />
                  </button>
                  <button>
                    <FiTrash size={24} color="#15C3D6" />
                  </button>
                </div>
              </div>
            </div>
          );
        }) }
      </div>
    </div>
  );
}

export default Orphanages;