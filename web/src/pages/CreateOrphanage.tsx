import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import InputMask from 'react-input-mask';
import Toast from '../components/bootstrap/Toast';

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';

import Sidebar from "../components/Sidebar";
import ButtonForm from '../components/form/Button';

import mapIcon from '../utils/mapIcon';
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position,  setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [showMsgError, setShowMsgError] = useState(false); 
  const [msgError, setMsgError] = useState(''); 

  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if(name == '' || about == '' || instructions == '' || opening_hours == '' || position.latitude == 0 || position.longitude == 0 || whatsapp == '') {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [name, about, instructions, opening_hours, position, whatsapp]);
  

  function handleMapClick(event: LeafletMouseEvent) {

    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('pending', String(true));
    data.append('whatsapp', String(whatsapp.replace('(', '').replace(')', '').replace('+', '').replace('-', '').replace(' ', '').replace(' ', '')));
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await api.post('orphanages', data);
      history.push('/orphanage-created');
    } catch (err) {
      setMsgError(err.response.data.message);
      setShowMsgError(true);
    }
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }
    const selectedImagages = Array.from(event.target.files);
    setImages([...images, selectedImagages[0]]);

    const selectedImagesPreview = selectedImagages.map(image => {
      return URL.createObjectURL(image);
    })

    let imgs = previewImages;
    imgs.push(selectedImagesPreview[0]);
    setPreviewImages(imgs);
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar dashboard={false}/>

      { showMsgError && (
          <Toast
            color="#FF669D"
            title="Erro!"
            text={msgError}
            callback={callback => setShowMsgError(callback)}
          /> 
        )}
      
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-21.8183303,-48.189625]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} /> }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" value={about} onChange={e => setAbout(e.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="name">WhatsApp</label>
              <InputMask mask="+99 (99) 9999-99999" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  );
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

                <input multiple type="file" id="image[]" onChange={handleSelectImages}/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpening_hours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button" 
                  onClick={() => setOpen_on_weekends(true)} 
                  className={open_on_weekends ? 'active-true' : ''}
                >
                  Sim
                </button>

                <button 
                  type="button" 
                  onClick={() => setOpen_on_weekends(false)} 
                  className={!open_on_weekends ? 'active-false' : ''} 
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <ButtonForm disabled={disableButton} text="Enviar"/>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
