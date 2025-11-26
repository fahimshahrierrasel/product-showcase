'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add isActive to Products
    await queryInterface.addColumn('Products', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });

    // Add isActive to Categories
    await queryInterface.addColumn('Categories', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });

    // Add isActive to Users
    await queryInterface.addColumn('Users', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'isActive');
    await queryInterface.removeColumn('Categories', 'isActive');
    await queryInterface.removeColumn('Users', 'isActive');
  }
};
