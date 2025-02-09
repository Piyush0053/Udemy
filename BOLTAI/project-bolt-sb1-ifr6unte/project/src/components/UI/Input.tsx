import styled from 'styled-components';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledInput = styled.input<{ hasIcon: boolean; hasError?: boolean }>`
  width: 100%;
  padding: ${({ hasIcon }) => hasIcon ? '10px 40px' : '10px 16px'};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  ${({ hasError, theme }) => hasError && `
    border-color: ${theme.colors.danger};
  `}
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.muted};
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

const Input: React.FC<InputProps> = ({ icon, error, ...props }) => (
  <InputWrapper>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    <StyledInput hasIcon={!!icon} hasError={!!error} {...props} />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </InputWrapper>
);

export default Input;