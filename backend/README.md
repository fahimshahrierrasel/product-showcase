# Tokyo Device Hub - Backend

Express.js backend API for Tokyo Device Hub electronics showcase platform.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL 8.0
- **Authentication**: bcrypt
- **File Upload**: Multer
- **Validation**: Joi (via Sequelize)

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/              # Sequelize model definitions
│   ├── routes/              # API route handlers
│   │   ├── products.ts      # Product CRUD
│   │   ├── categories.ts    # Category management
│   │   ├── tags.ts          # Tag management
│   │   ├── users.ts         # User authentication
│   │   ├── heroSlides.ts    # Hero carousel
│   │   └── bookings.ts      # Booking system
│   ├── middleware/          # Express middleware
│   │   └── upload.ts        # Multer configuration
│   └── server.ts            # Application entry point
├── migrations/              # Database migrations
├── seeders/                 # Database seed data
├── config/
│   └── database.ts          # Sequelize configuration
├── uploads/                 # Uploaded product images
└── dist/                    # Compiled JavaScript
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials
```

### Database Setup

```bash
# Run migrations to create tables
pnpm migrate

# Seed database with sample data
pnpm seed
```

### Development

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌍 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=product_db
DB_DIALECT=mysql
```

For Docker:
```env
DB_HOST=db
```

## 🗄️ Database Management

### Migrations

```bash
# Create a new migration
pnpm migrate:create -- --name add-new-field

# Run all pending migrations
pnpm migrate

# Undo last migration
pnpm migrate:undo

# Undo all migrations
pnpm migrate:undo:all
```

### Seeders

```bash
# Run all seeders
pnpm seed

# Undo all seeders
pnpm seed:undo:all

# Run specific seeder
pnpm dlx sequelize-cli db:seed --seed seeder-filename.js
```

See [MIGRATIONS_README.md](MIGRATIONS_README.md) for detailed documentation.

## 📡 API Endpoints

### Products

- `GET /api/products` - List all products (with filters)
  - Query params: `category`, `minPrice`, `maxPrice`, `search`, `sort`, `isStockAvailable`
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories

- `GET /api/categories` - List all categories with product counts
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Tags

- `GET /api/tags` - List all tags
- `GET /api/tags/:id` - Get tag by ID
- `POST /api/tags` - Create new tag
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Hero Slides

- `GET /api/hero-slides` - List all hero slides
- `POST /api/hero-slides` - Create new slide
- `PUT /api/hero-slides/:id` - Update slide
- `DELETE /api/hero-slides/:id` - Delete slide

### Bookings

- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `DELETE /api/bookings/:id` - Delete booking

## 📦 Database Models

### Product
- `id`, `name`, `description`, `price`, `originalPrice`, `sku`, `categoryId`
- `specifications` (JSON), `isFeatured`, `isNewArrival`, `isBestSeller`, `isStockAvailable`
- Relationships: belongs to Category, has many ProductImages, has many Tags

### Category
- `id`, `name`, `specificationTemplate` (JSON)
- Relationships: has many Products

### Tag
- `id`, `name`
- Relationships: belongs to many Products

### User
- `id`, `name`, `email`, `password` (hashed), `role`

### ProductImage
- `id`, `productId`, `imageUrl`, `altText`, `displayOrder`

### HeroSlide
- `id`, `title`, `subtitle`, `imageUrl`, `linkUrl`, `displayOrder`, `isActive`

### Booking
- `id`, `name`, `email`, `phone`, `productSku`, `preferredDate`, `message`, `status`

## 🔒 Security

- Passwords are hashed using bcrypt
- Input validation on all endpoints
- CORS enabled for frontend origin
- File upload restrictions (images only, size limits)

## 🐳 Docker

The backend runs in a Docker container. See root `docker-compose.yml` for configuration.

```bash
# Build and start
docker-compose up --build backend

# View logs
docker-compose logs -f backend

# Execute commands in container
docker-compose exec backend pnpm migrate
```

## 📝 Notes

- Database schema is managed through migrations only (no `sync()`)
- Uploaded images are stored in `uploads/` directory
- All API responses follow consistent JSON format
- Prices are stored as DECIMAL for accuracy
- SKU is auto-generated for products

## 🤝 Contributing

1. Create a new branch for your feature
2. Make changes and test thoroughly
3. Run migrations if schema changes
4. Update seeders if needed
5. Submit pull request

## 👨‍💻 Author

**Fahim Shahrier Rasel**
- Email: fahimshahrier2@gmail.com
