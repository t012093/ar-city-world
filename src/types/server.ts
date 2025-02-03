export interface Server {
  id: string;
  name: string;
  region: string;
  performance: {
    latency: number;
    load: number;
  };
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
}

export const mockServers: Server[] = [
  {
    id: 'ap-1',
    name: 'Asia Pacific - Tokyo',
    region: 'asia-pacific',
    performance: { latency: 15, load: 65 },
    status: 'online',
    players: { current: 1250, max: 2000 },
    details: {
      version: '1.0.2',
      location: '東京',
      description: '安定した低レイテンシーのプレミアムサーバー'
    },
    recommended: true
  },
  {
    id: 'us-1',
    name: 'North America - Oregon',
    region: 'north-america',
    performance: { latency: 120, load: 45 },
    status: 'online',
    players: { current: 850, max: 2000 },
    details: {
      version: '1.0.2',
      location: 'オレゴン',
      description: '北米地域の中核サーバー'
    }
  },
  {
    id: 'eu-1',
    name: 'Europe - Frankfurt',
    region: 'europe',
    performance: { latency: 150, load: 70 },
    status: 'busy',
    players: { current: 1800, max: 2000 },
    details: {
      version: '1.0.2',
      location: 'フランクフルト',
      description: 'ヨーロッパの主要ハブサーバー'
    }
  },
  {
    id: 'ap-2',
    name: 'Asia Pacific - Singapore',
    region: 'asia-pacific',
    performance: { latency: 45, load: 80 },
    status: 'maintenance',
    players: { current: 0, max: 2000 },
    details: {
      version: '1.0.1',
      location: 'シンガポール',
      description: '東南アジア地域のゲートウェイ'
    }
  }
];
