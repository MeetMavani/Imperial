export interface AssetConfig {
  logo: string;
  heroRender: string;
  heroVideo: string;
  aboutSketch: string;
}

export const ASSETS: AssetConfig = {
  logo: "https://customer-assets.emergentagent.com/job_dc8c03e2-71dd-4b46-ac60-d052fa1bef4b/artifacts/qrmtse76_optimisied-logo.svg",
  heroRender:
    "https://customer-assets.emergentagent.com/job_dc8c03e2-71dd-4b46-ac60-d052fa1bef4b/artifacts/x6d11zip_building-1.jpeg",
  heroVideo:
    "https://customer-assets.emergentagent.com/job_aarambh-luxury/artifacts/2dnrg61k_gemini_generated_video_8ddc231a.mp4",
  aboutSketch: "/assets/building-frame-2.png",
};

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Overview", href: "#about" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export interface Stat {
  value: string;
  label: string;
  accent: "teal" | "gold" | "ember";
}

export const STATS: Stat[] = [
  { value: "15+", label: "Years of Experience", accent: "teal" },
  { value: "50+", label: "Projects Delivered", accent: "gold" },
  { value: "10,000+", label: "Families Housed", accent: "ember" },
];

export interface MetaItem {
  label: string;
  value: string;
}

export interface FloorTabSingle {
  id: string;
  label: string;
  kind: "single";
  title: string;
  description: string;
  image: string;
  meta: MetaItem[];
}

export interface GalleryImage {
  url: string;
  label: string;
}

export interface FloorTabGallery {
  id: string;
  label: string;
  kind: "gallery";
  title: string;
  description: string;
  images: GalleryImage[];
}

export type FloorTab = FloorTabSingle | FloorTabGallery;

export const FLOOR_TABS: FloorTab[] = [
  {
    id: "2bhk",
    label: "2 BHK",
    kind: "single",
    title: "The Two Bedroom Residence",
    description:
      "Thoughtfully proportioned interiors with abundant natural light, a flowing living-dining and considered storage — designed for a refined urban life.",
    image:
      "https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFuJTIwYmx1ZXByaW50fGVufDB8fHx8MTc4MjQwODAwMnww&ixlib=rb-4.1.0&q=85",
    meta: [
      { label: "Carpet Area", value: "701 – 740 sq.ft." },
      { label: "Configuration", value: "2 BHK" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "2" },
      { label: "Balconies", value: "1" },
      { label: "Pricing", value: "Price on Request" },
    ],
  },
  {
    id: "3bhk",
    label: "3 BHK",
    kind: "single",
    title: "The Three Bedroom Residence",
    description:
      "Expansive, light-filled homes with generous balconies and a master suite — crafted for families that value space, privacy and elegance.",
    image:
      "https://images.unsplash.com/photo-1721244653721-bc681b2dfd27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFuJTIwYmx1ZXByaW50fGVufDB8fHx8MTc4MjQwODAwMnww&ixlib=rb-4.1.0&q=85",
    meta: [
      { label: "Carpet Area", value: "892 – 1,189 sq.ft." },
      { label: "Configuration", value: "Compact 3 BHK / 3 BHK" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "3" },
      { label: "Balconies", value: "2" },
      { label: "Pricing", value: "Price on Request" },
    ],
  },
  {
    id: "floorplan",
    label: "Floor Plan",
    kind: "single",
    title: "Typical Floor Layout",
    description:
      "A considered floor layout — corner apartments, cross-ventilation, and column-free living rooms that flow into private decks overlooking Mulund.",
    image:
      "https://images.pexels.com/photos/4458210/pexels-photo-4458210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    meta: [
      { label: "Apartments / Floor", value: "4" },
      { label: "Towers", value: "1 Iconic Tower" },
      { label: "Floors", value: "G+24" },
      { label: "Lifts", value: "3 High-Speed" },
      { label: "Lobby", value: "Double-Height" },
      { label: "Pricing", value: "Price on Request" },
    ],
  },
  {
    id: "podium",
    label: "Podium Parking",
    kind: "gallery",
    title: "Multi-Level Podium Parking",
    description:
      "Five-level secure podium parking with dedicated bays for every residence, EV-ready charging points and intuitive wayfinding throughout.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1721244654392-9c912a6eb236?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFuJTIwYmx1ZXByaW50fGVufDB8fHx8MTc4MjQwODAwMnww&ixlib=rb-4.1.0&q=85",
        label: "Podium Level 1",
      },
      {
        url: "https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        label: "Podium Level 2",
      },
      {
        url: "https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=900&q=70",
        label: "Podium Level 3",
      },
      {
        url: "https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=900&q=70",
        label: "Podium Level 4",
      },
      {
        url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=70",
        label: "Podium Level 5",
      },
    ],
  },
];

export interface AmenityItem {
  name: string;
  desc: string;
  url: string;
}

export interface AmenityCategory {
  id: string;
  label: string;
  items: AmenityItem[];
}

