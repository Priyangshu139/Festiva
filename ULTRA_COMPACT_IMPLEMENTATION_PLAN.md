# Festiva MVP - 2-Day Implementation Plan

## 🚨 CRITICAL: 48-Hour Sprint

### Day 1 (Today) - Foundation & Core Pages
**Time Allocation**: 8-10 hours

#### Hour 0-1: Project Setup (60 min)
```bash
npx create-next-app@latest festiva --typescript --tailwind --eslint --app --src --import-alias "@/*"
cd festiva
npm install lucide-react
```

#### Hour 1-3: Core Components (120 min)
- **Button** (reusable)
- **Card** (festival/product)
- **Header** (logo + cart icon)
- **Footer** (contact info)

#### Hour 3-6: Home Page (180 min)
- **Hero carousel** (3 festivals)
- **Festival grid** (2 cards/row)
- **Individual items** section
- **Responsive layout**

#### Hour 6-8: Festival Pages (120 min)
- **Dynamic routing** (/festival/[name])
- **Bundle cards** (3 tiers)
- **Add to cart** functionality
- **Confetti animation**

#### Hour 8-10: Cart System (120 min)
- **Cart context** (React Context)
- **Local storage** persistence
- **Cart page** with items
- **Total calculation**

### Day 2 (Tomorrow) - Polish & Launch
**Time Allocation**: 6-8 hours

#### Hour 0-2: Search & Navigation (120 min)
- **Search functionality** (filter by name)
- **Search page** with results
- **Navigation links** working

#### Hour 2-4: Data & Content (120 min)
- **Mock data** for 3 festivals
- **Product images** (Unsplash)
- **Responsive testing**

#### Hour 4-6: Final Polish (120 min)
- **Mobile optimization**
- **Performance fixes**
- **Cross-browser testing**

#### Hour 6-8: Deployment (120 min)
- **Vercel deployment**
- **Final testing**
- **Launch ready**

## 🎯 MVP Scope (Ultra-Minimal)

### Must Have (No Exceptions)
1. **Home page** with 3 festivals
2. **Festival pages** with bundles
3. **Cart functionality**
4. **Mobile responsive**
5. **Working navigation**

### Cut Features (Post-MVP)
- User authentication
- Order history
- Advanced search filters
- Payment processing
- Admin panel

## 📁 Simplified Structure

```
festiva/
├── app/
│   ├── page.tsx (home)
│   ├── festival/[name]/page.tsx
│   ├── cart/page.tsx
│   └── search/page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── context/
│   └── CartContext.tsx
├── data/
│   └── mockData.ts
└── types/
    └── index.ts
```

## 🚀 Quick Start Commands

```bash
# Setup
npx create-next-app@latest festiva --typescript --tailwind --eslint --app --src --import-alias "@/*"
cd festiva
npm install lucide-react

# Development
npm run dev

# Deploy
npm i -g vercel
vercel --prod
```

## 📊 Success Checklist (End of Day 2)

- [ ] Home page loads with 3 festivals
- [ ] Festival pages show bundles
- [ ] Cart adds/removes items
- [ ] Mobile looks good
- [ ] Deployed to Vercel
- [ ] All links work

## 🎨 Design Tokens (Copy-Paste)

```css
/* In globals.css */
:root {
  --primary: #FF6B35;
  --secondary: #2D5016;
  --accent: #FFD700;
  --background: #F5F5F5;
}
```

## 📝 Mock Data Template

```typescript
// 3 festivals, 3 bundles each, 5 individual items
const festivals = [
  {
    id: "diwali",
    name: "Diwali",
    bundles: [{ id: "basic", price: 999, items: ["diyas", "candles"] }],
    items: [{ id: "diya", name: "Decorative Diya", price: 299 }]
  }
];
```

## ⚡ Emergency Backup Plan

If running behind:
1. **Skip search page** - use basic filtering
2. **Skip animations** - focus on functionality
3. **Use text logo** - skip custom branding
4. **Reduce to 2 festivals** - minimum viable

## 🎯 End Goal
A working e-commerce site that:
- Shows festival bundles
- Lets users add to cart
- Works on mobile
- Is live on the internet

**Total Development Time**: 14-18 hours over 2 days