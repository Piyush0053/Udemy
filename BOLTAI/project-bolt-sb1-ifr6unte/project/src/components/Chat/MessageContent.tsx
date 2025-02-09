import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const StyledMarkdown = styled(ReactMarkdown)`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.375rem;
  white-space: pre-wrap;
  
  code {
    background: ${({ theme }) => theme.colors.background.tertiary};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 85%;
  }
`;

interface Props {
  content: string;
}

const MessageContent: React.FC<Props> = ({ content }) => {
  return <StyledMarkdown>{content}</StyledMarkdown>;
};

export default MessageContent;