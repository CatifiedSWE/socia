
export interface EventCard {
  id: string;
  title: string;
  inspiration: string;
  description: string;
  image: string;
  color: string;
  symbols: string[];
  day: 1 | 2;
  vibe: 'thriller' | 'fantasy' | 'action' | 'horror' | 'adventure' | 'crime';
}

export type Tagline = string;
