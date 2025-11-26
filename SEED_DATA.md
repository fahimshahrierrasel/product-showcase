# Seed Data Configuration - Electronics Showcase

## Overview

The backend includes a comprehensive seed data system that automatically populates the database with **35 real electronics products** across 8 categories for testing and demonstration.

## Configuration

### Enable/Disable Seed Data

Set the `SEED_DATABASE` environment variable:

**Enable seed data:**
```bash
SEED_DATABASE=true
```

**Disable seed data:**
```bash
SEED_DATABASE=false
```

### Docker Compose

In [docker-compose.yml](file:///d:/Developer/ProductReview/docker-compose.yml), the backend service includes:

```yaml
environment:
  SEED_DATABASE: "true"  # Set to "false" to disable seed data
```

## Seed Data Contents

### Users (2)
- **Admin User**
  - Email: `admin@example.com`
  - Password: `admin123`
  - Role: `admin`

- **Editor User**
  - Email: `editor@example.com`
  - Password: `editor123`
  - Role: `editor`

### Categories (8)

1. **💻 Laptops** - High-performance laptops and notebooks
2. **📱 Smartphones** - Latest smartphones and mobile devices
3. **📱 Tablets** - Tablets and iPad devices
4. **⌚ Wearables** - Smartwatches and fitness trackers
5. **🎧 Audio** - Headphones, earbuds, and speakers
6. **🔌 Accessories** - Chargers, cables, cases, and more
7. **🏠 Smart Home** - Smart home devices and IoT products
8. **🎮 Gaming** - Gaming laptops and accessories

### Tags (10)

1. **New Arrival** - Latest products
2. **Featured** - Highlighted products
3. **Sale** - Discounted items
4. **Best Seller** - Top-selling products
5. **Premium** - High-end luxury products
6. **Budget Friendly** - Affordable options
7. **Apple** - Apple ecosystem products
8. **Android** - Android devices
9. **Wireless** - Wireless connectivity
10. **Fast Charging** - Quick charging support

### Products (35)

#### 💻 Laptops (7 products)

| Product | Price | Tags |
|---------|-------|------|
| MacBook Pro 16" M3 Max | $3,499.99 | Premium, Apple, Featured |
| MacBook Air 15" M2 | $1,299.99 | Apple, Best Seller, New Arrival |
| Dell XPS 15 (2024) | $1,899.99 | Premium, Featured |
| ASUS ROG Zephyrus G14 | $1,799.99 | Best Seller, Premium |
| HP Pavilion 14 | $649.99 | Budget Friendly, Best Seller |
| Lenovo ThinkPad X1 Carbon Gen 11 | $1,599.99 | Premium |
| Microsoft Surface Laptop 5 | $999.99 | New Arrival |

#### 📱 Smartphones (8 products)

| Product | Price | Tags |
|---------|-------|------|
| iPhone 15 Pro Max | $1,199.99 | Premium, Apple, Featured, Best Seller |
| iPhone 15 | $799.99 | Apple, Best Seller, New Arrival |
| Samsung Galaxy S24 Ultra | $1,299.99 | Premium, Android, Featured |
| Google Pixel 8 Pro | $999.99 | Android, Featured |
| Samsung Galaxy A54 5G | $449.99 | Android, Budget Friendly, Best Seller |
| OnePlus 12 | $799.99 | Android, Fast Charging, New Arrival |
| iPhone SE (2024) | $429.99 | Apple, Budget Friendly |
| Xiaomi 14 Pro | $899.99 | Android, Fast Charging, Premium |

#### 📱 Tablets (4 products)

| Product | Price | Tags |
|---------|-------|------|
| iPad Pro 12.9" M2 | $1,099.99 | Premium, Apple, Featured |
| iPad Air 11" M2 | $599.99 | Apple, Best Seller |
| Samsung Galaxy Tab S9 | $799.99 | Android, Premium |
| iPad 10th Gen | $349.99 | Apple, Budget Friendly, Best Seller |

#### ⌚ Wearables (5 products)

| Product | Price | Tags |
|---------|-------|------|
| Apple Watch Series 9 | $429.99 | Apple, Featured, Best Seller |
| Apple Watch SE (2nd Gen) | $249.99 | Apple, Budget Friendly |
| Samsung Galaxy Watch 6 | $329.99 | Android, Featured |
| Garmin Forerunner 965 | $599.99 | Premium |
| Fitbit Charge 6 | $159.99 | Budget Friendly, Best Seller |

#### 🎧 Audio (7 products)

| Product | Price | Tags |
|---------|-------|------|
| AirPods Pro (2nd Gen) | $249.99 | Apple, Premium, Featured, Best Seller |
| AirPods Max | $549.99 | Apple, Premium |
| Sony WH-1000XM5 | $399.99 | Premium, Featured, Best Seller |
| Samsung Galaxy Buds 2 Pro | $229.99 | Android, Wireless |
| Bose QuietComfort Ultra | $429.99 | Premium, Featured |
| JBL Flip 6 | $129.99 | Wireless, Budget Friendly |
| Nothing Ear (2) | $149.99 | Wireless, New Arrival |

#### 🔌 Accessories (4 products)

| Product | Price | Tags |
|---------|-------|------|
| Anker 737 Power Bank (24000mAh) | $149.99 | Fast Charging, Best Seller |
| Apple MagSafe Charger | $39.99 | Apple, Wireless |
| Belkin 3-in-1 Wireless Charger | $149.99 | Apple, Wireless, Premium |
| USB-C Hub 7-in-1 | $49.99 | Budget Friendly, Best Seller |

## Product Details

All products include:
- ✅ Detailed descriptions
- ✅ Realistic pricing
- ✅ SEO meta titles and descriptions
- ✅ Category assignments
- ✅ Multiple tag associations
- ✅ User attribution (Admin or Editor)

## How It Works

1. **Automatic Check**: The seed script checks if users already exist in the database
2. **Skip if Data Exists**: If users are found, seeding is skipped to prevent duplicates
3. **Sequential Creation**: Creates data in order: Users → Categories → Tags → Products
4. **Relationship Assignment**: Products are assigned to categories, users, and tags

## Usage

### First Time Setup

When you run `docker-compose up --build` for the first time with `SEED_DATABASE=true`:

```bash
docker-compose up --build
```

Expected output:
```
Database synced
Starting database seeding...
Seeding users...
✓ Users created
Seeding categories...
✓ Categories created
Seeding tags...
✓ Tags created
Seeding products...
✓ Products created with tags
✅ Database seeding completed successfully!

Default Users:
  Admin: admin@example.com / admin123
  Editor: editor@example.com / editor123

Created: 8 categories, 10 tags, 35 products
Server is running on port 5000
```

### Subsequent Runs

On subsequent runs, if data already exists:
```
Database synced
Database already has data. Skipping seed.
Server is running on port 5000
```

### Reset Database

To reset and re-seed the database:

1. Stop containers:
   ```bash
   docker-compose down
   ```

2. Remove database volume:
   ```bash
   docker-compose down -v
   ```

3. Start fresh:
   ```bash
   docker-compose up --build
   ```

## Testing the Seed Data

### Login as Admin
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Products by Category
```bash
# Get all smartphones
curl http://localhost:5000/api/categories/2

# Get all laptops
curl http://localhost:5000/api/categories/1
```

### Get All Tags
```bash
curl http://localhost:5000/api/tags
```

## File Location

Seed data logic: [seed.ts](file:///d:/Developer/ProductReview/backend/src/config/seed.ts)

## Customization

To customize the seed data, edit `backend/src/config/seed.ts` and modify:
- User credentials
- Category names and descriptions
- Tag names
- Product details, prices, and relationships

## Production Considerations

> [!WARNING]
> **Always set `SEED_DATABASE=false` in production environments** to prevent accidental data population or overwrites.

For production deployments:
```yaml
environment:
  SEED_DATABASE: "false"
```

## Product Images

> [!NOTE]
> The seed data references placeholder image paths (e.g., `/uploads/macbook-pro-16.jpg`). You'll need to:
> 1. Add actual product images to the `backend/src/uploads` directory
> 2. Or update products via the admin panel to upload real images
> 3. Or modify the seed script to use external image URLs
