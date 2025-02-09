import styled from 'styled-components';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ size = 'md' }) => 
    size === 'sm' ? '8px 16px' : 
    size === 'md' ? '10px 20px' : 
    '12px 24px'
  };
  font-size: ${({ size = 'md' }) =>
    size === 'sm' ? '14px' :
    size === 'md' ? '16px' :
    '18px'
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: background-color 0.2s;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  background-color: ${({ theme, variant = 'primary' }) =>
    variant === 'primary' ? theme.colors.primary :
    variant === 'secondary' ? theme.colors.background.tertiary :
    theme.colors.danger
  };
  
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <StyledButton {...props}>
    {icon}
    {children}
  </StyledButton>
);

export default Button;