import React, { FormEvent, SyntheticEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';

import Sidebar from "../components/Sidebar";
import Input from '../components/form/Input';
import ButtonForm from '../components/form/Button';

import mapIcon from '../utils/mapIcon';
import api from "../services/api";
import { useHistory } from "react-router-dom";
import Button from "../components/form/Button";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position,  setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  

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
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await api.post('orphanages', data);
      alert('Cadastro realizado com sucesso!');
      history.push('/app');
    } catch (e) {
      console.log(e);
    }
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }
    const selectedImagages = Array.from(event.target.files);
    setImages(selectedImagages);

    const selectedImagesPreview = selectedImagages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar logged={false}/>
      
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

            <Input
              id="name" 
              value={name} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            >
              <label htmlFor="name">Nome</label>
            </Input>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" value={about} onChange={e => setAbout(e.target.value)} maxLength={300} />
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
            
            <Input
              id="opening_hours" 
              value={opening_hours} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOpening_hours(e.target.value)}
            >
              <label htmlFor="opening_hours">Horário de funcionamento</label>
            </Input>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" onClick={() => setOpen_on_weekends(true)} className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button type="button" onClick={() => setOpen_on_weekends(false)} className={!open_on_weekends ? 'active' : ''} >Não</button>
              </div>
            </div>
          </fieldset>
          
          <ButtonForm text="Confirmar" />
         
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
