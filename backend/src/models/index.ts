import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import Category from './Category';
import Tag from './Tag';
import ProductImage from './ProductImage';
import HeroSlide from './HeroSlide';
import ProductTag from './ProductTag';

// Define associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Product, { foreignKey: 'userId', as: 'products' });

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Many-to-Many associations
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'productId', otherKey: 'tagId', as: 'tags' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tagId', otherKey: 'productId', as: 'products' });

export {
  sequelize,
  User,
  Product,
  Category,
  Tag,
  ProductImage,
  HeroSlide,
  ProductTag,
};
