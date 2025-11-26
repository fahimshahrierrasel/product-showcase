import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  categoryId?: number;
  userId?: number;
  meta_title?: string;
  meta_description?: string;
  sku?: string;
  specifications?: any;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isStockAvailable?: boolean;
  originalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'sku' | 'isFeatured' | 'isNewArrival' | 'isBestSeller' | 'isStockAvailable' | 'originalPrice'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  public isActive!: boolean;
  public categoryId!: number;
  public userId!: number;
  public meta_title!: string;
  public meta_description!: string;
  public sku!: string;
  public specifications!: any;
  public isFeatured!: boolean;
  public isNewArrival!: boolean;
  public isBestSeller!: boolean;
  public isStockAvailable!: boolean;
  public originalPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    meta_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    sku: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    specifications: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isNewArrival: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBestSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isStockAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Products',
    hooks: {
      beforeCreate: async (product: Product) => {
        if (!product.sku) {
          const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
          product.sku = `PROD-${randomPart}`;
        }
      },
    },
  }
);

export default Product;
