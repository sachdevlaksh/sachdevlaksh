# Design Guidelines: Sonali Ahuja - Landscape Architect Portfolio

## Design Approach
**Reference-Based Approach**: Drawing inspiration from high-end architecture and design portfolios (Behance, Awwwards-featured architecture sites). The design should convey professionalism, sustainability ethos, and creative excellence while maintaining strong visual hierarchy and breathing room.

## Layout System
**Spacing Framework**: Use Tailwind units of 4, 8, 12, 16, 20, and 24 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: gap-8 for grids, gap-4 for tight groupings
- Container: max-w-7xl for full-width sections, max-w-4xl for text-focused content

## Typography Hierarchy
**Font Selection**: Google Fonts - Playfair Display (headings), Inter (body)

- H1 (Hero): text-5xl md:text-7xl, font-bold, Playfair Display
- H2 (Section): text-4xl md:text-5xl, font-semibold, Playfair Display
- H3 (Subsection): text-2xl md:text-3xl, font-semibold, Inter
- Body: text-base md:text-lg, Inter, leading-relaxed
- Small text: text-sm, Inter

## Core Sections & Components

### Hero Section
- Full-width layout with large professional portrait/landscape work image background
- Centered content overlay with name (H1), title "Landscape Architect", and 7 years experience callout
- Dual CTA buttons: "View Projects" (primary), "Contact Me" (secondary) with backdrop-blur-md backgrounds
- Height: min-h-screen with content vertically centered

### About Section
- Two-column layout (lg:grid-cols-2)
- Left: Professional headshot placeholder (rounded-lg, aspect-square)
- Right: Bio paragraph, design philosophy highlighting sustainability, core values list

### Skills Showcase
- Grid layout: grid-cols-2 md:grid-cols-4
- Icon + title + brief description cards
- Categories: Design & Conceptualization, CAD/3D Software, Project Management, Sustainability
- Icons: Use Heroicons (outline style)

### Experience Timeline
- Vertical timeline with left-aligned date markers
- Three positions with company name (H3), role (emphasized), date range, bullet points
- Alternating card layouts for visual interest
- Use border-l-4 for timeline connector

### Projects Gallery
- Masonry-style grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Project cards with large image placeholders, overlay with project type on hover
- 6-9 project placeholder cards with varying aspect ratios (landscape, portrait, square)
- Each card: image, project title, category tag

### Education Section
- Clean card layout with degree, institution, years
- Two cards: Masters and Bachelor degrees
- Include degree icons/emblems

### Contact Section
- Centered layout with H2, supporting text
- Email and phone displayed prominently as clickable links
- Optional: Simple contact form (Name, Email, Message fields) in max-w-2xl container
- Social links placeholder (LinkedIn, Instagram)

## Component Specifications

**Cards**: rounded-xl, shadow-lg on hover, transition-all duration-300
**Buttons**: px-8 py-3, rounded-full, text-base font-semibold
**Input Fields**: rounded-lg, border focus:ring-2, px-4 py-3
**Images**: object-cover, rounded-lg (for portraits/cards)

## Images Strategy

**Required Images**:
1. Hero: Large landscape architecture project or professional working on site (full-width background)
2. About: Professional portrait headshot (square aspect ratio)
3. Project Gallery: 6-9 landscape architecture project images (gardens, urban planning, outdoor spaces)
4. Section dividers: Optional subtle nature-inspired backgrounds

**Image Treatment**: Use subtle overlays (bg-gradient-to-t from-black/50) for text readability on hero images

## Navigation
Sticky header with logo/name left, nav links right (About, Skills, Experience, Projects, Contact)
Mobile: Hamburger menu icon transforming to full-screen overlay navigation

## Animations
- Minimal scroll-triggered fade-ins for sections (intersection observer)
- Smooth transitions on hover states only
- No distracting parallax or heavy animations