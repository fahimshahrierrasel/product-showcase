import { Request, Response } from 'express';
import { Product, Category, Tag, User } from '../models';
import Joi from 'joi';
import { Op } from 'sequelize';

const productSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  image: Joi.string().required(),
  isActive: Joi.boolean(),
  categoryId: Joi.number().integer().positive().allow(null),
  userId: Joi.number().integer().positive().allow(null),
  tagIds: Joi.array().items(Joi.number().integer().positive()),
  meta_title: Joi.string().allow('', null),
  meta_description: Joi.string().allow('', null),
});

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all products with filters:", req.query);
    const { 
      minPrice, 
      maxPrice, 
      isStockAvailable, 
      sort, 
      category, 
      search,
      featured,
      newArrival,
      bestSeller
    } = req.query;

    const where: any = { isActive: true };

    // Price Filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    // Stock Filter
    if (isStockAvailable === 'true') {
      where.isStockAvailable = true;
    }

    // Search Filter
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    // Feature Flags
    if (featured === 'true') where.isFeatured = true;
    if (newArrival === 'true') where.isNewArrival = true;
    if (bestSeller === 'true') where.isBestSeller = true;

    // Category Filter
    const include: any[] = [
      { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      { model: Tag, as: 'tags' },
    ];

    if (category) {
      include.push({
        model: Category,
        as: 'category',
        where: { slug: category }
      });
    } else {
      include.push({ model: Category, as: 'category' });
    }

    // Sorting
    let order: any[] = [['createdAt', 'DESC']]; // Default: Newest
    if (sort) {
      switch (sort) {
        case 'price_asc':
          order = [['price', 'ASC']];
          break;
        case 'price_desc':
          order = [['price', 'DESC']];
          break;
        case 'name_asc':
          order = [['name', 'ASC']];
          break;
        case 'newest':
          order = [['createdAt', 'DESC']];
          break;
      }
    }

    const products = await Product.findAll({ 
      where,
      include,
      order,
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ 
      where: { id: req.params.id, isActive: true },
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Tag, as: 'tags' },
      ],
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const getAdminProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Tag, as: 'tags' },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { tagIds, ...productData } = req.body;
    const product = await Product.create(productData);

    // Associate tags if provided
    if (tagIds && tagIds.length > 0) {
      await (product as any).setTags(tagIds);
    }

    // Fetch the product with relationships
    const createdProduct = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Tag, as: 'tags' },
      ],
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { tagIds, ...productData } = req.body;
    await product.update(productData);

    // Update tags if provided
    if (tagIds !== undefined) {
      await (product as any).setTags(tagIds);
    }

    // Fetch the product with relationships
    const updatedProduct = await Product.findByPk(product.id, {
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Tag, as: 'tags' },
      ],
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
