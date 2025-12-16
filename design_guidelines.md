# Crochet E-Commerce Website - Design Guidelines

## Design Approach: Reference-Based (Etsy + Modern E-Commerce)

Drawing inspiration from Etsy's warm, handmade aesthetic combined with Shopify's clean product presentation and Airbnb's sophisticated card design. This approach emphasizes tactile, inviting interfaces that showcase handcrafted products while maintaining professional e-commerce functionality.

**Key Principles**: Warmth, handcrafted authenticity, clear product focus, storytelling through visuals

## Typography System

**Font Stack**:
- Primary (Headings): 'Crimson Text' or 'Playfair Display' - serif for warmth and craftsmanship
- Secondary (Body): 'Inter' or 'Work Sans' - clean sans-serif for readability
- Accent (Labels/Tags): 'Poppins' - rounded sans-serif for friendly touch

**Hierarchy**:
- Hero Headlines: text-5xl to text-7xl, font-bold
- Section Titles: text-3xl to text-4xl, font-semibold
- Product Names: text-xl to text-2xl, font-medium
- Body Text: text-base to text-lg, font-normal
- Small Text/Labels: text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24**

**Container Strategy**:
- Full-width sections: w-full with max-w-7xl mx-auto
- Product grids: max-w-6xl
- Blog content: max-w-4xl
- Text-heavy sections: max-w-prose

**Grid Patterns**:
- Products: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Blog posts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Categories: grid-cols-2 md:grid-cols-3 lg:grid-cols-5
- Featured items: grid-cols-1 lg:grid-cols-2

## Component Library

### Navigation
**Header**: Sticky top-0 with py-4 to py-6
- Logo (left), centered navigation links, cart icon + profile (right)
- Category dropdown with product categories
- Search bar integration (expandable on mobile)
- Trust indicator: "Handmade with love" tagline near logo

**Mobile**: Hamburger menu with full-screen overlay navigation

### Hero Section
**Large Hero Image**: Full-width, h-[600px] to h-[700px]
- High-quality lifestyle photo of crochet products in warm home setting
- Overlay with soft gradient (backdrop-blur-sm on CTA container)
- Centered content: Headline + subheadline + primary CTA
- CTA button with backdrop-blur-md and semi-transparent background

### Product Components

**Product Card**:
- Aspect ratio 3:4 for images
- Rounded corners (rounded-lg to rounded-xl)
- Soft shadow (shadow-md) with hover:shadow-xl
- Image fills card top, content padding p-4
- Product name (truncate), price (bold, larger), quick view icon
- Wishlist heart icon (top-right absolute positioned)

**Product Grid Section**:
- Section padding: py-16 to py-24
- Gap between cards: gap-6 to gap-8
- Category filter tabs above grid
- "Load More" button or pagination below

**Individual Product Page**:
- Two-column layout (lg:grid-cols-2)
- Left: Image gallery (main image + 3-4 thumbnails below)
- Right: Product details with structured spacing
  - Product name (text-3xl)
  - Price (text-2xl, font-bold)
  - Description (max-w-prose)
  - Materials/Care instructions (text-sm)
  - Quantity selector + Add to Cart (primary button, w-full)
  - Size/color options if applicable
  - "Made to order" badge if relevant

### Category Section
**Category Cards**: 
- Circular or rounded-2xl image containers
- Category name overlay or below image
- Grid of 5 categories (lg:grid-cols-5, md:grid-cols-3, grid-cols-2)
- Interactive hover: scale-105 transform

### Artist Profile Section
**Two-Column Layout** (lg:grid-cols-5):
- Left (col-span-2): Large portrait photo (rounded-2xl or rounded-full for warmth)
- Right (col-span-3): Artist story, background, inspiration
- Section padding: py-20 to py-32
- Include social media links, "Follow the journey" CTA

### Blog Section

**Blog Grid**:
- Featured post: Full-width card with large image (first post)
- Standard posts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card structure: Image (aspect-ratio-16/9), category tag, title, excerpt, read time, author

**Blog Post Page**:
- Hero image (full-width, h-[400px])
- max-w-3xl content container
- Typography: Generous line-height (leading-relaxed), larger text-lg body
- Related posts section at bottom

### Shopping Cart

**Cart Sidebar**: Fixed right-side drawer (slide-in animation)
- Cart items list with thumbnail, name, price, quantity controls
- Subtotal, shipping estimate
- Checkout button (w-full, primary style)
- Continue shopping link

**Cart Page**: Full-page layout with item details table + order summary card

### Footer
**Three-Column Layout** (lg:grid-cols-4):
- Col 1: Brand story snippet + social links
- Col 2: Shop categories quick links
- Col 3: Customer service links (About, Contact, Shipping, Returns)
- Col 4: Newsletter signup ("Crochet tips & updates")
- Bottom bar: Copyright, payment icons, trust badges

**Footer Padding**: pt-16 pb-8, generous spacing

## Interactive Elements

**Buttons**:
- Primary: Rounded-lg, px-6 to px-8, py-3 to py-4, font-medium
- Secondary: Outlined variant with border-2
- Icon buttons: Circular, p-3
- CTA buttons on images: backdrop-blur-md with semi-transparent background

**Form Inputs**:
- Rounded-lg borders, px-4 py-3
- Focus states with ring-2
- Labels above inputs (text-sm, font-medium)
- Error states with border treatment

**Cards & Containers**:
- Consistent rounded-lg to rounded-xl corners
- Shadow elevation: shadow-sm (default), shadow-lg (elevated)
- Padding: p-4 to p-6 for cards, p-8 for larger containers

## Images Strategy

**Hero Section**: 
- Large lifestyle image showing cozy home setting with crochet blankets/products
- Warm, inviting photography with natural lighting
- Dimensions: 1920x1000px minimum

**Product Images**:
- Clean, well-lit product photography
- Lifestyle shots showing products in use
- Detail shots of stitching/texture
- Consistent backgrounds (soft neutral or lifestyle settings)

**Category Images**:
- Representative product from each category
- Square format for consistency
- Dimensions: 600x600px

**Blog Images**:
- Tutorial step-by-step photos
- Finished project showcases
- Process/behind-the-scenes shots
- Dimensions: 1200x675px (16:9)

**Artist Profile**:
- Professional portrait in workspace
- Action shots (crocheting)
- Studio/workspace photos
- Dimensions: 800x1000px (portrait)

## Icons
**Library**: Heroicons via CDN (outline style for navigation, solid for emphasis)
- Shopping cart, user profile, search, heart (wishlist)
- Category icons, social media icons
- Checkmarks, info icons, arrow indicators

## Accessibility
- Minimum touch targets: 44x44px (tap-friendly on mobile)
- Form labels always visible
- Alt text for all product images
- Focus indicators on interactive elements
- Sufficient contrast ratios throughout