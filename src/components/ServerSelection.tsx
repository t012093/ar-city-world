import styled from 'styled-components';
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
}

const mockServers: Server[] = [
  {
    id: 'ap-1',
    name: 'Asia Pacific - Tokyo',
    region: 'asia-pacific',
    performance: { latency: 15, load: 65 },
    status: 'online'
  },
  {
    id: 'us-1',
    name: 'North America - Oregon',
    region: 'north-america',
    performance: { latency: 120, load: 45 },
    status: 'online'
  },
  {
    id: 'eu-1',
    name: 'Europe - Frankfurt',
    region: 'europe',
    performance: { latency: 150, load: 70 },
    status: 'busy'
  },
  {
    id: 'ap-2',
    name: 'Asia Pacific - Singapore',
    region: 'asia-pacific',
    performance: { latency: 45, load: 80 },
    status: 'maintenance'
  }
];

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #856fab;
  text-align: center;
  margin-bottom: 2rem;
`;

const ServerList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ServerCard = styled.div<{ selected: boolean }>`
  padding: 1.5rem;
  border-radius: 8px;
  background: ${props => props.selected ? '#cec8ef' : '#fff'};
  border: 2px solid ${props => props.selected ? '#856fab' : '#b2dbe9'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #856fab;
    transform: translateY(-2px);
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
`;

const StatusBadge = styled.span<{ status: Server['status'] }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
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
`;

const PerformanceInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #856fab;
`;

const MetricBox = styled.div`
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
`;

const ConnectButton = styled.button`
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 2rem auto 0;
  padding: 1rem;
  background: #856fab;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #7a5fa0;
  }

  &:disabled {
    background: #cec8ef;
    cursor: not-allowed;
  }
`;

export const ServerSelection = () => {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

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
      <Title>ワールドサーバーを選択</Title>
      <ServerList>
        {mockServers.map(server => (
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
                レイテンシー: {server.performance.latency}ms
              </MetricBox>
              <MetricBox>
                負荷: {server.performance.load}%
              </MetricBox>
            </PerformanceInfo>
          </ServerCard>
        ))}
      </ServerList>
      <ConnectButton
        disabled={!selectedServer}
        onClick={handleConnect}
      >
        接続
      </ConnectButton>
    </Container>
  );
};