// 21 amenities across 5 categories
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "fitness",
    label: "Fitness & Sports",
    items: [
      {
        name: "Gymnasium",
        desc: "Fully equipped fitness studio with premium cardio and strength equipment for everyday training.",
        url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Multi-Purpose Court",
        desc: "An all-weather court for basketball, badminton and casual play under floodlights.",
        url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Yoga & Meditation Deck",
        desc: "A serene open-air deck framed by greenery — for daily practice, sunrise to sunset.",
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Jogging Track",
        desc: "A landscaped loop cushioned for comfort, weaving through gardens and quiet pockets.",
        url: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&fit=crop&w=900&q=70",
      },
    ],
  },
  {
    id: "children",
    label: "Children",
    items: [
      {
        name: "Kids Play Area",
        desc: "A vibrant, safe play zone with soft-fall surfaces and imaginative play structures.",
        url: "https://images.unsplash.com/photo-1691272477702-0a2edae135f2?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Sand Pit",
        desc: "A timeless sand pit for sensory play, shaded by mature trees and seating for parents.",
        url: "https://images.pexels.com/photos/12485724/pexels-photo-12485724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
    ],
  },
  {
    id: "recreation",
    label: "Recreation",
    items: [
      {
        name: "Rooftop Sky Lounge",
        desc: "A rooftop retreat with skyline views of Mulund — for sunset gatherings and quiet evenings.",
        url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Clubhouse",
        desc: "A grand clubhouse for celebrations and community — bookable lounges and a private dining room.",
        url: "https://images.unsplash.com/photo-1680609989998-6183fcea718b?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Indoor Games Zone",
        desc: "Billiards, table tennis and board games — a refined corner for unwinding after work.",
        url: "https://images.unsplash.com/photo-1720540244592-b4124532b318?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Mini Theatre",
        desc: "A private screening room with plush recliners and crisp acoustics — film nights, refined.",
        url: "https://images.unsplash.com/photo-1676302144341-10563603f99a?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Party Lawn",
        desc: "An open lawn framed by lanterns — designed for celebrations under the open sky.",
        url: "https://images.pexels.com/photos/19141069/pexels-photo-19141069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
    ],
  },
  {
    id: "green",
    label: "Green & Relaxation",
    items: [
      {
        name: "Landscaped Garden",
        desc: "Curated gardens with seasonal blooms, native trees and quiet seating nooks.",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Senior Citizen Corner",
        desc: "A peaceful, shaded enclave with comfortable seating — for conversation and reflection.",
        url: "https://images.pexels.com/photos/7222180/pexels-photo-7222180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        name: "Walking Path",
        desc: "A reflexology-inspired walking path weaving through gardens — mindful steps, every day.",
        url: "https://images.pexels.com/photos/7061667/pexels-photo-7061667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        name: "Swimming Pool",
        desc: "A sculpted pool framed by a sun deck — a private resort, steps from your home.",
        url: "https://images.unsplash.com/photo-1731336479432-3eb5fdb3ab1c?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Spa & Wellness",
        desc: "An intimate spa with steam, sauna and treatment rooms — restorative rituals at home.",
        url: "https://images.unsplash.com/photo-1678960591129-ff8db00462e2?auto=format&fit=crop&w=900&q=70",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Services",
    items: [
      {
        name: "24/7 CCTV Security",
        desc: "Comprehensive surveillance across all common areas, lobbies and entries.",
        url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "High-Speed Elevators",
        desc: "Smooth, whisper-quiet elevators with destination control and dedicated service lifts.",
        url: "https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Covered Parking",
        desc: "Allocated covered parking across multi-level podium — every resident, accounted for.",
        url: "https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Video Door Phone",
        desc: "Smart in-apartment video door phones with intercom to lobby and security.",
        url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=70",
      },
      {
        name: "Boom Barrier Access",
        desc: "Secure boom barriers with RFID — controlled entry for residents and registered guests.",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70",
      },
    ],
  },
];

export interface LocationCategory {
  id: string;
  label: string;
  icon: "Train" | "GraduationCap" | "HeartPulse" | "ShoppingBag";
  color: "teal" | "gold" | "ember";
  items: string[];
}

// Location categories
export const LOCATION_CATEGORIES: LocationCategory[] = [
  {
    id: "transport",
    label: "Transport",
    icon: "Train",
    color: "teal",
    items: [
      "Mulund Railway Station — 1.2 km",
      "LBS Marg — 0.4 km",
      "Eastern Express Highway — 1.6 km",
      "Proposed Metro Station — 0.9 km",
      "BEST Bus Depot — 0.7 km",
      "Panch Rasta Junction — 1.1 km",
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "GraduationCap",
    color: "gold",
    items: [
      "NES International School",
      "Billabong High International School",
      "St. Mary's Convent High School",
      "V.G. Vaze College",
    ],
  },
  {
    id: "health",
    label: "Health",
    icon: "HeartPulse",
    color: "ember",
    items: [
      "Fortis Hospital, Mulund",
      "Jupiter Hospital, Thane",
      "Apex Hospitals",
    ],
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: "ShoppingBag",
    color: "teal",
    items: ["D-Mart", "R Mall", "Banks & ATMs", "Local Markets"],
  },
];

export interface Configuration {
  value: string;
  label: string;
}

export const CONFIGURATIONS: Configuration[] = [
  { value: "2bhk-701", label: "2 BHK — 701 sq.ft." },
  { value: "2bhk-740", label: "2 BHK — 740 sq.ft." },
  { value: "3bhk-892", label: "Compact 3 BHK — 892 sq.ft." },
  { value: "3bhk-993", label: "3 BHK — 993 sq.ft." },
  { value: "3bhk-1189", label: "3 BHK — 1,189 sq.ft." },
  { value: "not-decided", label: "Not decided yet" },
];

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  rera: string;
}

export const CONTACT: ContactConfig = {
  phone: "+91 9967279772",
  email: "aarambhrealty09@gmail.com",
  address: "V.P. Road & Kasturba Rd, Mulund West, Mumbai 400080",
  whatsapp:
    "https://wa.me/919967279772?text=Hi%2C%20I%27m%20interested%20in%20Aarambh%20Imperial",
  rera: "RERA Reg. No. : -",
};
