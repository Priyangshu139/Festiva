# Festiva Component Architecture

## Overview
This document outlines the detailed component architecture for the Festiva e-commerce platform, following atomic design principles with Next.js 15.4.6 and Tailwind CSS v4.

## Component Hierarchy

```
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   ├── molecules/       # Simple component groups
│   ├── organisms/       # Complex component sections
│   ├── templates/       # Page layouts
│   └── utilities/       # Helper components
├── app/
│   ├── layout.js        # Root layout
│   ├── page.js          # Home page
│   ├── globals.css      # Global styles
│   ├── festival/
│   │   └── [slug]/
│   │       └── page.js
│   ├── search/
│   │   └── page.js
│   ├── cart/
│   │   └── page.js
│   ├── orders/
│   │   └── page.js
│   └── account/
│       └── page.js
└── lib/
    ├── data/            # Mock data
    ├── hooks/           # Custom hooks
    └── utils/           # Helper functions
```

## Atomic Component Structure

### 1. Atoms (Basic Elements)

#### 1.1 Button Components
```javascript
// components/atoms/Button.js
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick, 
  disabled = false,
  className = '' 
}) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-50 focus:ring-orange-500",
    ghost: "text-orange-500 hover:bg-orange-50 focus:ring-orange-500"
  };
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

#### 1.2 Typography Components
```javascript
// components/atoms/Typography.js
const Heading = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`;
  const sizes = {
    1: "text-4xl md:text-5xl font-bold",
    2: "text-3xl md:text-4xl font-bold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-semibold",
    5: "text-lg md:text-xl font-medium",
    6: "text-base md:text-lg font-medium"
  };
  
  return <Tag className={`${sizes[level]} ${className}`}>{children}</Tag>;
};

const Text = ({ variant = 'body', children, className = '' }) => {
  const variants = {
    body: "text-base text-gray-700",
    small: "text-sm text-gray-600",
    muted: "text-sm text-gray-500",
    error: "text-sm text-red-600"
  };
  
  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
};
```

#### 1.3 Icon Components
```javascript
// components/atoms/Icon.js
import { 
  ShoppingCart, 
  Search, 
  User, 
  Package,
  Star,
  Heart,
  Minus,
  Plus,
  Trash2
} from 'lucide-react';

const Icon = ({ name, size = 24, className = '', ...props }) => {
  const icons = {
    cart: ShoppingCart,
    search: Search,
    user: User,
    package: Package,
    star: Star,
    heart: Heart,
    minus: Minus,
    plus: Plus,
    trash: Trash2
  };
  
  const IconComponent = icons[name];
  return <IconComponent size={size} className={className} {...props} />;
};
```

#### 1.4 Image Components
```javascript
// components/atoms/Image.js
import NextImage from 'next/image';

const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  fill = false 
}) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      fill={fill}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};
```

### 2. Molecules (Simple Groups)

