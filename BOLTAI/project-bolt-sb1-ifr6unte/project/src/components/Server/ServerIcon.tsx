import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface ServerIconProps {
  label: string;
  image?: string;
  icon?: React.ReactNode;
  isHome?: boolean;
  to?: string;
  onClick?: () => void;
}

const IconWrapper = styled.div<{ isActive?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: border-radius 0.2s;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.primary};
  }

  ${({ isActive, theme }) => isActive && `
    border-radius: ${theme.borderRadius.md};
    background: ${theme.colors.primary};
  `}
`;

const ServerImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
`;

const Indicator = styled.div`
  position: absolute;
  left: -16px;
  width: 8px;
  height: 40px;
  border-radius: 0 4px 4px 0;
  background: ${({ theme }) => theme.colors.text.primary};
`;

const ServerIcon: React.FC<ServerIconProps> = ({
  label,
  image,
  icon,
  isHome,
  to,
  onClick
}) => {
  const content = (
    <IconWrapper title={label}>
      {image ? (
        <ServerImage src={image} alt={label} />
      ) : icon ? (
        icon
      ) : isHome ? (
        <Home size={24} />
      ) : (
        <span>{label[0].toUpperCase()}</span>
      )}
      <Indicator />
    </IconWrapper>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
};

export default ServerIcon;