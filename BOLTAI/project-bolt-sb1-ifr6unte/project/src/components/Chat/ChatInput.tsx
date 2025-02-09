import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Smile, Gift, GIF } from 'lucide-react';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // TODO: Implement message sending
    setMessage('');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Plus size={20} />
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message #general"
          />
          <Actions>
            <Gift size={20} />
            <GIF size={20} />
            <Smile size={20} />
          </Actions>
        </InputWrapper>
      </form>
    </Container>
  );
};

export default ChatInput;