export interface AssetConfig {
  logo: string;
  heroRender: string;
  heroRenderMobile: string;
  heroVideo: string;
  aboutSketch: string;
  missionVisionDesktop: string;
  missionVisionMobile: string;
}

export const ASSETS: AssetConfig = {
  logo: "/assets/logo-img.png",
  heroRender: "/assets/hero-desktop-10.png",
  heroRenderMobile: "/assets/hero-mobile-2.png",
  heroVideo: "/assets/loader-sketch.mp4",
  aboutSketch: "/assets/building-frame.png",
  missionVisionDesktop: "/assets/mission-vision/logo-desktop.png",
  missionVisionMobile: "/assets/mission-vision/logo-mobile.png",
};

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Overview", href: "#about" },
  { label: "Residences", href: "#floor-plans" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export interface Stat {
  value: string;
  label: string;
  accent: "teal" | "gold" | "ember";
}


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
    image: "/assets/plans/floor-plan.webp",
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
    image: "/assets/plans/floor-plan.webp",
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
    image: "/assets/plans/floor-plan.webp",
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
      "Multi-level secure podium parking with dedicated bays for every residence, EV-ready charging points and intuitive wayfinding throughout.",
    images: [
      {
        url: "/assets/plans/podium.webp",
        label: "Podium Level 1",
      },
      {
        url: "/assets/plans/parking.webp",
        label: "Podium Level 2",
      },
      /*
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
      */
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
    label: "Fitness & Recreation",
    items: [
      {
        name: "Gymnasium",
        desc: "Fully equipped fitness studio with premium cardio and strength equipment for everyday training.",
        url: "/assets/amenities/gym.webp",
      },
      {
        name: "Multi-Purpose Court",
        desc: "An all-weather court for basketball, badminton and casual play under floodlights.",
        url: "/assets/amenities/court.webp",
      },
      {
        name: "Yoga & Meditation Deck",
        desc: "A serene open-air deck framed by greenery — for daily practice, sunrise to sunset.",
        url: "/assets/amenities/yoga.webp",
      },
      {
        name: "Jogging Track",
        desc: "A landscaped loop cushioned for comfort, weaving through gardens and quiet pockets.",
        url: "/assets/amenities/jog.webp",
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
        url: "/assets/amenities/play.webp",
      },
      {
        name: "Sand Pit",
        desc: "A timeless sand pit for sensory play, shaded by mature trees and seating for parents.",
        url: "/assets/amenities/sand.webp",
      },
      {
        name: "Indoor Games Zone",
        desc: "Billiards, table tennis and board games — a refined corner for unwinding after work.",
        url: "/assets/amenities/indoor.webp",
      },
      {
        name: "Exclusive Amenities Floor (Car-Free Kids Oasis)",
        desc: "A dedicated, car-free recreation level for children to play, run and explore safely amidst curated play zones.",
        url: "/assets/amenities/multi.webp",
      },
    ],
  },
  {
    id: "green",
    label: "Green & Relaxation",
    items: [
      {
        name: "Floral Paradise",
        desc: "Curated gardens with seasonal blooms, native trees and quiet seating nooks.",
        url: "/assets/amenities/flower.webp",
      },
      {
        name: "Senior Citizen Corner",
        desc: "A peaceful, shaded enclave with comfortable seating — for conversation and reflection.",
        url: "/assets/amenities/senior.webp",
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
        url: "/assets/amenities/cctv.webp",
      },

      {
        name: "Power Backup for Common Amenities",
        desc: "Power backup for all elevators, pumps and essential services — seamless living, uninterrupted.",
        url: "/assets/amenities/power.webp",
      },
      {
        name: "Fire Fighting System",
        desc:"State-of-the-art fire detection and suppression systems across all floors with emergency response infrastructure.",
        url: "/assets/amenities/fire.webp",
      }
    ],
  },
  {
    id: "mobility",
    label: "Mobility & Infrastructure",
    items: [
      {
        name: "2-High-Speed Elevators",
        desc: "Smooth, whisper-quiet elevators with destination control and dedicated service lifts.",
        url: "/assets/amenities/lift.webp",
      },
      {
        name: "EV Charging Stations",
        desc: "Dedicated charging points for electric vehicles across parking zones with smart energy monitoring.",
        url: "/assets/amenities/ev.webp",
      },
      {
        name: "Safety Stretcher Lift",
        desc: "Wide, high-capacity stretcher lifts for emergencies, ensuring prompt and safe medical transport.",
        url: "/assets/amenities/stretcher.webp",
      }
    ],
  }
];

export interface LocationItem {
  name: string;
  distanceKm?: number;
}

export interface LocationCategory {
  id: string;
  label: string;
  icon: "Train" | "GraduationCap" | "HeartPulse" | "ShoppingBag";
  color: "teal" | "gold" | "ember";
  items: LocationItem[];
}

// Location categories
export const LOCATION_CATEGORIES: LocationCategory[] = [
  {
    id: "transport",
    label: "Transport",
    icon: "Train",
    color: "teal",
    items: [
      { name: "Mulund Railway Station", distanceKm: 1.2 },
      { name: "LBS Marg", distanceKm: 0.4 },
      { name: "Eastern Express Highway", distanceKm: 1.6 },
      { name: "Proposed Metro Station", distanceKm: 0.9 },
      { name: "BEST Bus Depot", distanceKm: 0.7 },
      { name: "Panch Rasta Junction", distanceKm: 1.1 },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "GraduationCap",  
    color: "gold",
    items: [
      { name: "NES International School", distanceKm: 1.8 },
      { name: "Billabong High International School", distanceKm: 2.1 },
      { name: "St. Mary's Convent High School", distanceKm: 1.4 },
      { name: "V.G. Vaze College", distanceKm: 2.3 },
    ],
  },
  {
    id: "health",
    label: "Health",
    icon: "HeartPulse",
    color: "ember",
    items: [
      { name: "Fortis Hospital, Mulund", distanceKm: 1.1 },
      { name: "Jupiter Hospital, Thane", distanceKm: 3.8 },
      { name: "Apex Hospitals", distanceKm: 2.4 },
    ],
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: "ShoppingBag",
    color: "teal",
    items: [
      { name: "D-Mart", distanceKm: 0.9 },
      { name: "R Mall", distanceKm: 2.0 },
      { name: "Banks & ATMs", distanceKm: 0.3 },
      { name: "Local Markets", distanceKm: 0.6 },
    ],
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
    "https://wa.me/919967279772?text=Hello%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20exploring%20your%20real%20estate%20offerings.%20I%20would%20appreciate%20it%20if%20you%20could%20share%20the%20project%20details%2C%20pricing%2C%20floor%20plans%2C%20and%20available%20inventory.%20Please%20let%20me%20know%20a%20convenient%20time%20to%20discuss%20further.%20Thank%20you.",
  rera: "RERA Reg. No. : -",
};
