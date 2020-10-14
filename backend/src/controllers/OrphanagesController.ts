import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrphanageView from '../views/OrphanagesView';
import * as Yup from 'yup';

import Orphanages from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanages);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        res.json(OrphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const {id} = req.params;
        const orphanagesRepository = getRepository(Orphanages);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        res.json(OrphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
    
        const { 
            name,
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
        } = req.body;
    
        const orphanagesRepository = getRepository(Orphanages);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false
        });
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
       return res.status(201).json(orphanage);
    }
};