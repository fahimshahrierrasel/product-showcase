import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductTagAttributes {
  productId: number;
  tagId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductTagCreationAttributes extends Optional<ProductTagAttributes, 'createdAt' | 'updatedAt'> {}

class ProductTag extends Model<ProductTagAttributes, ProductTagCreationAttributes> implements ProductTagAttributes {
  public productId!: number;
  public tagId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductTag.init(
  {
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'Products', key: 'id' },
    },
    tagId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'Tags', key: 'id' },
    },
  },
  {
    sequelize,
    tableName: 'ProductTags',
    timestamps: true,
  }
);

export default ProductTag;
