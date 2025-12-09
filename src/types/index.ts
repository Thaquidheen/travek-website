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
