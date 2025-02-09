import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { setCredentials } from '../../store/slices/authSlice';
import { Button, Input, FormError } from '../UI';

const FormContainer = styled.form`
  width: 100%;
  max-width: 480px;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // TODO: Implement actual API call
      const response = { user: { id: '1', email, username: 'test' }, token: 'test-token' };
      dispatch(setCredentials(response));
      navigate('/channels/@me');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Welcome back!</Title>
      {error && <FormError>{error}</FormError>}
      
      <Input
        icon={<Mail />}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <Input
        icon={<Lock />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <Button type="submit" icon={<LogIn />}>
        Log In
      </Button>
    </FormContainer>
  );
};

export default LoginForm;