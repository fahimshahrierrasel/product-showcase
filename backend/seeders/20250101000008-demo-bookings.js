'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        id: 1,
        productSku: 'LAP-MBP-M3-001',
        customerName: 'John Smith',
        customerEmail: 'john.smith@example.com',
        customerPhone: '+1-555-0101',
        message: 'Interested in the MacBook Pro M3. Would like to know about trade-in options.',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        productSku: 'PHN-SAM-S24U-001',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@example.com',
        customerPhone: '+1-555-0102',
        message: 'Looking to purchase the Galaxy S24 Ultra. Is it available in titanium gray?',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        productSku: 'PHN-APP-IP15P-001',
        customerName: 'Michael Chen',
        customerEmail: 'mchen@example.com',
        customerPhone: '+1-555-0103',
        message: 'Want to book the iPhone 15 Pro Max in natural titanium, 512GB.',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        productSku: 'AUD-SON-WH1000XM5-001',
        customerName: 'Emily Davis',
        customerEmail: 'emily.davis@example.com',
        customerPhone: '+1-555-0104',
        message: 'Interested in the Sony headphones. Can I try them in-store first?',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        productSku: 'TAB-APP-IPADP-001',
        customerName: 'David Wilson',
        customerEmail: 'dwilson@example.com',
        customerPhone: '+1-555-0105',
        message: 'Looking to buy iPad Pro for professional design work. Need advice on storage.',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        productSku: 'GAM-SON-PS5-001',
        customerName: 'Jessica Martinez',
        customerEmail: 'jmartinez@example.com',
        customerPhone: '+1-555-0106',
        message: 'When will the PS5 be back in stock? Want to reserve one.',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        productSku: 'LAP-ASUS-ROG-001',
        customerName: 'Robert Taylor',
        customerEmail: 'rtaylor@example.com',
        customerPhone: '+1-555-0107',
        message: 'Interested in the ASUS ROG Zephyrus for gaming and content creation.',
        status: 'cancelled',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        productSku: 'WAT-APP-AWS9-001',
        customerName: 'Amanda Brown',
        customerEmail: 'abrown@example.com',
        customerPhone: '+1-555-0108',
        message: 'Looking to upgrade from Series 7. What are the main improvements?',
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
