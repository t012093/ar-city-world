export interface Server {
  id: string;
  name: string;
  region: string;
  status: 'online' | 'busy' | 'maintenance';
  players?: {
    current: number;
    max: number;
  };
  details?: {
    version: string;
    location: string;
    description: string;
  };
  recommended?: boolean;
  image: string; // サーバーのイメージURL
}

export const mockServers: Server[] = [
  {
    id: 'ap-1',
    name: 'Asia Pacific - Tokyo',
    region: 'asia-pacific',
    status: 'online',
    players: { current: 1250, max: 2000 },
    details: {
      version: '1.0.2',
      location: '東京',
      description: '安定した最新のプレミアムサーバー'
    },
    recommended: true,
    image: 'https://placehold.co/600x400/b2dbe9/856fab/png?text=Tokyo+Server'
  },
  {
    id: 'us-1',
    name: 'North America - Oregon',
    region: 'north-america',
    status: 'online',
    players: { current: 850, max: 2000 },
    details: {
      version: '1.0.2',
      location: 'オレゴン',
      description: '北米地域の中核サーバー'
    },
    image: 'https://placehold.co/600x400/cec8ef/856fab/png?text=Oregon+Server'
  },
  {
    id: 'eu-1',
    name: 'Europe - Frankfurt',
    region: 'europe',
    status: 'busy',
    players: { current: 1800, max: 2000 },
    details: {
      version: '1.0.2',
      location: 'フランクフルト',
      description: 'ヨーロッパの主要ハブサーバー'
    },
    image: 'https://placehold.co/600x400/e9cdd8/856fab/png?text=Frankfurt+Server'
  },
  {
    id: 'ap-2',
    name: 'Asia Pacific - Singapore',
    region: 'asia-pacific',
    status: 'maintenance',
    players: { current: 0, max: 2000 },
    details: {
      version: '1.0.1',
      location: 'シンガポール',
      description: '東南アジア地域のゲートウェイ'
    },
    image: 'https://placehold.co/600x400/ffcba5/856fab/png?text=Singapore+Server'
  }
];
