'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HeroSlides', [
      {
        title: 'iPhone 15 Pro Max',
        subtitle: 'Titanium. So strong. So light. So Pro.',
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=2070',
        ctaText: 'Shop Now',
        ctaLink: '/products/iphone-15-pro-max',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'MacBook Pro M3',
        subtitle: 'Mind-blowing. Head-turning. The most powerful MacBook Pro ever.',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=2069',
        ctaText: 'Learn More',
        ctaLink: '/products/macbook-pro-14-m3',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Samsung Galaxy S24 Ultra',
        subtitle: 'Welcome to the era of mobile AI. Galaxy AI is here.',
        imageUrl: 'https://images.unsplash.com/photo-1610945265078-38584e2690e0?auto=format&fit=crop&q=80&w=2068',
        ctaText: 'Discover',
        ctaLink: '/products/samsung-galaxy-s24-ultra',
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sony WH-1000XM5',
        subtitle: 'Industry-leading noise cancellation. Premium sound quality.',
        imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1976',
        ctaText: 'Experience Audio',
        ctaLink: '/products/sony-wh-1000xm5',
        order: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PlayStation 5',
        subtitle: 'Play Has No Limits. Experience lightning-fast loading.',
        imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=2072',
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
