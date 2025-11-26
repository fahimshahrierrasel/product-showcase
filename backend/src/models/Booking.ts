import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BookingAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  category_interest: string;
  message: string;
  productSku?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'productSku' | 'status' | 'createdAt' | 'updatedAt'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public category_interest!: string;
  public message!: string;
  public productSku!: string;
  public status!: 'pending' | 'confirmed' | 'cancelled';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_interest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productSku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'Bookings',
  }
);

export default Booking;
