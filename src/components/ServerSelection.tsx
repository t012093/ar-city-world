import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

interface Server {
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
}

const mockServers: Server[] = [
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
    }
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #856fab;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const SubTitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#856fab' : '#b2dbe9'};
  background: ${props => props.active ? '#856fab' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#856fab'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ServerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ServerCard = styled.div<{ selected: boolean }>`
  padding: 1.5rem;
  border-radius: 12px;
  background: ${props => props.selected ? '#cec8ef' : '#fff'};
  border: 2px solid ${props => props.selected ? '#856fab' : '#b2dbe9'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #856fab;
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ServerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ServerName = styled.h3`
  color: #856fab;
  margin: 0;
  font-size: 1.2rem;
`;

const StatusBadge = styled.span<{ status: Server['status'] }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${props => {
    switch (props.status) {
      case 'online': return '#b2dbe9';
      case 'busy': return '#ffcba5';
      case 'maintenance': return '#e9cdd8';
      default: return '#cec8ef';
    }
  }};
  color: #856fab;
  font-weight: 600;
`;

const PerformanceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const MetricBox = styled.div`
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const MetricValue = styled.div`
  font-size: 1.1rem;
  color: #856fab;
  font-weight: bold;
`;

const ServerDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const DetailLabel = styled.span`
  color: #666;
`;

const DetailValue = styled.span`
  color: #856fab;
  font-weight: 500;
`;

const ProgressBar = styled.div<{ value: number }>`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: ${props => {
      if (props.value < 50) return '#b2dbe9';
      if (props.value < 80) return '#ffcba5';
      return '#e9cdd8';
    }};
    transition: width 0.3s ease;
  }
`;

const ConnectButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: #856fab;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #7a5fa0;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #cec8ef;
    cursor: not-allowed;
  }
`;

export const ServerSelection = () => {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | 'all'>('all');

  const regions = ['all', 'asia-pacific', 'north-america', 'europe'];
  const regionNames = {
    'all': 'すべての地域',
    'asia-pacific': 'アジア太平洋',
    'north-america': '北米',
    'europe': 'ヨーロッパ'
  };

  const filteredServers = mockServers.filter(server => 
    selectedRegion === 'all' || server.region === selectedRegion
  );

  const handleServerSelect = (serverId: string) => {
    setSelectedServer(serverId);
  };

  const handleConnect = () => {
    if (selectedServer) {
      console.log(`Connecting to server: ${selectedServer}`);
      // 接続処理を実装
    }
  };

  return (
    <Container>
      <Header>
        <Title>ワールドサーバーを選択</Title>
        <SubTitle>最適なサーバーを選んでプレイを開始</SubTitle>
      </Header>

      <Filters>
        {regions.map(region => (
          <FilterButton
            key={region}
            active={selectedRegion === region}
            onClick={() => setSelectedRegion(region)}
          >
            {regionNames[region as keyof typeof regionNames]}
          </FilterButton>
        ))}
      </Filters>

      <ServerList>
        {filteredServers.map(server => (
          <ServerCard
            key={server.id}
            selected={selectedServer === server.id}
            onClick={() => handleServerSelect(server.id)}
          >
            <ServerHeader>
              <ServerName>{server.name}</ServerName>
              <StatusBadge status={server.status}>
                {server.status === 'online' ? 'オンライン' :
                 server.status === 'busy' ? '混雑中' : 'メンテナンス中'}
              </StatusBadge>
            </ServerHeader>

            <PerformanceInfo>
              <MetricBox>
                <MetricLabel>レイテンシー</MetricLabel>
                <MetricValue>{server.performance.latency}ms</MetricValue>
              </MetricBox>
              <MetricBox>
                <MetricLabel>サーバー負荷</MetricLabel>
                <MetricValue>{server.performance.load}%</MetricValue>
                <ProgressBar value={server.performance.load} />
              </MetricBox>
            </PerformanceInfo>

            {server.players && (
              <ServerDetails>
                <DetailRow>
                  <DetailLabel>プレイヤー数</DetailLabel>
                  <DetailValue>{server.players.current} / {server.players.max}</DetailValue>
                </DetailRow>
                <ProgressBar value={(server.players.current / server.players.max) * 100} />
              </ServerDetails>
            )}

            {server.details && (
              <ServerDetails>
                <DetailRow>
                  <DetailLabel>バージョン</DetailLabel>
                  <DetailValue>{server.details.version}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>ロケーション</DetailLabel>
                  <DetailValue>{server.details.location}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>説明</DetailLabel>
                </DetailRow>
                <DetailValue style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                  {server.details.description}
                </DetailValue>
              </ServerDetails>
            )}
          </ServerCard>
        ))}
      </ServerList>

      <ConnectButton
        disabled={!selectedServer}
        onClick={handleConnect}
      >
        サーバーに接続
      </ConnectButton>
    </Container>
  );
};
