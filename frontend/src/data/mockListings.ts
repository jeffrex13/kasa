export interface Property {
  id: string;
  title: string;
  location: string;
  university: string;
  price: number;
  rating: number;
  type: string;
  gender: string;
  image: string;
  landlord: string;
  description: string;
  rules: Array<{
    icon: string;
    text: string;
  }>;
  features: string[];
  lat: number; // <-- Added coordinate field
  lng: number; // <-- Added coordinate field
}

export const MOCK_LISTINGS: Property[] = [
  {
    id: "1",
    title: "Premium 4-Bed Female Dorm",
    location: "Dapitan St., Sampaloc",
    university: "Near UST",
    price: 5500,
    rating: 4.8,
    type: "Bedspace",
    gender: "Female Only",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
    landlord: "Tita Baby",
    description:
      "Newly renovated female bedspace just a 5-minute walk from UST Gate 2. Designed for students who need a quiet, study-first environment.",
    rules: [
      { icon: "Clock", text: "10 PM Curfew" },
      { icon: "Zap", text: "Sub-metered Aircon" },
      { icon: "Users", text: "No stay-out visitors" },
    ],
    features: ["Wi-Fi included", "Study Lounge", "24/7 Security"],
    lat: 14.6091,
    lng: 120.9822,
  },
  {
    id: "2",
    title: "Co-ed Condo Sharing",
    location: "Avida Towers, BGC",
    university: "Near UP BGC",
    price: 8000,
    rating: 4.9,
    type: "Condo Share",
    gender: "Co-ed",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    landlord: "Alex Santos",
    description:
      "Modern condo unit perfect for young professionals and students. Located in the heart of BGC with easy access to malls, restaurants, and public transport. Fully furnished with high-speed internet and 24/7 security.",
    rules: [
      { icon: "Clock", text: "No curfew" },
      { icon: "Zap", text: "Utilities shared equally" },
      { icon: "Users", text: "Guests allowed until 11 PM" },
    ],
    features: ["Swimming Pool", "Gym Access", "High-speed Wi-Fi"],
    lat: 14.5547,
    lng: 121.0490,
  },
  {
    id: "3",
    title: "Solo Room with AC & Wi-Fi",
    location: "Katipunan Ave, Quezon City",
    university: "Near Ateneo / UP",
    price: 12000,
    rating: 4.5,
    type: "Solo Room",
    gender: "Any",
    image:
      "https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=800&auto=format&fit=crop",
    landlord: "Mr. Cruz",
    description:
      "Private room with ensuite bathroom, perfect for students who value privacy and independence. Walking distance to both Ateneo and UP Diliman. Quiet neighborhood ideal for studying.",
    rules: [
      { icon: "Clock", text: "Flexible curfew" },
      { icon: "Zap", text: "Electricity included" },
      { icon: "Users", text: "No overnight guests" },
    ],
    features: ["Private Bathroom", "Study Desk", "Mini Fridge"],
    lat: 14.6345,
    lng: 121.0747,
  },
];