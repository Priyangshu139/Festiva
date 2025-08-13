const festivalBundles = [
  {
    name: 'Diwali Delight Bundle',
    description: 'Complete Diwali celebration kit with diyas, candles, and sweets',
    item: ['Brass Diya Set', 'Scented Candles', 'Assorted Mithai', 'Rangoli Colors', 'Decorative Toran'],
    image: [
      'https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1610630875035-f9d7bc2c2aed?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608754482805-6f0a3040a8b2?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=300&h=300&fit=crop'
    ],
    fest: 'diwali',
    price: 1499,
    quantity: [5, 10, 2, 1, 1]
  },
  {
    name: 'Holi Happiness Bundle',
    description: 'Bright colors, sweets, and water guns for a joyful Holi celebration',
    item: ['Organic Gulal', 'Pichkari', 'Gujiya', 'Water Balloons', 'Sunglasses'],
    image: [
      'https://images.unsplash.com/photo-1520701903225-4e6bb0d1c3ee?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1616683696253-e2f1c2e9d9c8?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1607435092772-05c9bfb87d56?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551522435-8b6b2d32d8a7?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1616593998513-ffb6c47eae3c?w=300&h=300&fit=crop'
    ],
    fest: 'holi',
    price: 999,
    quantity: [5, 2, 1, 20, 2]
  },
  {
    name: 'Christmas Cheer Bundle',
    description: 'Decorations, gifts, and treats to make Christmas special',
    item: ['Christmas Tree Decor', 'Santa Hat', 'Plum Cake', 'Gift Wrapping Kit', 'LED Fairy Lights'],
    image: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608889173441-6a4dff9b82d9?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608888801293-8b897c6f1b54?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578323457381-2071a30c3cfd?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1608887895853-cde7c6507b4e?w=300&h=300&fit=crop'
    ],
    fest: 'christmas',
    price: 1899,
    quantity: [10, 5, 2, 1, 3]
  },
  {
    name: 'Eid Essentials Bundle',
    description: 'Traditional Eid celebration pack with sevaiyan, decor, and gifts',
    item: ['Dry Fruits Box', 'Sevaiyan', 'Decorative Lantern', 'Prayer Mat', 'Attar Perfume'],
    image: [
      'https://images.unsplash.com/photo-1588509464639-d54ef6e5df6f?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582620450218-64b5debb8f14?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611588876702-861b2c4d6a4d?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1617303266146-48274c3d8a15?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586245899764-1d4f9b6f8c5a?w=300&h=300&fit=crop'
    ],
    fest: 'eid',
    price: 1299,
    quantity: [2, 5, 2, 1, 1]
  },
  {
    name: 'Pongal Harvest Bundle',
    description: 'Celebrate Pongal with authentic food items and decorations',
    item: ['Sugarcane', 'Turmeric Plant', 'Pongal Pot', 'Kolam Colors', 'Jaggery'],
    image: [
      'https://images.unsplash.com/photo-1611363270560-27c3e9e6a7c1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1599140780371-9dfb8f7eec7f?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605792657660-596af9009f15?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1612761014407-a1e863d90228?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1610347336935-7b7497b5a3b6?w=300&h=300&fit=crop'
    ],
    fest: 'pongal',
    price: 799,
    quantity: [3, 1, 1, 1, 2]
  }
];

const cartContext = {
  phone: '',
  bundle: [],
  item: [],
  total: 0,
  quantity: [],
  distributorIndex: []
};

const account = {
  name: '',
  mobile: '',
  address: []
};

