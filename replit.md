# Portfolio Website - Lakshay Sachdeva

## Overview

A personal portfolio website for Lakshay Sachdeva, an Applications Tech Lead. The application is a full-stack TypeScript project featuring a React frontend with a modern UI component library, and an Express.js backend with PostgreSQL database support via Drizzle ORM. The site showcases professional experience, skills, certifications, education, and includes a contact form.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS custom properties for theming (dark mode by default)
- **UI Components**: Shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll animations
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with path aliases (@/ for client, @shared/ for shared code)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Data Storage**: In-memory storage class (MemStorage) with interface designed for PostgreSQL migration
- **Database ORM**: Drizzle ORM configured for PostgreSQL (schema in `shared/schema.ts`)
- **Session Management**: connect-pg-simple for session storage (when database is connected)

### Data Flow Pattern
1. Frontend components use custom hooks (`use-portfolio.ts`) that wrap React Query
2. Hooks fetch from REST API endpoints
3. Backend routes delegate to storage interface
4. Storage layer currently uses in-memory data, ready for database migration

### Key Design Decisions

**Shared Schema Approach**
- TypeScript interfaces defined in `shared/schema.ts` are used by both frontend and backend
- Zod schemas provide runtime validation for API inputs
- Enables type safety across the full stack

**Component Structure**
- Reusable UI primitives in `client/src/components/ui/`
- Feature components (ExperienceCard, SkillBadge, etc.) in `client/src/components/`
- Page components in `client/src/pages/`

**Build Process**
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds static assets to `dist/public`, esbuild bundles server to `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations stored in `/migrations` directory
- Schema push command: `npm run db:push`

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **lucide-react**: Icon library
- **Radix UI**: Accessible component primitives (accordion, dialog, dropdown, etc.)

### Backend Libraries
- **express**: Web framework
- **drizzle-orm**: Database ORM
- **connect-pg-simple**: PostgreSQL session store
- **zod**: Request validation

### Development Tools
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Server bundler for production
- **tsx**: TypeScript execution for development
- **drizzle-kit**: Database migration tooling

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner