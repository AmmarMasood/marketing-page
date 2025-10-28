### Prerequisites

- Node.js 18.18+ or 20.0+
- npm, yarn, or pnpm

### Setup

1. **Install dependencies**

```
npm install
```

2. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_DOTCMS_BASE_URL=https://demo.dotcms.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Run the development server**

```bash
npm run dev
```

## What This Project Does

This is a marketing landing page that fetches and displays dynamic content from dotCMS:

- **Hero Banner**
- **Products Showcase**
- **Events Listing**
- **Blog Feed**
- **Navigation & Footer**

Everything is fully responsive (mobile-first design), accessible (WCAG 2.1 AA), and optimized for performance.

---

## Architectural Choices

Here's what I built and why I made these decisions.

### 1. Component Architecture: A Three-Tier System

I structured the components in three layers:

```
Primitive UI Components (Button, Card, Badge, Container)

Specialized Cards (ProductCard, ContentCard)

Page Sections (Header, Hero, Products, Events, BlogFeed, Footer)
```

**The reasoning:**

At the bottom, I have generic UI primitives like `Button`, `Card`, and `Badge`. These know nothing about the domain—they're just visual building blocks.

In the middle, I have specialized cards like `ProductCard` and `ContentCard`. These understand the data structure (products vs events/blogs) but are still reusable across the application.

At the top, I have section components that orchestrate layout and fetch data. These are page-specific but still composable.

When you need to add a new content type, you can either reuse `ContentCard` or create a specialized card using the same primitives. You don't rewrite the entire component tree.

The `Card` component itself is a composite component built from 7 sub-components (`Card`, `CardImage`, `CardContent`, `CardHeader`, `CardTitle`, `CardDescription`, `Badge`) that compose together. This gives you consistency without rigidity.

### 2. Type-Safe GraphQL Without Client Libraries

I chose to use plain `fetch` with TypeScript instead of Apollo Client or urql.

For this use case, we're making four straightforward queries with no mutations, no subscriptions, and no complex caching requirements. Adding Apollo would require us to over complicate things

Instead, I built a lightweight wrapper around `fetch`:

```typescript
// lib/api/graphql.ts
export async function graphqlRequest<T>(
  options: GraphQLRequestOptions
): Promise<T> {
  const response = await fetch(DOTCMS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables,
    }),
    next: { revalidate: options.revalidate, tags: options.tags }, // Next.js ISR
  });

  const json = await response.json();
  return json.data;
}
```

### 3. ISR Cache Strategy: Balancing Freshness and Performance

Different content types have different update frequencies, so I configured different revalidation intervals:

```typescript
export const CACHE_REVALIDATION = {
  BANNER: 3600, // 1 hour - rarely changes
  PRODUCTS: 1800, // 30 minutes - pricing might change
  EVENTS: 1800, // 30 minutes - dates matter
  BLOGS: 900, // 15 minutes - frequently updated
};
```

**How caching works here:**

1. First request hits the server, renders the page, and caches it
2. Subsequent requests serve the cached page instantly (no database queries)
3. After the revalidation period, the next request triggers a background regeneration
4. The stale page is served while the new page builds
5. Once built, the cache updates with fresh content

Marketing banners rarely change (1 hour is fine), but blog posts are dynamic (15 minutes keeps them fresh without killing the server).

We can also do Webhook-based revalidation. When an editor publishes content in dotCMS, it would hit an API route that immediately purges the relevant cache:

```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { tags } = await request.json();
  revalidateTag(tags); // Instant cache invalidation
  return Response.json({ revalidated: true });
}
```

This gives you both instant updates AND cached performance.

### 4. Image Optimization: Configuration That Matters

Next.js Image is powerful out of the box, but configuration makes a huge difference. I set up:

```typescript
// next.config.ts
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

- **`formats`** - Automatically convert images to modern formats (WebP/AVIF are 30-50% smaller than JPEG)
- **`deviceSizes`** - For layout images (hero banner, full-width sections).
- **`imageSizes`** - For fixed-size images (product cards, thumbnails).

I added a placeholder image (`/images/placeholder-hero.png`) that displays if the CMS image fails to load. The `getImageUrl` helper handles this:

```typescript
export function getImageUrl(path: string | undefined): string {
  if (!path) return "/images/placeholder-hero.png";
  // ... construct dotCMS URL
}
```

This prevents broken images and maintains visual consistency.

### 5. Server Components

Everything is a Server Component except where I explicitly need client-side interactivity (which, for this landing page, is essentially nothing).

### 6. Tailwind v4 with CSS-Based Configuration

I'm using Tailwind v4's new `@theme inline` feature:

```css
:root {
  --primary: #4361ee;
  --secondary: #14447c;
}

@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --font-sans: var(--font-inter);
}
```

- You can use `bg-primary` and `text-secondary` as Tailwind utilities
- No `tailwind.config.js` cluttering the project
- CSS variables and Tailwind utilities work together seamlessly

---

### Known Limitations

1. **Mobile navigation** - The hamburger menu button exists but doesn't open a drawer.

2. **Social media icons** - Only Facebook, Twitter, and Gmail. Would make this configurable from constants or CMS.

3. **Footer links** - Hardcoded in `constants.ts`. In a real project, these would come from the CMS.

4. **No search or filtering** - Products and events aren't searchable. Would add client-side filtering initially, then a proper search API.

---

## What I'd Improve With More Time

### Immediate Priorities

**Mobile navigation drawer**

The button is there, but clicking it doesn't do anything. I'd implement a slide-out drawer using Radix UI's Dialog primitive for built-in accessibility (focus trap, scroll lock, keyboard handling).

**Webhook-based cache invalidation**

Right now, content can be stale for up to an hour. I'd add an API route (`/api/revalidate`) that dotCMS calls when content is published, enabling instant updates while keeping ISR performance.

**Better loading states**

The skeleton screen works but is generic. I'd make it match the actual layout more closely to reduce layout shift.

**Comprehensive error handling**

Add specific error messages and recovery options:

- Network failures → "Check your connection" + retry button
- CMS unavailable → "Service temporarily unavailable" + fallback content
- Invalid data → Log to Sentry, show placeholder content

**Testing**

Currently no tests. I'd add unit test (Jest + React Testing Library) to test each component in isolation.

**Pagination and lazy loading**

Right now it's 3 products, 3 events, 3 blogs. I'd add:

- Client-side pagination with URL params (`?page=2`)
- Or infinite scroll using Intersection Observer

**Search functionality**

Start with client-side filtering (filter products/blogs by keyword), then upgrade to a proper search API with fuzzy matching and filters.

**Analytics and monitoring**

- **Grafana Faro** - Track Core Web Vitals (LCP, FID, CLS)
- **Sentry** - Error tracking and performance monitoring
