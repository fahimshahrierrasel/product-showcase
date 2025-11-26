import { Request, Response } from 'express';
import { Category, Product } from '../models';
import Joi from 'joi';

const categorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().allow('', null),
  isActive: Joi.boolean(),
});

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({ 
      where: { isActive: true },
      attributes: {
        include: [
          [
            Category.sequelize!.literal(`(
              SELECT COUNT(*)
              FROM \`Products\` AS \`product\`
              WHERE
                \`product\`.\`categoryId\` = \`Category\`.\`id\`
                AND \`product\`.\`isActive\` = true
            )`),
            'productCount'
          ]
        ]
      },
      order: [['name', 'ASC']],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({ 
      where: { id: req.params.id, isActive: true },
      include: [{
        model: Product,
        as: 'products',
        where: { isActive: true },
        required: false,
      }],
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
