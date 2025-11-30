import { Request, Response } from 'express';
import { HeroSlide } from '../models';
import Joi from 'joi';

const heroSlideSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    ctaText: Joi.string().required(),
    ctaLink: Joi.string().required(),
    order: Joi.number().integer().min(0),
    isActive: Joi.boolean(),
});

export const getAllHeroSlides = async (req: Request, res: Response) => {
    try {
        const slides = await HeroSlide.findAll({
            order: [['order', 'ASC']],
        });
        res.json(slides);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hero slides', error });
    }
};

export const getHeroSlideById = async (req: Request, res: Response) => {
    try {
        const slide = await HeroSlide.findByPk(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Hero slide not found' });
        res.json(slide);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hero slide', error });
    }
};

export const createHeroSlide = async (req: Request, res: Response) => {
    try {
        const { error } = heroSlideSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const slide = await HeroSlide.create(req.body);
        res.status(201).json(slide);
    } catch (error) {
        res.status(500).json({ message: 'Error creating hero slide', error });
    }
};

export const updateHeroSlide = async (req: Request, res: Response) => {
    try {
        const { error } = heroSlideSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const slide = await HeroSlide.findByPk(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Hero slide not found' });

        await slide.update(req.body);
        res.json(slide);
    } catch (error) {
        res.status(500).json({ message: 'Error updating hero slide', error });
    }
};

export const deleteHeroSlide = async (req: Request, res: Response) => {
    try {
        const slide = await HeroSlide.findByPk(req.params.id);
        if (!slide) return res.status(404).json({ message: 'Hero slide not found' });

        await slide.destroy();
        res.json({ message: 'Hero slide deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hero slide', error });
    }
};
