import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiPlus, FiX } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from 'leaflet';
import InputMask from 'react-input-mask';

import mapIcon from '../utils/mapIcon';

import Input from '../components/form/Input';
import ButtonForm from '../components/form/Button';
import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanage.css';

import api from '../services/api';
import Loading from '../components/Loading';

interface Orphanage {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekends: boolean;
  whatsapp: string;
  images: Array<{
    url: string;
    id: number;
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

  const history = useHistory();
  const params = useParams<OrphanageParams>();
  const [disableButton, setDisableButton] = useState(false);

  const [orphanage, setOrphanage] = useState<Orphanage>({
    id: 0,
    name: '',
    about: '',
    instructions: '',
    latitude: 0,
    longitude: 0,
    opening_hours: '',
    open_on_weekends: false,
    whatsapp: '',
    images: []
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [position,  setPosition] = useState({latitude: 0, longitude: 0});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrphanage() {
      setLoading(true);

      try { 
        const res = await api.get<Orphanage>(`orphanages/${params.id}`);
        setOrphanage(res.data);

        setPosition({latitude: res.data.latitude, longitude: res.data.longitude});

        let imgs: string[] = [];
        res.data.images.forEach((image: Image ) => {
          imgs.push(image.url);
        });
        setPreviewImages(imgs);
        setLoading(false);
      } catch (err) {
        history.push('/not-found');
      } 
    }
    loadOrphanage();
  }, [params.id]);


  useEffect(() => {
    const {
      name,
      about,
      instructions,
      latitude,
      longitude,
      opening_hours,
      whatsapp,
      images,
    } = orphanage;

    console.log(images.length);

    if(name === '' || about === '' || instructions === '' || opening_hours === '' || latitude === 0 || longitude === 0 || whatsapp === '' || previewImages.length == 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [orphanage, previewImages]);


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

  function handleDeletePreviewImage(image: string) {
    setPreviewImages(
      previewImages.filter(img => {
        return img !== image
      })
    );
  }

  if(loading) {
    return <Loading text="Carregando dados do orfanato ..."/>
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
                <label htmlFor="name">WhatsApp</label>
                <InputMask mask="+99 (99) 9999-99999" value={orphanage.whatsapp} onChange={e => setOrphanage({ ...orphanage, whatsapp: e.target.value})} />
              </div>
  
              <div className="input-block">
                <label htmlFor="images">Fotos</label>
  
                <div className="images-container">
                  {previewImages.map(image => {
                    return (
                      <div key={image}>
                        <span onClick={() => handleDeletePreviewImage(image)}>
                          <FiX size={24} color="#FF669D" />
                        </span>
                        <img src={image} alt={orphanage.name}/>
                      </div>
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
                <button
                  type="button" 
                  onClick={() => setOrphanage({...orphanage, open_on_weekends: true})} 
                  className={orphanage.open_on_weekends ? 'active-true' : ''}
                >
                  Sim
                </button>

                <button 
                  type="button" 
                  onClick={() => setOrphanage({...orphanage, open_on_weekends: false})} 
                  className={!orphanage.open_on_weekends ? 'active-false' : ''} 
                >
                  Não
                </button>
              </div>
              </div>
            </fieldset>
            
            <ButtonForm disabled={disableButton} text="Confirmar" />
           
          </form>
        </main>
      </div>
    );
  }
}

export default EditOrphanage;