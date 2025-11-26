import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface HeroSlideAttributes {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HeroSlideCreationAttributes extends Optional<HeroSlideAttributes, 'id' | 'isActive' | 'createdAt' | 'updatedAt'> {}

class HeroSlide extends Model<HeroSlideAttributes, HeroSlideCreationAttributes> implements HeroSlideAttributes {
  public id!: number;
  public title!: string;
  public subtitle!: string;
  public imageUrl!: string;
  public ctaText!: string;
  public ctaLink!: string;
  public order!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HeroSlide.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ctaText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ctaLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'HeroSlides',
  }
);

export default HeroSlide;
