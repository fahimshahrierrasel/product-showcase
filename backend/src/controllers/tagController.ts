import { Request, Response } from 'express';
import { Tag, Product } from '../models';
import Joi from 'joi';

const tagSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
});

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false,
      }],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findOne({ 
      where: { id: req.params.id },
      include: [{
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false,
      }],
    });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tag', error });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const { error } = tagSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag', error });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const { error } = tagSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });

    await tag.update(req.body);
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tag', error });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });

    await tag.destroy();
    res.json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tag', error });
  }
};