#### 2.1 Search Bar
```javascript
// components/molecules/SearchBar.js
const SearchBar = ({ onSearch, placeholder = "Search festivals and items..." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className={`relative transition-all duration-300 ${isExpanded ? 'w-64' : 'w-10'}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-0 top-0 p-2 text-gray-600 hover:text-orange-500"
      >
        <Icon name="search" size={20} />
      </button>
      
      {isExpanded && (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch(query)}
          placeholder={placeholder}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          autoFocus
        />
      )}
    </div>
  );
};
```

#### 2.2 Rating Stars
```javascript
// components/molecules/Rating.js
const Rating = ({ rating, totalReviews = 0, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          size={size}
          className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
      {totalReviews > 0 && (
        <span className="text-sm text-gray-600 ml-1">({totalReviews})</span>
      )}
    </div>
  );
};
```

#### 2.3 Quantity Counter
```javascript
// components/molecules/QuantityCounter.js
const QuantityCounter = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  min = 1, 
  max = 99 
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="small"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="p-1"
      >
        <Icon name="minus" size={16} />
      </Button>
      
      <span className="w-8 text-center font-medium">{quantity}</span>
      
      <Button
        variant="outline"
        size="small"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="p-1"
      >
        <Icon name="plus" size={16} />
      </Button>
    </div>
  );
};
```

### 3. Organisms (Complex Components)

#### 3.1 Festival Card
```javascript
// components/organisms/FestivalCard.js
const FestivalCard = ({ 
  festival, 
  size = 'medium',
  onClick 
}) => {
  const isLarge = size === 'large';
  
  return (
    <div 
      className={`group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${isLarge ? 'col-span-full' : ''}`}
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <Image
          src={festival.image}
          alt={festival.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <Heading level={isLarge ? 2 : 3} className="text-white mb-2">
            {festival.name}
          </Heading>
          <Text className="text-white/90 line-clamp-2">
            {festival.description}
          </Text>
        </div>
      </div>
    </div>
  );
};
```

#### 3.2 Bundle Card
```javascript
// components/organisms/BundleCard.js
const BundleCard = ({ bundle, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(bundle, quantity);
    setIsAdded(true);
    // Trigger confetti animation
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="aspect-square mb-4">
        <Image
          src={bundle.image}
          alt={bundle.name}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <Heading level={4} className="mb-2">{bundle.name}</Heading>
      <Text className="mb-4 text-gray-600">{bundle.description}</Text>
      
      <div className="mb-4">
        <Text className="font-semibold mb-2">Bundle includes:</Text>
        <div className="flex flex-wrap gap-2">
          {bundle.items.map((item, index) => (
            <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
              {item.quantity}x {item.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Text className="text-2xl font-bold text-orange-500">₹{bundle.price}</Text>
        
        {!isAdded ? (
          <Button onClick={handleAddToCart} className="flex items-center gap-2">
            <Icon name="cart" size={20} />
            Add to Cart
          </Button>
        ) : (
          <QuantityCounter
            quantity={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          />
        )}
      </div>
    </div>
  );
};
```

#### 3.3 Product Card
```javascript
// components/organisms/ProductCard.js
const ProductCard = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <Heading level={5} className="mb-1">{product.name}</Heading>
        <Text className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </Text>
        
        <div className="mb-3">
          <Rating rating={product.rating} />
        </div>
        
        <div className="flex items-center justify-between">
          <Text className="text-xl font-bold text-orange-500">₹{product.price}</Text>
          
          {!isAdded ? (
            <Button 
              size="small" 
              onClick={() => {
                onAddToCart(product);
                setIsAdded(true);
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <Icon name="check" className="text-green-500" />
          )}
        </div>
      </div>
    </div>
  );
};
```

#### 3.4 Header Navigation
```javascript
// components/organisms/Header.js
const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Festiva</span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <nav className="flex items-center gap-4">
            <SearchBar onSearch={(query) => router.push(`/search?q=${query}`)} />
            
            <Link href="/orders" className="p-2 text-gray-600 hover:text-orange-500">
              <Icon name="package" size={24} />
            </Link>
            
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-500">
              <Icon name="cart" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link href="/account" className="p-2 text-gray-600 hover:text-orange-500">
              <Icon name="user" size={24} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
```

### 4. Templates (Page Layouts)

#### 4.1 Home Page Layout
```javascript
// components/templates/HomeTemplate.js
const HomeTemplate = ({ festivals, products }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Carousel */}
      <section className="mb-8">
        <FestivalCarousel festivals={festivals.filter(f => f.upcoming)} />
      </section>

      {/* Festival Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Heading level={2} className="mb-6">Popular Festivals</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {festivals.map((festival) => (
            <FestivalCard
              key={festival.id}
              festival={festival}
              onClick={() => router.push(`/festival/${festival.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Individual Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="my-12 border-gray-200" />
        <Heading level={2} className="mb-6">Shop Individual Items</Heading>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(product) => addToCart(product)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
```

### 5. Custom Hooks

#### 5.1 Cart Management
```javascript
// lib/hooks/useCart.js
const useCart = () => {
  const [cart, setCart] = useState({
    bundles: [],
    items: []
  });

  const addToCart = (product, type = 'item') => {
    setCart(prevCart => {
      if (type === 'bundle') {
        const existing = prevCart.bundles.find(b => b.id === product.id);
        if (existing) {
          return {
            ...prevCart,
            bundles: prevCart.bundles.map(b =>
              b.id === product.id ? { ...b, quantity: b.quantity + 1 } : b
            )
          };
        }
        return {
          ...prevCart,
          bundles: [...prevCart.bundles, { ...product, quantity: 1 }]
        };
      }
      
      // Handle individual items
      const existing = prevCart.items.find(i => i.id === product.id);
      if (existing) {
        return {
          ...prevCart,
          items: prevCart.items.map(i =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return {
        ...prevCart,
        items: [...prevCart.items, { ...product, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (id, type = 'item') => {
    setCart(prevCart => ({
      ...prevCart,
      [type === 'bundle' ? 'bundles' : 'items']: 
        prevCart[type === 'bundle' ? 'bundles' : 'items'].filter(item => item.id !== id)
    }));
  };

  const updateQuantity = (id, quantity, type = 'item') => {
    if (quantity <= 0) {
      removeFromCart(id, type);
      return;
    }
    
    setCart(prevCart => ({
      ...prevCart,
      [type === 'bundle' ? 'bundles' : 'items']:
        prevCart[type === 'bundle' ? 'bundles' : 'items'].map(item =>
          item.id === id ? { ...item, quantity } : item
        )
    }));
  };

  const getTotalPrice = () => {
    const bundlesTotal = cart.bundles.reduce((sum, b) => sum + (b.price * b.quantity), 0);
    const itemsTotal = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    return bundlesTotal + itemsTotal;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    itemCount: cart.bundles.length + cart.items.length
  };
};
```

### 6. State Management Structure

#### 6.1 Context Providers
```javascript
// lib/contexts/CartContext.js
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useCart();
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
```

### 7. Responsive Design System

#### 7.1 Breakpoints
```css
/* Tailwind config extension */
module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    }
  }
}
```

### 8. Animation System

#### 8.1 Animation Variants
```javascript
// lib/utils/animations.js
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const slideIn = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { duration: 0.2 }
};
```

## Summary
This component architecture provides:
- **Scalable atomic design** with clear separation of concerns
- **Reusable components** with consistent props interfaces
- **Responsive design** built into every component
- **State management** with React Context and custom hooks
- **Performance optimizations** with Next.js best practices
- **Accessibility features** throughout the component system

The architecture supports the full MVP scope while remaining extensible for future features.