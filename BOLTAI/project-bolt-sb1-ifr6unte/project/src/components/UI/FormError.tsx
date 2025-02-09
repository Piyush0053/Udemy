import styled from 'styled-components';

const FormError = styled.div`
  background: ${({ theme }) => theme.colors.danger}33;
  color: ${({ theme }) => theme.colors.danger};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 14px;
`;

export default FormError;