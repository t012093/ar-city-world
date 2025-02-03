import { useState, useMemo } from 'react';
import { Server, mockServers } from '../types/server';
import * as S from '../styles/components';
import * as D from '../styles/serverDetails';

const regionNames = {
  'all': 'すべての地域',
  'asia-pacific': 'アジア太平洋',
  'north-america': '北米',
  'europe': 'ヨーロッパ'
} as const;

export const ServerSelection = () => {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [compareServer, setCompareServer] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'players' | 'name'>('players');
  const [showComparison, setShowComparison] = useState(false);

  const filteredAndSortedServers = useMemo(() => {
    let filtered = mockServers.filter(server => 
      (selectedRegion === 'all' || server.region === selectedRegion) &&
      (searchTerm === '' || 
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.details?.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'players':
          return ((b.players?.current || 0) - (a.players?.current || 0));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [selectedRegion, searchTerm, sortBy]);

  const handleServerSelect = (serverId: string) => {
    if (showComparison && !compareServer) {
      setCompareServer(serverId);
    } else {
      setSelectedServer(serverId);
    }
  };

  const handleCompare = () => {
    setShowComparison(true);
    setCompareServer(null);
  };

  const handleConnect = () => {
    if (selectedServer) {
      console.log(`Connecting to server: ${selectedServer}`);
      // 接続処理を実装
    }
  };

  const renderServerCard = (server: Server, isComparison = false) => (
    <S.ServerCard
      key={server.id}
      selected={server.id === selectedServer || server.id === compareServer}
      recommended={server.recommended}
      onClick={isComparison ? undefined : () => handleServerSelect(server.id)}
    >
      <D.ServerHeader>
        <D.ServerName>{server.name}</D.ServerName>
        <D.StatusBadge status={server.status}>
          {server.status === 'online' ? 'オンライン' :
           server.status === 'busy' ? '混雑中' : 'メンテナンス中'}
        </D.StatusBadge>
      </D.ServerHeader>

      <D.ServerImage url={server.image} />

      {server.players && (
        <D.ServerDetails>
          <D.DetailRow>
            <D.DetailLabel>プレイヤー数</D.DetailLabel>
            <D.DetailValue>{server.players.current} / {server.players.max}</D.DetailValue>
          </D.DetailRow>
          <D.ProgressBar value={(server.players.current / server.players.max) * 100} />
        </D.ServerDetails>
      )}

      {server.details && (
        <D.ServerDetails>
          <D.DetailRow>
            <D.DetailLabel>バージョン</D.DetailLabel>
            <D.DetailValue>{server.details.version}</D.DetailValue>
          </D.DetailRow>
          <D.DetailRow>
            <D.DetailLabel>ロケーション</D.DetailLabel>
            <D.DetailValue>{server.details.location}</D.DetailValue>
          </D.DetailRow>
          <D.DetailRow>
            <D.DetailLabel>説明</D.DetailLabel>
          </D.DetailRow>
          <D.DetailValue style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
            {server.details.description}
          </D.DetailValue>
        </D.ServerDetails>
      )}
    </S.ServerCard>
  );

  const selectedServerData = mockServers.find(s => s.id === selectedServer);
  const compareServerData = mockServers.find(s => s.id === compareServer);

  return (
    <S.Container>
      <S.Header>
        <S.Title>ワールドサーバーを選択</S.Title>
        <S.SubTitle>最適なサーバーを選んでプレイを開始</S.SubTitle>
      </S.Header>

      <S.ControlPanel>
        <S.Filters>
          {Object.entries(regionNames).map(([region, name]) => (
            <S.FilterButton
              key={region}
              active={selectedRegion === region}
              onClick={() => setSelectedRegion(region)}
            >
              {name}
            </S.FilterButton>
          ))}
        </S.Filters>

        <S.SearchInput
          placeholder="サーバーを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <S.SortSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'players' | 'name')}
        >
          <option value="players">プレイヤー数順</option>
          <option value="name">名前順</option>
        </S.SortSelect>

        {selectedServer && !showComparison && (
          <S.CompareButton onClick={handleCompare}>
            他のサーバーと比較
          </S.CompareButton>
        )}
      </S.ControlPanel>

      {showComparison && selectedServerData ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {renderServerCard(selectedServerData, true)}
          {compareServerData ? 
            renderServerCard(compareServerData, true) :
            <S.ServerCard selected={false}>
              <D.ServerHeader>
                <D.ServerName>比較するサーバーを選択</D.ServerName>
              </D.ServerHeader>
            </S.ServerCard>
          }
        </div>
      ) : (
        <S.ServerList>
          {filteredAndSortedServers.map(server => renderServerCard(server))}
        </S.ServerList>
      )}

      <S.ConnectButton
        disabled={!selectedServer}
        onClick={handleConnect}
      >
        サーバーに接続
      </S.ConnectButton>
    </S.Container>
  );
};
