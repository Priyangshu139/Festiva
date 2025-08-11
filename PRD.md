# Festiva E-Commerce Platform - Product Requirements Document (PRD)

## 1. Executive Summary
**Product Name:** Festiva  
**Tagline:** "Celebrate Every Festival with Authentic Indian Traditions"  
**Vision:** To become India's premier online destination for festival shopping, offering curated bundles and individual items that preserve and celebrate Indian cultural traditions.

## 2. Product Overview
Festiva is a specialized e-commerce platform focused on Indian festival celebrations, offering both pre-curated festival bundles and individual items. The platform serves customers looking for authentic, convenient, and comprehensive festival shopping experiences.

### 2.1 Key Differentiators
- **Festival-focused curation** with 3-tier pricing (affordable to premium)
- **Bundle customization** with visual quantity indicators
- **Cultural authenticity** with traditional and modern fusion options
- **Celebratory UX** with interactive elements like confetti animations

## 3. User Personas

### 3.1 Primary Personas
1. **Busy Urban Professional** (25-40 years)
   - Limited time for festival shopping
   - Values convenience and quality
   - Price-conscious but willing to pay for convenience

2. **Traditional Family Shopper** (30-50 years)
   - Wants authentic festival items
   - Prefers bundled solutions
   - Values cultural significance over price

3. **Young Festival Enthusiast** (18-30 years)
   - Social media active
   - Loves aesthetic and trendy items
   - Shares festival experiences online

## 4. Core Features & Requirements

### 4.1 Navigation Structure
```
/
├── /festival/[festival-name]/
├── /search/
├── /cart/
├── /orders/
└── /account/
```

### 4.2 Page Specifications

#### 4.2.1 Home Page (/)
**Layout:** Responsive grid with festival-first approach

**Hero Section:**
- **1st Festival Card**: Full-width carousel featuring 3 upcoming festivals
  - Auto-rotating carousel (5-second intervals)
  - Manual navigation dots
  - Each slide: Festival image, name, and brief description
  - Click-through to festival-specific page

**Festival Grid:**
- **2 cards per row** after hero section
- Card components: Image, festival name, short description
- Hover effects with shadow elevation
- Consistent aspect ratio (16:9) for images

**Individual Items Section:**
- **Horizontal line break** with "Shop Individual Items" heading
- **Product cards** displaying:
  - Product image (1:1 aspect ratio)
  - Product name
  - Brief description (2-line max)
  - Star rating (1-5 stars)
  - Price (with strikethrough for discounts)

#### 4.2.2 Festival Pages (/festival/[festival-name])
**Bundle Display:**
- **Minimum 3 bundles per festival** arranged by price (low to high)
- **Bundle cards** containing:
  - Bundle image (showcasing all items)
  - Bundle name and description
  - **"Add to Cart" button** that transforms into counter
  - **Confetti animation** on successful add (using canvas-confetti library)

**Item Display:**
- Items available within the festival context
- Individual add-to-cart functionality
- Clear visual separation from bundles

#### 4.2.3 Search Page (/search)
**Layout:** Filter sidebar + results grid

**Search Functionality:**
- **Real-time search** as user types
- **Filter options:**
  - Festival type
  - Price range
  - Item category
  - Rating
- **Sort options:**
  - Price (low to high, high to low)
  - Rating
  - Newest
  - Best selling

**Results Display:**
- Mixed display of festival cards and individual items
- Clear labeling of "Festival Bundle" vs "Individual Item"
- Pagination or infinite scroll

#### 4.2.4 Cart Page (/cart)
**Visual Hierarchy:**
- **Bundles section** with visual separation (colored borders or background)
- **Individual items section** below bundles

**Bundle Display:**
- **Expandable bundles** showing individual items with counters
- **Item-level quantity adjustment** within bundles
- **Bundle-level removal** option

**Individual Items:**
- Standard cart item display with quantity counter
- Individual removal option

