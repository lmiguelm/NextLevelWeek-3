import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { useParams } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from 'leaflet';


import mapIcon from '../utils/mapIcon';

import Input from '../components/form/Input';
import ButtonForm from '../components/form/Button';
import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanage.css';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  opening_hours: string,
  open_on_weekends: boolean
  images: Array<{
    url: string,
    id: number
  }>
}

interface OrphanageParams {
  id: string;
}

interface Image {
  url: string;
  id: number;
}

const EditOrphanage = ( ) => {

  const params = useParams<OrphanageParams>();

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [position,  setPosition] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    async function loadOrphanage() {
      const res = await api.get<Orphanage>(`orphanages/${params.id}`);
      setOrphanage(res.data);

      setPosition({latitude: res.data.latitude, longitude: res.data.longitude});

      let imgs: string[] = [];
      res.data.images.forEach((image: Image ) => {
        imgs.push(image.url);
      });
      setPreviewImages(imgs);
    }
    loadOrphanage();
  }, []);


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
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

  function handleMapClick(event: LeafletMouseEvent) {

    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  if(!orphanage) {
    return (
      <p>carregando...</p>
    );
  } else {

    return (
      <div id="page-create-orphanage">
  
        <Sidebar dashboard={false}/>
        
        <main>
          <form onSubmit={handleSubmit} className="create-orphanage-form">
            <fieldset>
              <legend>Dados</legend>
  
              <Map 
                center={[position.latitude, position.longitude]}
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
                value={orphanage.name} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOrphanage({ ...orphanage, name: e.target.value})}
              >
                <label htmlFor="name">Nome</label>
              </Input>
  
              <div className="input-block">
                <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                <textarea id="about" value={orphanage.about} onChange={e => setOrphanage({ ...orphanage, about: e.target.value})} maxLength={300} />
              </div>
  
              <div className="input-block">
                <label htmlFor="images">Fotos</label>
  
                <div className="images-container">
                  {previewImages.map(image => {
                    return (
                      <img key={image} src={image} alt={orphanage.name}/>
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
                <textarea id="instructions" value={orphanage.instructions} onChange={e => setOrphanage({ ...orphanage, instructions: e.target.value})} />
              </div>
              
              <Input
                id="opening_hours" 
                value={orphanage.opening_hours} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOrphanage({ ...orphanage, opening_hours: e.target.value})}
              >
                <label htmlFor="opening_hours">Horário de funcionamento</label>
              </Input>
  
              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>
  
                <div className="button-select">
                  <button type="button" onClick={() => setOrphanage({ ...orphanage, open_on_weekends: true})} className={orphanage.open_on_weekends ? 'active' : ''}>Sim</button>
                  <button type="button" onClick={() => setOrphanage({ ...orphanage, open_on_weekends: true})} className={!orphanage.open_on_weekends ? 'active' : ''} >Não</button>
                </div>
              </div>
            </fieldset>
            
            <ButtonForm text="Confirmar" />
           
          </form>
        </main>
      </div>
    );
  }
}

export default EditOrphanage;