'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Laptops',
        slug: 'laptops',
        description: 'High-performance laptops for work and gaming',
        specificationTemplate: JSON.stringify(['Processor', 'RAM', 'Storage', 'Display', 'Graphics', 'Battery Life']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones with cutting-edge technology',
        specificationTemplate: JSON.stringify(['Processor', 'RAM', 'Storage', 'Display', 'Camera', 'Battery', '5G']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tablets',
        slug: 'tablets',
        description: 'Portable tablets for productivity and entertainment',
        specificationTemplate: JSON.stringify(['Processor', 'Storage', 'Display', 'Battery Life', 'Stylus Support']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Audio',
        slug: 'audio',
        description: 'Premium headphones, earbuds, and speakers',
        specificationTemplate: JSON.stringify(['Type', 'Connectivity', 'Battery Life', 'Noise Cancellation', 'Driver Size']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartwatches',
        slug: 'smartwatches',
        description: 'Wearable technology for health and fitness',
        specificationTemplate: JSON.stringify(['Display', 'Battery Life', 'Sensors', 'Water Resistance', 'GPS']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cameras',
        slug: 'cameras',
        description: 'Professional and consumer cameras',
        specificationTemplate: JSON.stringify(['Sensor', 'Megapixels', 'Video Resolution', 'Lens Mount', 'ISO Range']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gaming',
        slug: 'gaming',
        description: 'Gaming consoles and accessories',
        specificationTemplate: JSON.stringify(['Platform', 'Storage', 'Resolution', 'Frame Rate', 'Controllers']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
