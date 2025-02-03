import { keyframes } from 'styled-components';

export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(133, 111, 171, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(133, 111, 171, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(133, 111, 171, 0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;
