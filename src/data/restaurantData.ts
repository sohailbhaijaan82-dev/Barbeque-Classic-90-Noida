export interface MenuItem {
  id: string;
  name: string;
  category: 'starters_veg' | 'starters_nonveg' | 'live_counters' | 'main_course' | 'desserts' | 'mocktails';
  description: string;
  isVeg: boolean;
  isChefSpecial?: boolean;
  spicyLevel?: 1 | 2 | 3;
  tags?: string[];
}

export interface DiningOffer {
  id: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  badge: string;
  validity: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: string;
  verified: boolean;
  comment: string;
  highlight: string;
}

export const RESTAURANT_INFO = {
  name: "The Barbeque Classic 90 Noida",
  subName: "The BBQ Cafe & Restro",
  tagline: "Noida's Premier Unlimited Live-Grill & Royal Buffet Destination",
  rating: 4.2,
  reviewCount: "1.3k+",
  location: "TOWER-B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh 201305",
  landmark: "Near Alphathum Central Lake & Sector 137 Metro Station",
  phone: "+91 98714 89090",
  whatsapp: "+919871489090",
  email: "reservations@barbequeclassic90.com",
  timings: {
    lunch: "12:00 PM – 04:00 PM",
    dinner: "07:00 PM – 11:30 PM",
    openStatus: "Open Today · 12:00 PM – 11:30 PM",
  },
  googleMapsUrl: "https://share.google/DxVoeViJaBSnL8Wrq",
  googleSearchUrl: "https://www.google.com/search?kgmid=/g/11swbhlz5q&q=The+Barbeque+Classic+90+Noida",
  priceRange: "₹600 – ₹1,800 per person",
  features: [
    "Unlimited Live On-Table Charcoal Grill",
    "70+ Items Royal Buffet Spread",
    "Live Chef Counters (Pasta, Momos, Chaat)",
    "Live Acoustic & Bollywood Music Nights",
    "Dedicated Veg & Non-Veg Service",
    "Ample Basement Valet Parking at Bhutani Alphathum",
    "Private Dining & Banquet Hall for 150+ Guests",
    "Flat 55% Off Buffet Dining Offers",
  ]
};

export const DINING_OFFERS: DiningOffer[] = [
  {
    id: 'flat55',
    title: 'Flat 55% Off On Buffet',
    discount: '55% OFF',
    code: 'CLASSIC55',
    description: 'Exclusive direct booking offer on both Veg and Non-Veg unlimited buffets for weekday and weekend dining.',
    badge: 'Most Popular',
    validity: 'Valid across Lunch & Dinner'
  },
  {
    id: 'corp10',
    title: 'Alphathum Corporate Perk',
    discount: 'FLAT 60% OFF',
    code: 'CORPNOIDA',
    description: 'Special corporate package for 8+ colleagues. Includes reserved live music lounge area and free welcome mocktails.',
    badge: 'Corporate Delight',
    validity: 'Monday to Friday'
  },
  {
    id: 'bday_cake',
    title: 'Birthday & Anniversary Bash',
    discount: 'FREE CAKE + DECOR',
    code: 'CELEBRATE90',
    description: 'Free gourmet celebration cake, sparkle candle presentation, reserved photo backdrop, and customized table banner.',
    badge: 'Celebrations',
    validity: 'Valid on 4+ Guests'
  },
  {
    id: 'early_lunch',
    title: 'Early Bird Lunch Feast',
    discount: 'EXTRA ₹100 OFF',
    code: 'EARLYBIRD',
    description: 'Check in before 1:15 PM for lunch and enjoy complimentary signature mocktails for your entire table.',
    badge: 'Lunch Special',
    validity: 'Daily 12:00 PM – 01:15 PM'
  }
];

