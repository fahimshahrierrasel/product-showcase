'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HeroSlides', [
      {
        id: 1,
        title: 'iPhone 15 Pro Max',
        subtitle: 'Titanium. So strong. So light. So Pro.',
        imageUrl: 'https://picsum.photos/seed/a1b2c3_hero/1920/1080.webp',
        ctaText: 'Shop Now',
        ctaLink: '/products/iphone-15-pro-max',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'MacBook Pro M3',
        subtitle: 'Mind-blowing. Head-turning. The most powerful MacBook Pro ever.',
        imageUrl: 'https://picsum.photos/seed/x9y8z7_hero/1920/1080.webp',
        ctaText: 'Learn More',
        ctaLink: '/products/macbook-pro-14-m3',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Samsung Galaxy S24 Ultra',
        subtitle: 'Welcome to the era of mobile AI. Galaxy AI is here.',
        imageUrl: 'https://picsum.photos/seed/q1w2e3_hero/1920/1080.webp',
        ctaText: 'Discover',
        ctaLink: '/products/samsung-galaxy-s24-ultra',
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Sony WH-1000XM5',
        subtitle: 'Industry-leading noise cancellation. Premium sound quality.',
        imageUrl: 'https://picsum.photos/seed/r4t5y6_hero/1920/1080.webp',
        ctaText: 'Experience Audio',
        ctaLink: '/products/sony-wh-1000xm5',
        order: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'PlayStation 5',
        subtitle: 'Play Has No Limits. Experience lightning-fast loading.',
        imageUrl: 'https://picsum.photos/seed/u7i8o9_hero/1920/1080.webp',
        ctaText: 'Start Gaming',
        ctaLink: '/products/playstation-5',
        order: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HeroSlides', null, {});
  }
};
