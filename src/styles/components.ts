import styled, { css } from 'styled-components';
import { fadeIn, pulse, shimmer } from './animations';
import { Server } from '../types/server';

export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  color: #856fab;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SubTitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

export const ControlPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

export const Filters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid #b2dbe9;
  border-radius: 20px;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 200px;

  &:focus {
    border-color: #856fab;
    box-shadow: 0 0 0 2px rgba(133, 111, 171, 0.2);
    width: 300px;
  }
`;

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #b2dbe9;
  border-radius: 20px;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  background: white;
  color: #856fab;
  transition: all 0.3s ease;

  &:focus {
    border-color: #856fab;
    box-shadow: 0 0 0 2px rgba(133, 111, 171, 0.2);
  }
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#856fab' : '#b2dbe9'};
  background: ${props => props.active ? '#856fab' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#856fab'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ServerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const ServerCard = styled.div<{ selected: boolean; recommended?: boolean }>`
  padding: 1.5rem;
  border-radius: 12px;
  background: ${props => props.selected ? '#cec8ef' : '#fff'};
  border: 2px solid ${props => props.selected ? '#856fab' : '#b2dbe9'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.recommended && css`
    animation: ${pulse} 2s infinite;
    border-color: #856fab;
    
    &::before {
      content: '推奨サーバー';
      position: absolute;
      top: 1rem;
      right: -2rem;
      background: #856fab;
      color: white;
      padding: 0.25rem 2rem;
      transform: rotate(45deg);
      font-size: 0.75rem;
      font-weight: bold;
    }
  `}

  &:hover {
    border-color: #856fab;
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const CompareButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #856fab;
  color: #856fab;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background: #856fab;
    color: white;
  }
`;

export const ConnectButton = styled.button`
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
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: #7a5fa0;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #cec8ef;
    cursor: not-allowed;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      60deg,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0) 30%
    );
    transform: rotate(45deg);
    animation: ${shimmer} 3s linear infinite;
  }
`;