export const BUFFET_PRICING = {
  weekday: {
    veg: { regular: 1399, discounted: 629 },
    nonVeg: { regular: 1599, discounted: 719 },
    kids: { regular: 699, discounted: 315 },
  },
  weekend: {
    veg: { regular: 1499, discounted: 674 },
    nonVeg: { regular: 1699, discounted: 764 },
    kids: { regular: 799, discounted: 359 },
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // Veg Starters
  {
    id: 'v1',
    name: 'Tandoori Malai Paneer Tikka',
    category: 'starters_veg',
    description: 'Fresh farm cottage cheese marinated in hung curd, yellow mustard, and Kashmiri spices, charred over charcoal with bell peppers.',
    isVeg: true,
    isChefSpecial: true,
    spicyLevel: 2,
    tags: ['Live Grill', 'Signature']
  },
  {
    id: 'v2',
    name: 'Crispy Cajun Spiced Baby Corn & Potatoes',
    category: 'starters_veg',
    description: 'Golden fried baby potatoes and crisp American corn tossed in chef’s creamy garlic-herb Cajun mayonnaise dressing.',
    isVeg: true,
    isChefSpecial: true,
    spicyLevel: 1,
    tags: ['Fan Favorite']
  },
  {
    id: 'v3',
    name: 'Char-Grilled Cinnamon Honey Pineapple',
    category: 'starters_veg',
    description: 'Juicy pineapple skewers caramelized on table grates with spiced Ceylon cinnamon, jaggery syrup, and rock salt.',
    isVeg: true,
    spicyLevel: 1,
    tags: ['Sweet & Savory', 'Live Grill']
  },
  {
    id: 'v4',
    name: 'Dahi Ke Sholay & Galouti Kebab',
    category: 'starters_veg',
    description: 'Crisp bread rolls stuffed with spiced spiced hung curd, bell peppers, fresh mint, served with tangy plum chutney.',
    isVeg: true,
    spicyLevel: 2,
    tags: ['Melt in Mouth']
  },
  {
    id: 'v5',
    name: 'Peri-Peri Tandoori Button Mushrooms',
    category: 'starters_veg',
    description: 'Plump button mushrooms marinated in smoky African bird’s eye chilli spice, charred to perfection on the skewers.',
    isVeg: true,
    spicyLevel: 3,
    tags: ['Live Grill']
  },

  // Non-Veg Starters
  {
    id: 'nv1',
    name: 'Peshawari Murgh Malai Tikka',
    category: 'starters_nonveg',
    description: 'Tender boneless chicken morsels infused with cashew paste, cardamom, royal cream, and grilled gently on your table.',
    isVeg: false,
    isChefSpecial: true,
    spicyLevel: 1,
    tags: ['Bestseller', 'Live Grill']
  },
  {
    id: 'nv2',
    name: 'Bhatti Da Murgh (Smoked Tandoori)',
    category: 'starters_nonveg',
    description: 'Classic rustic Punjabi chicken marinated with mustard oil, roasted cumin, and black cardamom, crisp and smoky.',
    isVeg: false,
    isChefSpecial: true,
    spicyLevel: 3,
    tags: ['Fiery', 'Live Grill']
  },
  {
    id: 'nv3',
    name: 'Awadhi Char-Grilled Mutton Seekh Kebab',
    category: 'starters_nonveg',
    description: 'Minced succulent lamb flavored with mint leaves, brown onion paste, royal mace, and hand-pressed onto stainless skewers.',
    isVeg: false,
    spicyLevel: 2,
    tags: ['Royal Recipe', 'Live Grill']
  },
  {
    id: 'nv4',
    name: 'Amritsari Crispy Ajwaini Fish Fry',
    category: 'starters_nonveg',
    description: 'River Sole fillets marinated with carom seeds, ginger garlic, and besan batter, fried crisp and sprinkled with chaat masala.',
    isVeg: false,
    isChefSpecial: true,
    spicyLevel: 2,
    tags: ['Crispy']
  },
  {
    id: 'nv5',
    name: 'Garlic Butter Herb Prawns (Weekend Special)',
    category: 'starters_nonveg',
    description: 'Fresh jumbo prawns marinated in crushed garlic butter, black pepper, and dill leaves, grilled directly over live charcoal.',
    isVeg: false,
    spicyLevel: 1,
    tags: ['Premium Seafood']
  },

  // Live Chef Counters
  {
    id: 'lc1',
    name: 'Artisanal Italian Live Pasta Station',
    category: 'live_counters',
    description: 'Fresh Penne & Fusilli tossed live before you with choice of Alfredo, Arabbiata, or Basil Pesto, with olives, mushrooms & Parmesan.',
    isVeg: true,
    isChefSpecial: true,
    tags: ['Made to Order']
  },
  {
    id: 'lc2',
    name: 'Purani Dilli 6 Live Chaat Counter',
    category: 'live_counters',
    description: 'Crispy Golgappas with 5 flavored waters (Hing, Pudina, Khatta Meetha, Jaljeera, Guava Chilli), Dahi Puri & Papdi Chaat.',
    isVeg: true,
    isChefSpecial: true,
    tags: ['Street Food Magic']
  },
  {
    id: 'lc3',
    name: 'Himalayan Steamed Momos & Dimsums',
    category: 'live_counters',
    description: 'Steaming bamboo baskets serving crystal veg dimsums, corn cheese momos, and juicy minced chicken momos with fiery red dip.',
    isVeg: true,
    tags: ['Live Steamer']
  },
  {
    id: 'lc4',
    name: 'Mongolian Wok Noodles & Sizzling Rice',
    category: 'live_counters',
    description: 'Interactive bowl customization with fresh crunchy vegetables, sprouts, exotic sauces, and wok-tossed in high flame.',
    isVeg: true,
    tags: ['Wok Fresh']
  },

  // Main Course
  {
    id: 'mc1',
    name: 'Dal Makhani Classic 90 (24-Hour Simmer)',
    category: 'main_course',
    description: 'Black urad lentils and kidney beans slow-cooked overnight in tandoor with fresh churned white butter and tomato puree.',
    isVeg: true,
    isChefSpecial: true,
    tags: ['Signature']
  },
  {
    id: 'mc2',
    name: 'Butter Chicken Classic 90',
    category: 'main_course',
    description: 'Tender pulled tandoori chicken simmered in rich satin-smooth tomato, cashew and butter gravy with fragrant kasoori methi.',
    isVeg: false,
    isChefSpecial: true,
    tags: ['Legendary']
  },
  {
    id: 'mc3',
    name: 'Paneer Tikka Lababdar',
    category: 'main_course',
    description: 'Charcoal grilled cottage cheese chunks cooked in rich onion-tomato masala topped with grated cheese and fresh coriander.',
    isVeg: true,
    tags: ['Rich & Creamy']
  },
  {
    id: 'mc4',
    name: 'Hyderabadi Dum Gosht / Subz Biryani',
    category: 'main_course',
    description: 'Long-grain aged basmati rice cooked in sealed handi with saffron, aromatic spices, fried caramelized onions, served with Burrani raita.',
    isVeg: false,
    tags: ['Royal Handi']
  },
  {
    id: 'mc5',
    name: 'Fresh Tandoori Breads Basket',
    category: 'main_course',
    description: 'Unlimited hot garlic naan, butter tandoori roti, laccha paratha, and missi roti baked fresh in traditional clay ovens.',
    isVeg: true,
    tags: ['Served Hot']
  },

  // Desserts
  {
    id: 'd1',
    name: 'Shahi Kesar Pista Matka Kulfi',
    category: 'desserts',
    description: 'Traditional slow-reduced milk kulfi enriched with Kashmiri saffron strands, Iranian pistachios, and falooda noodles.',
    isVeg: true,
    isChefSpecial: true,
    tags: ['Pure Delight']
  },
  {
    id: 'd2',
    name: 'Hot Angoori Gulab Jamun with Rabri',
    category: 'desserts',
    description: 'Soft melt-in-mouth cottage cheese dumplings soaked in rose and cardamom syrup, topped with thick chilled lacchedar rabri.',
    isVeg: true,
    isChefSpecial: true,
    tags: ['Crowd Pleaser']
  },
  {
    id: 'd3',
    name: 'Warm Fudge Brownie with Vanilla Gelato',
    category: 'desserts',
    description: 'Decadent Belgian chocolate brownie served warm with a scoop of vanilla ice cream, toasted walnut praline, and chocolate fountain drizzle.',
    isVeg: true,
    tags: ['Chocolate Lovers']
  },
  {
    id: 'd4',
    name: 'Live Cold Stone Ice Cream Teppanyaki',
    category: 'desserts',
    description: 'Choose your flavors and mix-ins (Oreo, Nutella, Gems, fresh fruits) churned live on a sub-zero chilled stone slab.',
    isVeg: true,
    tags: ['Interactive']
  },

  // Mocktails
  {
    id: 'm1',
    name: 'The Alphathum Sunset Mocktail',
    category: 'mocktails',
    description: 'Layered passion fruit puree, fresh orange juice, pomegranate syrup, mint sprigs, and sparkling fizz.',
    isVeg: true,
    isChefSpecial: true,
    tags: ['Signature Drink']
  },
  {
    id: 'm2',
    name: 'Smoky Masala Kala Khatta Fizz',
    category: 'mocktails',
    description: 'Jamun puree, roasted cumin, black salt, fresh lime juice, and club soda served in a smoked salt-rimmed glass.',
    isVeg: true,
    tags: ['Desi Twist']
  },
  {
    id: 'm3',
    name: 'Refreshing Virgin Mint Mojito',
    category: 'mocktails',
    description: 'Muddled garden fresh mint, lime wheels, cane sugar syrup, crushed ice, and chilled soda.',
    isVeg: true,
    tags: ['Cooler']
  }
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Vikas Sharma (Corporate Lead, Alphathum)',
    rating: 5,
    date: '3 days ago',
    source: 'Google Review',
    verified: true,
    comment: 'Booked a team lunch for 22 people at Barbeque Classic 90 Noida. The 55% discount on the buffet was incredible value for money. Live starters kept coming endlessly to our table grates. Butter chicken and dal makhani tasted like authentic old Delhi style. Outstanding service!',
    highlight: 'Best Corporate Buffet in Sector 90'
  },
  {
    id: 'r2',
    author: 'Priya Mehra',
    rating: 5,
    date: '1 week ago',
    source: 'Zomato Gold Verified',
    verified: true,
    comment: 'The interior ambiance in Tower B Alphathum is breathtaking! Beautiful wooden finishes and cozy neon lighting. The paneer tikka and garlic prawns on the live grill were super fresh. The dessert section with matka kulfi and live cold stone ice cream made our family dinner so memorable.',
    highlight: 'Mesmerizing Live Section Ambiance'
  },
  {
    id: 'r3',
    author: 'Ananya & Rohan Verma',
    rating: 5,
    date: '2 weeks ago',
    source: 'Google Review',
    verified: true,
    comment: 'Celebrated our wedding anniversary here. They organized a complimentary cake, sparkler entry, and decorated our table without extra charges. The live acoustic music singer was singing romantic classics. 10/10 recommendation for date nights and celebrations in Noida!',
    highlight: 'Unbeatable Hospitality & Free Cake Celebration'
  },
  {
    id: 'r4',
    author: 'Dr. Sameer Kapoor',
    rating: 4,
    date: 'Last month',
    source: 'Google Review',
    verified: true,
    comment: 'Extremely courteous staff. The live chaat counter with 5 flavored pani puris and freshly made pasta was a big hit with our kids. Very spacious and clean seating. Convenient basement valet parking at Alphathum.',
    highlight: 'Hygienic & Great for Kids and Family'
  }
];
