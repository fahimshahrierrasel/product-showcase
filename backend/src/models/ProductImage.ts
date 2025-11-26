import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductImageAttributes {
  id: number;
  productId: number;
  url: string;
  altText?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
  public id!: number;
  public productId!: number;
  public url!: string;
  public altText!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'ProductImages',
  }
);

export default ProductImage;
