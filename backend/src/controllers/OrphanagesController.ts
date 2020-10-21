import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrphanageView from '../views/OrphanagesView';
import * as Yup from 'yup';

import Orphanages from '../models/Orphanage';

interface Data {
    name: string;
    latitude: number; 
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    pending: boolean;
    images: Array<{
        path: string;
    }>;
}

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

    async getPendings(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanages);
        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: { 
                pending: true
            }
        })
        res.json(OrphanageView.renderMany(orphanages));
    },

    async getApproveds(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanages);
        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: { 
                pending: false
            }
        })
        res.json(OrphanageView.renderMany(orphanages));
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
            pending
        } = req.body;
    
        const orphanagesRepository = getRepository(Orphanages);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data: Data = {
            name,
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends: open_on_weekends === 'true' ? true : false,
            images,
            pending: pending === 'true' ? true : false,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            pending: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        const finalData = schema.cast(data);

        await schema.validate(data, {
            abortEarly: false
        });
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
       return res.status(201).json(orphanage);
    },

    async edit(req: Request, res: Response) {

        const { id } = req.params;
        
        const { 
            name,
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends,
            pending
        } = req.body;
    
        const orphanagesRepository = getRepository(Orphanages);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data: Data = {
            name,
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends: open_on_weekends === 'true' ? true : false,
            images,
            pending: pending === 'true' ? true : false,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            pending: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        const finalData = schema.cast(data);

        await schema.validate(data, {
            abortEarly: false
        });

        let orphanage: Data = await orphanagesRepository.findOneOrFail(id);
        orphanage.name = data.name;
        orphanage.about = data.about;
        orphanage.latitude = data.latitude;
        orphanage.longitude = data.longitude;
        orphanage.opening_hours = data.opening_hours;
        orphanage.open_on_weekends = data.open_on_weekends;
        orphanage.pending = data.pending;
        // orphanage.images = data.images;

        await orphanagesRepository.save(orphanage);

       return res.status(200).json(orphanage);
    }
};