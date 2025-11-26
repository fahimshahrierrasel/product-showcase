'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tag associations for products
    // Tag IDs: 1=Premium, 2=Best Seller, 3=New Arrival, 4=Sale, 5=Featured, 6=Wireless, 7=Portable, 8=Professional, 9=Gaming, 10=Budget, 11=Flagship, 12=Eco-Friendly, 13=Compact, 14=High-End, 15=Value
    
    await queryInterface.bulkInsert('ProductTags', [
      // MacBook Pro 14 M3 (Product 1) - Premium, Best Seller, Featured, Professional, High-End
      { productId: 1, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, tagId: 14, createdAt: new Date(), updatedAt: new Date() },

      // MacBook Pro 16 M3 Max (Product 2) - Premium, New Arrival, Featured, Professional, High-End
      { productId: 2, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, tagId: 14, createdAt: new Date(), updatedAt: new Date() },

      // Dell XPS 13 Plus (Product 3) - Featured, Professional, Portable, Compact
      { productId: 3, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 3, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 3, tagId: 7, createdAt: new Date(), updatedAt: new Date() },
      { productId: 3, tagId: 13, createdAt: new Date(), updatedAt: new Date() },

      // Dell XPS 15 (Product 4) - Best Seller, Professional, High-End
      { productId: 4, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 4, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 4, tagId: 14, createdAt: new Date(), updatedAt: new Date() },

      // ASUS ROG Zephyrus G14 (Product 6) - Featured, Best Seller, Gaming, Portable
      { productId: 6, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 6, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 6, tagId: 9, createdAt: new Date(), updatedAt: new Date() },
      { productId: 6, tagId: 7, createdAt: new Date(), updatedAt: new Date() },

      // MSI Creator Z16P (Product 8) - New Arrival, Professional, High-End
      { productId: 8, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 8, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 8, tagId: 14, createdAt: new Date(), updatedAt: new Date() },

      // Acer Swift 3 (Product 9) - Best Seller, Budget, Value, Portable
      { productId: 9, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 9, tagId: 10, createdAt: new Date(), updatedAt: new Date() },
      { productId: 9, tagId: 15, createdAt: new Date(), updatedAt: new Date() },
      { productId: 9, tagId: 7, createdAt: new Date(), updatedAt: new Date() },

      // Samsung Galaxy S24 Ultra (Product 11) - Premium, Best Seller, New Arrival, Featured, Flagship
      { productId: 11, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 11, tagId: 11, createdAt: new Date(), updatedAt: new Date() },

      // iPhone 15 Pro Max (Product 12) - Premium, Best Seller, New Arrival, Featured, Flagship
      { productId: 12, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 12, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 12, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 12, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 12, tagId: 11, createdAt: new Date(), updatedAt: new Date() },

      // Google Pixel 8 Pro (Product 13) - Featured, Flagship
      { productId: 13, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 13, tagId: 11, createdAt: new Date(), updatedAt: new Date() },

      // OnePlus 12 (Product 14) - Best Seller, Value, Flagship
      { productId: 14, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 14, tagId: 15, createdAt: new Date(), updatedAt: new Date() },
      { productId: 14, tagId: 11, createdAt: new Date(), updatedAt: new Date() },

      // Xiaomi 14 Ultra (Product 15) - New Arrival, Professional, Flagship
      { productId: 15, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 15, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 15, tagId: 11, createdAt: new Date(), updatedAt: new Date() },

      // iPhone 15 (Product 16) - Best Seller, Value
      { productId: 16, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 16, tagId: 15, createdAt: new Date(), updatedAt: new Date() },

      // ASUS ROG Phone 8 Pro (Product 20) - Featured, New Arrival, Gaming, Premium
      { productId: 20, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 20, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 20, tagId: 9, createdAt: new Date(), updatedAt: new Date() },
      { productId: 20, tagId: 1, createdAt: new Date(), updatedAt: new Date() },

      // iPad Pro 12.9 M2 (Product 21) - Featured, Best Seller, Premium, Professional
      { productId: 21, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 21, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 21, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 21, tagId: 8, createdAt: new Date(), updatedAt: new Date() },

      // Samsung Galaxy Tab S9 Ultra (Product 22) - Featured, New Arrival, Premium
      { productId: 22, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 22, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 22, tagId: 1, createdAt: new Date(), updatedAt: new Date() },

      // iPad Air M2 (Product 23) - Best Seller, Value, Portable
      { productId: 23, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 23, tagId: 15, createdAt: new Date(), updatedAt: new Date() },
      { productId: 23, tagId: 7, createdAt: new Date(), updatedAt: new Date() },

      // AirPods Pro 2nd Gen (Product 25) - Featured, Best Seller, Premium, Wireless
      { productId: 25, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 25, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 25, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 25, tagId: 6, createdAt: new Date(), updatedAt: new Date() },

      // Sony WH-1000XM5 (Product 26) - Featured, Best Seller, Premium, Wireless
      { productId: 26, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 26, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 26, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 26, tagId: 6, createdAt: new Date(), updatedAt: new Date() },

      // Bose QuietComfort 45 (Product 27) - Best Seller, Premium, Wireless
      { productId: 27, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 27, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { productId: 27, tagId: 6, createdAt: new Date(), updatedAt: new Date() },

      // Apple Watch Series 9 (Product 30) - Featured, Best Seller, Premium
      { productId: 30, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 30, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 30, tagId: 1, createdAt: new Date(), updatedAt: new Date() },

      // Samsung Galaxy Watch 6 Classic (Product 31) - Best Seller, Premium
      { productId: 31, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 31, tagId: 1, createdAt: new Date(), updatedAt: new Date() },

      // Sony Alpha a7 IV (Product 33) - Featured, Best Seller, Professional, High-End
      { productId: 33, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 33, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 33, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 33, tagId: 14, createdAt: new Date(), updatedAt: new Date() },

      // Canon EOS R6 Mark II (Product 34) - Best Seller, Professional, High-End
      { productId: 34, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 34, tagId: 8, createdAt: new Date(), updatedAt: new Date() },
      { productId: 34, tagId: 14, createdAt: new Date(), updatedAt: new Date() },

      // Fujifilm X-T5 (Product 35) - New Arrival, Professional
      { productId: 35, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { productId: 35, tagId: 8, createdAt: new Date(), updatedAt: new Date() },

      // PlayStation 5 (Product 36) - Featured, Best Seller, Gaming
      { productId: 36, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 36, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 36, tagId: 9, createdAt: new Date(), updatedAt: new Date() },

      // Xbox Series X (Product 37) - Featured, Best Seller, Gaming
      { productId: 37, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { productId: 37, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { productId: 37, tagId: 9, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductTags', null, {});
  }
};
