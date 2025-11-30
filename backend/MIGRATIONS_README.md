# Database Migration & Seeding Guide

## Overview

This project uses **Sequelize CLI** for database migrations and seeders. This approach provides version control for your database schema and makes it easy to populate data across different environments.

---

## Quick Start

### 1. Initial Setup (First Time)

```bash
# Create the database and run all migrations
pnpm migrate

# Populate the database with seed data
pnpm seed
```

### 2. Reset Database (Development)

```bash
# Drop all tables, recreate schema, and seed data
pnpm db:reset
```

---

## Available Commands

### Migrations

| Command | Description |
|---------|-------------|
| `pnpm migrate` | Run all pending migrations |
| `pnpm migrate:undo` | Undo the last migration |
| `pnpm migrate:undo:all` | Undo all migrations (drops all tables) |

### Seeders

| Command | Description |
|---------|-------------|
| `pnpm seed` | Run all seeders |
| `pnpm seed:undo` | Undo the last seeder |
| `pnpm seed:undo:all` | Undo all seeders (removes all data) |

### Combined

| Command | Description |
|---------|-------------|
| `pnpm db:reset` | Complete reset: undo migrations → run migrations → run seeders |

---

## Database Schema

### Tables Created by Migrations

1. **Users** - User accounts with authentication
2. **Categories** - Product categories with specification templates
3. **Tags** - Product tags for filtering
4. **Products** - Main product catalog
5. **ProductImages** - Multiple images per product
6. **ProductTags** - Many-to-many relationship between products and tags
7. **Bookings** - Customer booking requests
8. **HeroSlides** - Homepage carousel slides

---

## Seed Data

The seeders populate the database with:

- **37 products** across 7 categories
- **7 categories** (Laptops, Smartphones, Tablets, Audio, Smartwatches, Cameras, Gaming)
- **15 tags** (Premium, Best Seller, New Arrival, etc.)
- **5 hero slides** for homepage carousel
- **3 users** (1 admin, 2 regular users)
- **20+ product images** with real Unsplash URLs
- **8 sample bookings**

### Admin Credentials

```
Email: admin@example.com
Password: password123
```

---

## Creating New Migrations

```bash
# Generate a new migration file
pnpm dlx sequelize-cli migration:generate --name add-new-field-to-products
```

Edit the generated file in `migrations/` folder:

```javascript
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'newField', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'newField');
  }
};
```

Then run:
```bash
pnpm migrate
```

---

## Creating New Seeders

```bash
# Generate a new seeder file
pnpm dlx sequelize-cli seed:generate --name demo-new-data
```

Edit the generated file in `seeders/` folder:

```javascript
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TableName', [
      { field1: 'value1', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TableName', null, {});
  }
};
```

Then run:
```bash
pnpm seed
```

---

## Production Workflow

### Deployment Steps

1. **Backup Database**
   ```bash
   # Create backup before running migrations
   mysqldump -u user -p product_db > backup.sql
   ```

2. **Run Migrations**
   ```bash
   pnpm migrate
   ```

3. **Optional: Run Seeders** (usually only for staging/demo environments)
   ```bash
   pnpm seed
   ```

### Important Notes

- ⚠️ **Never use `db:reset` in production** - it will delete all data
- ⚠️ **Never use `sync({ force: true })`** - migrations handle schema changes
- ✅ Always test migrations in staging before production
- ✅ Keep migration files in version control
- ✅ Run migrations as part of your CI/CD pipeline

---

## Troubleshooting

### Migration Failed

```bash
# Check migration status
pnpm dlx sequelize-cli db:migrate:status

# Undo the failed migration
pnpm migrate:undo

# Fix the migration file, then run again
pnpm migrate
```

### Database Out of Sync

```bash
# Development: Reset everything
pnpm db:reset

# Production: Never reset, create a new migration to fix
pnpm dlx sequelize-cli migration:generate --name fix-schema-issue
```

### Seeder Failed

```bash
# Undo the failed seeder
pnpm seed:undo

# Fix the seeder file, then run again
pnpm seed
```

---

## Environment Variables

The database connection is configured in `config/config.json` based on `NODE_ENV`:

- **development** - Uses localhost MySQL (default)
- **test** - Uses test database
- **production** - Uses production credentials

---

## File Structure

```
backend/
├── migrations/          # Database schema migrations
│   ├── 20250101000001-create-users.js
│   ├── 20250101000002-create-categories.js
│   └── ...
├── seeders/            # Database seed data
│   ├── 20250101000001-demo-users.js
│   ├── 20250101000002-demo-categories.js
│   └── ...
├── config/
│   └── config.json     # Database configuration
├── .sequelizerc        # Sequelize CLI configuration
└── src/
    └── models/         # Sequelize models
```

---

## Best Practices

1. **Always create migrations for schema changes** - Don't modify the database directly
2. **Name migrations descriptively** - e.g., `add-price-to-products`, `create-reviews-table`
3. **Test rollback** - Make sure your `down()` function works
4. **Keep seeders idempotent** - They should be safe to run multiple times
5. **Use transactions** - For complex migrations that need to be atomic
6. **Version control** - Commit migration files with your code changes

---

## Additional Resources

- [Sequelize Migrations Documentation](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Sequelize CLI Documentation](https://github.com/sequelize/cli)
