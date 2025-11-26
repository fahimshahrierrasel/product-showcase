'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Additional product images for featured products
    await queryInterface.bulkInsert('ProductImages', [
      // MacBook Pro 14 M3 (Product ID: 1)
      { productId: 1, url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=2069', altText: 'MacBook Pro front view', createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=2070', altText: 'MacBook Pro side view', createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=2070', altText: 'MacBook Pro keyboard', createdAt: new Date(), updatedAt: new Date() },

      // MacBook Pro 16 M3 Max (Product ID: 2)
      { productId: 2, url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=2070', altText: 'MacBook Pro 16 front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=2069', altText: 'MacBook Pro 16 display', createdAt: new Date(), updatedAt: new Date() },

      // Samsung Galaxy S24 Ultra (Product ID: 11)
      { productId: 11, url: 'https://images.unsplash.com/photo-1610945265078-38584e2690e0?auto=format&fit=crop&q=80&w=2068', altText: 'Galaxy S24 Ultra front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=2070', altText: 'Galaxy S24 Ultra back', createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=2080', altText: 'Galaxy S24 Ultra camera', createdAt: new Date(), updatedAt: new Date() },

      // iPhone 15 Pro Max (Product ID: 12)
      { productId: 12, url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=2070', altText: 'iPhone 15 Pro Max front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 12, url: 'https://images.unsplash.com/photo-1695048133364-1f7f2f0b4b5f?auto=format&fit=crop&q=80&w=2070', altText: 'iPhone 15 Pro Max titanium', createdAt: new Date(), updatedAt: new Date() },

      // iPad Pro 12.9 (Product ID: 21)
      { productId: 21, url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=2030', altText: 'iPad Pro front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 21, url: 'https://images.unsplash.com/photo-1585790050230-5dd28404f869?auto=format&fit=crop&q=80&w=2070', altText: 'iPad Pro with Apple Pencil', createdAt: new Date(), updatedAt: new Date() },

      // AirPods Pro (Product ID: 25)
      { productId: 25, url: 'https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?auto=format&fit=crop&q=80&w=2070', altText: 'AirPods Pro case', createdAt: new Date(), updatedAt: new Date() },
      { productId: 25, url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?auto=format&fit=crop&q=80&w=2070', altText: 'AirPods Pro earbuds', createdAt: new Date(), updatedAt: new Date() },

      // Sony WH-1000XM5 (Product ID: 26)
      { productId: 26, url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1976', altText: 'Sony WH-1000XM5 front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 26, url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=2065', altText: 'Sony WH-1000XM5 side', createdAt: new Date(), updatedAt: new Date() },

      // Apple Watch Series 9 (Product ID: 30)
      { productId: 30, url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=2071', altText: 'Apple Watch Series 9', createdAt: new Date(), updatedAt: new Date() },
      { productId: 30, url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=2072', altText: 'Apple Watch display', createdAt: new Date(), updatedAt: new Date() },

      // Sony Alpha a7 IV (Product ID: 33)
      { productId: 33, url: 'https://images.unsplash.com/photo-1606980707986-683d8dc3e0c7?auto=format&fit=crop&q=80&w=2070', altText: 'Sony a7 IV front', createdAt: new Date(), updatedAt: new Date() },
      { productId: 33, url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=2070', altText: 'Sony a7 IV with lens', createdAt: new Date(), updatedAt: new Date() },

      // PlayStation 5 (Product ID: 36)
      { productId: 36, url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=2072', altText: 'PlayStation 5 console', createdAt: new Date(), updatedAt: new Date() },
      { productId: 36, url: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=2127', altText: 'PS5 DualSense controller', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductImages', null, {});
  }
};
