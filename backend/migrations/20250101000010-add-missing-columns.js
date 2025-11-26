'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add meta_title to Products
    await queryInterface.addColumn('Products', 'meta_title', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Add meta_description to Products
    await queryInterface.addColumn('Products', 'meta_description', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'meta_title');
    await queryInterface.removeColumn('Products', 'meta_description');
  }
};
