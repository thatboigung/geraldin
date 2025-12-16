# Yarn & Hook - Crochet E-Commerce Website

## Overview

A handcrafted crochet e-commerce platform built as a full-stack TypeScript application. The site serves as an online storefront for artisan crochet products, featuring product listings, category browsing, a blog section, and artist profile pages. The design emphasizes warmth and handmade authenticity, drawing inspiration from Etsy's aesthetic combined with modern e-commerce patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React useState for local UI state
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite with React plugin

The frontend follows a page-based structure with reusable components. Pages include Home, Shop, Blog, About, and ProductDetail. Components are organized into domain-specific components (ProductCard, CategoryCard, BlogCard) and UI primitives from shadcn/ui.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful JSON API under `/api/*` routes
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

The server handles API routes for products, categories, blog posts, and artist profiles. Static file serving is handled differently in development (Vite middleware) vs production (Express static).

### Data Storage
- **Database**: PostgreSQL (connection via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with output to `./migrations` directory

Database tables include:
- `categories` - Product categories with slugs and product counts
- `products` - Product listings with pricing, descriptions, and category references
- `blogPosts` - Blog content with categories and publishing metadata
- `artistProfile` - Single artist/maker profile information
- `users` - User accounts (prepared for authentication)

### Shared Code
The `shared/` directory contains schema definitions and types used by both frontend and backend, enabling type-safe API contracts through Drizzle-Zod integration.

### Build System
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Common dependencies are bundled into the server build to reduce cold start times

## External Dependencies

### Database
- PostgreSQL database required via `DATABASE_URL` environment variable
- Session storage uses `connect-pg-simple` for PostgreSQL-backed sessions

### UI/Frontend Libraries
- Radix UI primitives for accessible component foundations
- Embla Carousel for product/image carousels
- Lucide React and React Icons for iconography
- React Day Picker for calendar components

### Development Tools
- Drizzle Kit for database migrations (`npm run db:push`)
- TypeScript for type checking
- Replit-specific Vite plugins for development environment integration

### Fonts
- Google Fonts: Architects Daughter, DM Sans, Fira Code, Geist Mono (loaded via CDN in index.html)