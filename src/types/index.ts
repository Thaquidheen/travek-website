export interface Tour {
  id: string;
  title: string;
  image: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  description: string;
  duration?: string;
  rating?: number;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter";
  url: string;
}

export interface HeroData {
  location: string;
  title: string;
  description: string;
}

export interface DestinationCategory {
  id: string;
  title: string;
  image: string;
  stays: number;
}

export interface NearbyCity {
  id: string;
  city: string;
  image: string;
  driveTime: string;
}

export interface DestinationsData {
  categories: DestinationCategory[];
  nearby: NearbyCity[];
}

export interface Country {
  id: string;
  name: string;
  code: string;
  slug: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  heroImage: string;
  shortDescription: string;
  description: string;
  gallery: string[];
  visaInfo: {
    required: boolean;
    type: string;
    processingTime: string;
    validity: string;
    stayDuration: string;
    entryType: string;
    requirements: string[];
  };
  bestTimeToVisit: string;
  currency: string;
  language: string;
  timezone: string;
  faqs: FAQ[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  featured: boolean;
  popularityRank: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CountriesData {
  countries: Country[];
  total: number;
}