**Checkout Section:**
- **Total amount calculation** (bundles + individual items)
- **"Proceed to Checkout"** button
- **Price breakdown** (subtotal, shipping, total)

#### 4.2.5 Orders Page (/orders)
**Order History Display:**
- **Card-based layout** for each order
- **Information per order:**
  - Item names (bundles and individual items)
  - Order date (formatted: DD MMM YYYY)
  - Total amount
  - Order status (with color coding)
    - Processing (yellow)
    - Shipped (blue)
    - Delivered (green)
    - Cancelled (red)

#### 4.2.6 Account Page (/account)
**User Information:**
- **Mobile number** (editable)
- **Saved addresses** (add/edit/delete)
- **Address format:**
  - Name
  - Phone
  - Street address
  - City
  - State
  - PIN code

### 4.3 Navigation Components

#### 4.3.1 Header/Navbar
**Left Side:**
- **Logo** (SVG format for scalability)
- **Brand name** "Festiva" (custom font or Google Fonts)

**Right Side:**
- **Search icon** → transforms to search bar on click
  - Expandable search input with smooth animation
  - Search suggestions dropdown
- **Order icon** (package/box icon)
- **Cart icon** with item count badge
- **Account icon** (user profile icon)

#### 4.3.2 Footer
**Contact Information:**
- **Instagram** (social media icon)
- **WhatsApp** (click-to-chat link)
- **Phone** (click-to-call)
- **Address** (physical store/office location)

**Additional Links:**
- About Us
- Privacy Policy
- Terms of Service
- Customer Support

## 5. Technical Architecture

### 5.1 Tech Stack
- **Frontend Framework:** Next.js 15.4.6
- **Styling:** Tailwind CSS v4
- **Language:** JavaScript (ES6+)
- **Icons:** @heroicons/react/24/outline
- **Animations:** Framer Motion for micro-interactions
- **State Management:** (choose somenhing appropriate for appwrite as backend which i will put later,avoiding hydration issues)
- **Data:** Static JSON for MVP (no backend)

### 5.2 Component Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Layout.js
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Carousel.js
│   │   └── Counter.js
│   ├── festival/
│   │   ├── FestivalCard.js
│   │   ├── BundleCard.js
│   │   └── ItemCard.js
│   └── cart/
│       ├── CartItem.js
│       └── CartBundle.js
├── pages/
├── data/
│   └── mockData.js
└── styles/
    └── globals.css
