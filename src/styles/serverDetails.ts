import styled from 'styled-components';
import { Server } from '../types/server';

export const ServerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ServerName = styled.h3`
  color: #856fab;
  margin: 0;
  font-size: 1.2rem;
`;

export const StatusBadge = styled.span<{ status: Server['status'] }>`
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => {
      switch (props.status) {
        case 'online': return '#4caf50';
        case 'busy': return '#ff9800';
        case 'maintenance': return '#f44336';
        default: return '#9e9e9e';
      }
    }};
  }
`;

export const ServerImage = styled.div<{ url: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 1rem 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ServerDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

export const DetailLabel = styled.span`
  color: #666;
`;

export const DetailValue = styled.span`
  color: #856fab;
  font-weight: 500;
`;

export const ProgressBar = styled.div<{ value: number }>`
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