const festivalPages = [
  { id: 'diwali', name: 'Diwali', description: 'Festival of Lights - Celebrate with diyas, rangoli, and sweets', image: 'https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=400&h=300&fit=crop', href: '/festival/diwali' },
  { id: 'holi', name: 'Holi', description: 'Festival of Colors - Enjoy with gulal, water, and music', image: 'https://images.unsplash.com/photo-1520701903225-4e6bb0d1c3ee?w=400&h=300&fit=crop', href: '/festival/holi' },
  { id: 'christmas', name: 'Christmas', description: 'Festival of Joy - Celebrate with decorations, gifts, and cake', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', href: '/festival/christmas' },
  { id: 'eid', name: 'Eid', description: 'Festival of Togetherness - With prayers, feasts, and gifts', image: 'https://images.unsplash.com/photo-1588509464639-d54ef6e5df6f?w=400&h=300&fit=crop', href: '/festival/eid' },
  { id: 'pongal', name: 'Pongal', description: 'Harvest Festival - With traditional food and celebrations', image: 'https://images.unsplash.com/photo-1611363270560-27c3e9e6a7c1?w=400&h=300&fit=crop', href: '/festival/pongal' }
];

const orders = [
  { phone: '9876543210', bundle: ['Complete Diwali Bundle'], item: ['Decorative Brass Diya'], total: 1748, quantity: [1, 1], distributorIndex: [0], address: '123 Main St, Mumbai, India', status: 'Delivered', date: '10 Aug 2025', transactionId: 'TXN1234567890' },
  { phone: '9123456780', bundle: ['Holi Happiness Bundle'], item: ['Organic Gulal'], total: 1049, quantity: [1, 2], distributorIndex: [1], address: '22 Park Road, Delhi, India', status: 'Shipped', date: '12 Aug 2025', transactionId: 'TXN9876543210' },
  { phone: '9988776655', bundle: ['Christmas Cheer Bundle'], item: ['Plum Cake'], total: 1999, quantity: [1, 1], distributorIndex: [2], address: '55 MG Road, Bangalore, India', status: 'Processing', date: '14 Aug 2025', transactionId: 'TXN1122334455' },
  { phone: '9090909090', bundle: ['Eid Essentials Bundle'], item: ['Dry Fruits Box'], total: 1349, quantity: [1, 1], distributorIndex: [3], address: '7 Beach Road, Chennai, India', status: 'Pending', date: '15 Aug 2025', transactionId: 'TXN5566778899' },
  { phone: '8008008008', bundle: ['Pongal Harvest Bundle'], item: ['Jaggery'], total: 849, quantity: [1, 1], distributorIndex: [4], address: '89 River Lane, Hyderabad, India', status: 'Delivered', date: '09 Aug 2025', transactionId: 'TXN6655443322' }
];

const individualItems = [
  { id: 'diya-set-001', name: 'Brass Diya Set', description: 'Traditional brass diya set for Diwali', tags: ['diwali', 'traditional', 'brass'], image: ['https://images.unsplash.com/photo-1603807022287-78de1b3f3a3a?w=300&h=300&fit=crop'], rating: 4.5, distributor: 'Diwali Decor Ltd.', inventory: 100, price: 499 },
  { id: 'gulal-002', name: 'Organic Gulal', description: 'Skin-friendly organic colors for Holi', tags: ['holi', 'colors', 'organic'], image: ['https://images.unsplash.com/photo-1520701903225-4e6bb0d1c3ee?w=300&h=300&fit=crop'], rating: 4.7, distributor: 'Holi Fun Pvt. Ltd.', inventory: 200, price: 50 },
  { id: 'plumcake-003', name: 'Plum Cake', description: 'Rich plum cake with dried fruits and nuts', tags: ['christmas', 'cake', 'dessert'], image: ['https://images.unsplash.com/photo-1608888801293-8b897c6f1b54?w=300&h=300&fit=crop'], rating: 4.8, distributor: 'Sweet Delights Ltd.', inventory: 50, price: 499 },
  { id: 'dryfruits-004', name: 'Dry Fruits Box', description: 'Premium quality dry fruits for gifting', tags: ['eid', 'gifting', 'dryfruits'], image: ['https://images.unsplash.com/photo-1588509464639-d54ef6e5df6f?w=300&h=300&fit=crop'], rating: 4.6, distributor: 'Eid Essentials Traders', inventory: 80, price: 599 },
  { id: 'jaggery-005', name: 'Jaggery', description: 'Organic jaggery for Pongal preparation', tags: ['pongal', 'sweetener', 'organic'], image: ['https://images.unsplash.com/photo-1610347336935-7b7497b5a3b6?w=300&h=300&fit=crop'], rating: 4.4, distributor: 'Pongal Harvest Ltd.', inventory: 120, price: 80 }
];

export { festivalBundles, cartContext, account, festivalPages, orders, individualItems };