```

### 5.3 Responsive Design
- **Mobile-first approach**
- **Breakpoints:**
  - Mobile: 320px - 768px
  - Desktop: 1024px+

## 6. Data Structure (Mock Data)

### 6.1 Festival Data
```javascript
{
  id: "diwali-2024",
  name: "Diwali Celebration Bundle",
  description: "Complete Diwali essentials for a prosperous celebration",
  image: "/images/diwali-hero.jpg",
  upcoming: true,
  date: "2024-11-01",
  bundles: [
    {
      id: "diwali-basic",
      name: "Basic Diwali Pack",
      price: 999,
      items: [
        { name: "Diyas", quantity: 10 },
        { name: "Rangoli Colors", quantity: 5 },
        { name: "Candles", quantity: 6 }
      ]
    }
  ]
}
```

### 6.2 Individual Items
```javascript
{
  id: "decorative-diya",
  name: "Decorative Brass Diya",
  description: "Traditional brass diya with intricate designs",
  price: 299,
  rating: 4.5,
  category: "lighting",
  festival: ["diwali", "karthigai"]
}
```

## 7. User Experience Features

### 7.1 Interactive Elements
- **Confetti animation** on successful cart addition
- **Smooth transitions** between page states
- **Loading states** for better perceived performance
- **Hover effects** on all interactive elements
- **Focus indicators** for accessibility

### 7.2 Performance Optimizations
- **Image optimization** with Next.js Image component
- **Lazy loading** for below-fold content
- **Bundle splitting** for faster initial load
- **Static generation** for festival pages

## 8. MVP Scope Definition

### 8.1 Must-Have Features
- [ ] Home page with festival carousel
- [ ] Festival pages with 3+ bundles each
- [ ] Search functionality
- [ ] Cart with bundle/individual item separation
- [ ] Responsive design for all screen sizes
- [ ] Basic navigation (header/footer)

### 8.2 Nice-to-Have Features (Post-MVP)
- [ ] User authentication
- [ ] Real checkout process
- [ ] Order tracking
- [ ] Wishlist functionality
- [ ] Festival countdown timers
- [ ] Gift wrapping options

## 9. Success Metrics

### 9.1 User Engagement
- **Time on site** > 3 minutes
- **Pages per session** > 2.5
- **Cart abandonment rate** < 60%

### 9.2 Technical Metrics
- **Page load time** < 3 seconds
- **Mobile responsiveness** 100%
- **Lighthouse score** > 90

## 10. Design Guidelines

### 10.1 Color Palette
- **Primary:** Saffron (#FF6B35)
- **Secondary:** Deep Green (#2D5016)
- **Accent:** Gold (#FFD700)
- **Neutral:** Warm grays (#F5F5F5, #E0E0E0)

### 10.2 Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Numbers:** Roboto Mono (monospace)

### 10.3 Iconography
- **Style:** Outlined icons
- **Library:** Heroicons
- **Size:** 20px for UI, 24px for navigation

## 11. Accessibility Requirements
- **WCAG 2.1 AA compliance**
- **Keyboard navigation** for all interactive elements
- **Screen reader support** with proper ARIA labels
- **Color contrast** ratio of at least 4.5:1
- **Focus indicators** on all interactive elements

## 12. Browser Support
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** iOS Safari, Chrome Mobile

---

## Clarifying Questions for Stakeholder Review

### 1. Festival Coverage
**Question:** Which specific Indian festivals should we prioritize for the MVP?  
**Current assumption:** Diwali, Holi, Navratri, Pongal, Onam, Raksha Bandhan
- assumption is correct  idian fstivals 

### 2. Bundle Pricing Strategy
**Question:** What price ranges should we target for the 3-tier bundle system?  
**Current assumption:** 
- Budget: ₹500-1500
- Standard: ₹1500-5000  
- Premium: ₹5000+
-assumption is correct

### 3. Product Categories
**Question:** Beyond traditional items, should we include modern/fusion festival items?  
**Examples:** LED diyas, eco-friendly colors, contemporary decorations
assumption is correct

### 4. Geographic Focus
**Question:** Should we focus on pan-India festivals or include regional celebrations?  
**Current assumption:** Start with pan-India, expand to regional later
assumption is correct

### 5. Payment Simulation
**Question:** For the frontend-only version, how should we handle the checkout process?  

- Mock payment success page and collet user pone no for notifcations

### 6. Image Assets
**Question:** Do you have access to high-quality festival images, or should we use placeholder images initially?  
**Recommendation:** Use Unsplash/pexels for MVP, replace with actual product photos later
-Recommendation is correct

### 7. Bundle Customization
**Question:** Should users be able to customize bundles (swap items), or are they fixed?  
**Current assumption:** Fixed bundles for MVP, customization in future version
fuure version

### 8. Inventory Display
**Question:** Should we show stock availability (e.g., "Only 5 left")?  
**Current assumption:** No inventory tracking for frontend-only version
no inventory not reqd in frontend

### 9. Discount Strategy
**Question:** Should we include promotional pricing or discount codes?  
**Current assumption:** Show original prices only for MVP
-nope

### 10. Mobile App Consideration
**Question:** Is this strictly web-only, or should we consider PWA features?  
**Current assumption:** Responsive web app with PWA capabilities in future
web only
---

**Next Steps:**
1. Review and approve this PRD
2. Answer clarifying questions
3. Create detailed component specifications
4. Begin implementation planning