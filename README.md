# Tokyo Device Hub

A professional, SEO-optimized electronics product showcase website featuring the latest laptops, smartphones, tablets, smartwatches, audio devices, and accessories. Built with multi-language support (English/Japanese) and modern web technologies.

## 🌟 Features

- **Multi-Language Support**: Full internationalization with English and Japanese languages
- **Product Catalog**: Browse 35+ electronics products across 8 categories
- **Product Details**: SEO-optimized product pages with detailed specifications
- **Admin Dashboard**: Full CRUD operations for products, categories, tags, and users
- **Image Upload**: Upload and manage product images
- **User Authentication**: Secure login system with bcrypt password hashing
- **Categories & Tags**: Organize products with categories and flexible tagging
- **SEO Optimized**: Dynamic meta tags, sitemap.xml, robots.txt, JSON-LD schema
- **Responsive Design**: Mobile-first design with professional UI/UX
- **Currency**: Japanese Yen (¥) pricing

## 📦 Product Categories

- **💻 Laptops** - MacBooks, Windows laptops, gaming laptops
- **📱 Smartphones** - iPhone, Samsung Galaxy, Google Pixel, OnePlus
- **📱 Tablets** - iPad Pro, iPad Air, Samsung Galaxy Tab
- **⌚ Wearables** - Apple Watch, Samsung Galaxy Watch, Garmin, Fitbit
- **🎧 Audio** - AirPods, headphones, TWS earbuds, Bluetooth speakers
- **🔌 Accessories** - Chargers, power banks, cables, hubs, cases
- **🏠 Smart Home** - Smart devices and IoT products
- **🎮 Gaming** - Gaming laptops and accessories

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL
- **Authentication**: bcrypt
- **File Upload**: Multer

### Infrastructure
- **Containerization**: Docker, Docker Compose
- **Database**: MySQL 8.0

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## 🚀 Getting Started

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProductReview
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MySQL Database: port 3306

3. **Access the application**
   - Main site: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Local Development

#### Backend Setup

```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with API URL

# Start development server
npm run dev
```

## 🔐 Admin Credentials

**Default Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

> ⚠️ **Important**: Change the default admin password in production!

## 🗄️ Database Management

### Migrations

```bash
# Create a new migration
cd backend
npm run migrate:create -- --name migration-name

# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all
```

### Seeders

```bash
# Run all seeders
npm run seed

# Undo all seeders
npm run seed:undo:all
```

See [backend/MIGRATIONS_README.md](backend/MIGRATIONS_README.md) for detailed migration documentation.

## 🌍 Environment Variables

### Backend (.env)

```env
PORT=5000
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=product_db
DB_DIALECT=mysql
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
ProductReview/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── server.ts       # Entry point
│   ├── migrations/         # Database migrations
│   ├── seeders/           # Database seeders
│   └── uploads/           # Uploaded images
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities
│   │   └── middleware.ts  # Next.js middleware
│   ├── messages/          # i18n translations
│   └── public/            # Static assets
└── docker-compose.yml     # Docker orchestration
```

## 🔗 API Documentation

The backend provides RESTful APIs for:

- **Products**: CRUD operations, filtering, search
- **Categories**: Category management with product counts
- **Tags**: Tag management
- **Users**: Authentication and user management
- **Hero Slides**: Homepage carousel management
- **Bookings**: Product booking system

See backend README for detailed API endpoints.

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🏗️ Production Deployment

```bash
# Use production docker-compose
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📝 Notes

- The React Compiler is enabled in the Frontend for optimized performance
- Images are served from the Backend `uploads` directory
- Database is automatically seeded with sample data on first run
- All prices are displayed in Japanese Yen (¥)
- Multi-language support with English and Japanese translations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Fahim Shahrier Rasel**
- Email: fahimshahrier2@gmail.com
