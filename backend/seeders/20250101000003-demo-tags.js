'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      { name: 'Premium', slug: 'premium', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Best Seller', slug: 'best-seller', createdAt: new Date(), updatedAt: new Date() },
      { name: 'New Arrival', slug: 'new-arrival', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sale', slug: 'sale', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Featured', slug: 'featured', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Wireless', slug: 'wireless', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Portable', slug: 'portable', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Professional', slug: 'professional', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gaming', slug: 'gaming', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Budget', slug: 'budget', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Flagship', slug: 'flagship', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eco-Friendly', slug: 'eco-friendly', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Compact', slug: 'compact', createdAt: new Date(), updatedAt: new Date() },
      { name: 'High-End', slug: 'high-end', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Value', slug: 'value', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
