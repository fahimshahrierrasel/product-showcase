'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      { id: 1, name: 'Premium', slug: 'premium', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Best Seller', slug: 'best-seller', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'New Arrival', slug: 'new-arrival', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Sale', slug: 'sale', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Featured', slug: 'featured', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Wireless', slug: 'wireless', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Portable', slug: 'portable', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Professional', slug: 'professional', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Gaming', slug: 'gaming', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Budget', slug: 'budget', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Flagship', slug: 'flagship', createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Eco-Friendly', slug: 'eco-friendly', createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Compact', slug: 'compact', createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'High-End', slug: 'high-end', createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Value', slug: 'value', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
