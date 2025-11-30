# Tokyo Device Hub - Frontend

Next.js frontend for Tokyo Device Hub electronics showcase platform with multi-language support.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Optimization**: React Compiler enabled

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── products/      # Product pages
│   │   │   ├── contact/       # Contact page
│   │   │   └── admin/         # Admin dashboard
│   │   └── api/               # API routes (middleware)
│   ├── components/            # React components
│   │   ├── home/             # Homepage components
│   │   ├── layout/           # Layout components
│   │   ├── products/         # Product components
│   │   └── ui/               # shadcn/ui components
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   └── utils.ts          # Helper functions
│   ├── middleware.ts          # Next.js middleware (i18n)
│   └── i18n.ts               # Internationalization config
├── messages/                  # Translation files
│   ├── en.json               # English translations
│   └── ja.json               # Japanese translations
├── public/                    # Static assets
│   ├── logo.png
│   └── logo-white.png
└── components.json            # shadcn/ui configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with API URL
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌍 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For Docker:
```env
NEXT_PUBLIC_API_URL=http://backend:5000/api
```

## 🌐 Internationalization

The app supports English and Japanese languages using `next-intl`.

### Adding Translations

1. Edit `messages/en.json` for English
2. Edit `messages/ja.json` for Japanese
3. Use in components:

```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

### Language Switching

Users can switch languages via the header dropdown. The locale is stored in the URL path (`/en/...` or `/ja/...`).

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework. Configuration in `tailwind.config.ts`.

### shadcn/ui

Pre-built, accessible components. Add new components:

```bash
pnpm dlx shadcn-ui@latest add button
```

### Custom Styles

Global styles in `src/app/globals.css`.

## 📦 Key Components

### Layout Components

- **Header**: Navigation, language switcher, category menu
- **Footer**: Contact info, social links, company information
- **MobileNav**: Mobile-responsive navigation

### Home Components

- **HeroSection**: Carousel with hero slides
- **CategorySection**: Product categories with counts
- **FeaturedProducts**: Featured product showcase
- **ContactSection**: Contact form and information

### Product Components

- **ProductCard**: Product display card
- **ProductFilters**: Filter and sort products
- **ProductGallery**: Image gallery with thumbnails
- **SpecificationsTable**: Product specifications display

## 🔗 API Integration

API calls are centralized in `src/lib/api.ts`:

```typescript
import { fetchProducts, fetchCategories } from '@/lib/api';

// Fetch products with filters
const products = await fetchProducts({
  category: 'laptops',
  minPrice: 1000,
  maxPrice: 2000
});

// Fetch categories
const categories = await fetchCategories();
```

## 🐳 Docker

The frontend runs in a Docker container. See root `docker-compose.yml`.

```bash
# Build and start
docker-compose up --build frontend

# View logs
docker-compose logs -f frontend
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Tested on mobile, tablet, and desktop

## ⚡ Performance

- React Compiler enabled for automatic optimization
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Static generation where possible

## 🧪 Development Tips

### Hot Reload

Changes to files automatically trigger hot reload in development mode.

### Type Safety

TypeScript provides type checking. Run:

```bash
pnpm type-check
```

### Linting

ESLint is configured. Run:

```bash
pnpm lint
```

## 📝 Notes

- Currency is displayed in Japanese Yen (¥)
- All product images are served from backend
- Categories are fetched dynamically (not translated)
- Admin panel requires authentication
- SEO metadata is configured per page

## 🤝 Contributing

1. Create a new branch for your feature
2. Make changes and test on multiple devices
3. Ensure translations are complete
4. Test both English and Japanese versions
5. Submit pull request

## 👨‍💻 Author

**Fahim Shahrier Rasel**
- Email: fahimshahrier2@gmail.com
