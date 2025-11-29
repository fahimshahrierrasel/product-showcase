'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Additional product images for featured products
    await queryInterface.bulkInsert('ProductImages', [
      // MacBook Pro 14 M3 (Product ID: 1)
      { productId: 1, url: 'https://picsum.photos/seed/a1b2c3_img/800/600.webp', altText: 'MacBook Pro front view', createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, url: 'https://picsum.photos/seed/x9y8z7_img/800/600.webp', altText: 'MacBook Pro side view', createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, url: 'https://picsum.photos/seed/q1w2e3_img/800/600.webp', altText: 'MacBook Pro keyboard', createdAt: new Date(), updatedAt: new Date() },

      // MacBook Pro 16 M3 Max (Product ID: 2)
      { productId: 2, url: 'https://picsum.photos/seed/r4t5y6_img/800/600.webp', altText: 'MacBook Pro 16 front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, url: 'https://picsum.photos/seed/u7i8o9_img/800/600.webp', altText: 'MacBook Pro 16 display', createdAt: new Date(), updatedAt: new Date() },

      // Samsung Galaxy S24 Ultra (Product ID: 11)
      { productId: 11, url: 'https://picsum.photos/seed/z1x2c3_img/800/600.webp', altText: 'Galaxy S24 Ultra front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, url: 'https://picsum.photos/seed/v4b5n6_img/800/600.webp', altText: 'Galaxy S24 Ultra back', createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, url: 'https://picsum.photos/seed/m7n8b9_img/800/600.webp', altText: 'Galaxy S24 Ultra camera', createdAt: new Date(), updatedAt: new Date() },

      // iPhone 15 Pro Max (Product ID: 12)
      { productId: 12, url: 'https://picsum.photos/seed/h1j2k3_img/800/600.webp', altText: 'iPhone 15 Pro Max front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 12, url: 'https://picsum.photos/seed/l4k5j6_img/800/600.webp', altText: 'iPhone 15 Pro Max titanium', createdAt: new Date(), updatedAt: new Date() },

      // iPad Pro 12.9 (Product ID: 21)
      { productId: 21, url: 'https://picsum.photos/seed/g7f8d9_img/800/600.webp', altText: 'iPad Pro front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 21, url: 'https://picsum.photos/seed/s1a2d3_img/800/600.webp', altText: 'iPad Pro with Apple Pencil', createdAt: new Date(), updatedAt: new Date() },

      // AirPods Pro (Product ID: 25)
      { productId: 25, url: 'https://picsum.photos/seed/p9o8i7_img/800/600.webp', altText: 'AirPods Pro case', createdAt: new Date(), updatedAt: new Date() },
      { productId: 25, url: 'https://picsum.photos/seed/f4g5h6_img/800/600.webp', altText: 'AirPods Pro earbuds', createdAt: new Date(), updatedAt: new Date() },

      // Sony WH-1000XM5 (Product ID: 26)
      { productId: 26, url: 'https://picsum.photos/seed/j7k8l9_img/800/600.webp', altText: 'Sony WH-1000XM5 front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 26, url: 'https://picsum.photos/seed/z1x2c3_img2/800/600.webp', altText: 'Sony WH-1000XM5 side', createdAt: new Date(), updatedAt: new Date() },

      // Apple Watch Series 9 (Product ID: 30)
      { productId: 30, url: 'https://picsum.photos/seed/v4b5n6_img2/800/600.webp', altText: 'Apple Watch Series 9', createdAt: new Date(), updatedAt: new Date() },
      { productId: 30, url: 'https://picsum.photos/seed/m7n8b9_img2/800/600.webp', altText: 'Apple Watch display', createdAt: new Date(), updatedAt: new Date() },

      // Sony Alpha a7 IV (Product ID: 33)
      { productId: 33, url: 'https://picsum.photos/seed/h1j2k3_img2/800/600.webp', altText: 'Sony a7 IV front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 33, url: 'https://picsum.photos/seed/l4k5j6_img2/800/600.webp', altText: 'Sony a7 IV with lens', createdAt: new Date(), updatedAt: new Date() },

      // PlayStation 5 (Product ID: 36)
      { productId: 36, url: 'https://picsum.photos/seed/g7f8d9_img2/800/600.webp', altText: 'PlayStation 5 console', createdAt: new Date(), updatedAt: new Date() },
      { productId: 36, url: 'https://picsum.photos/seed/s1a2d3_img2/800/600.webp', altText: 'PS5 DualSense controller', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductImages', null, {});
  }
};
