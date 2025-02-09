export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  createdAt: string;
}

export interface Server {
  id: string;
  name: string;
  icon?: string;
  ownerId: string;
  members: ServerMember[];
  channels: Channel[];
  categories: Category[];
  createdAt: string;
}

export interface ServerMember {
  id: string;
  userId: string;
  serverId: string;
  roles: Role[];
  nickname?: string;
  joinedAt: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  serverId: string;
  categoryId?: string;
  position: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  serverId: string;
  position: number;
}

export interface Message {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  attachments: Attachment[];
  reactions: Reaction[];
  replyToId?: string;
  editedAt?: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  url: string;
  type: string;
  name: string;
  size: number;
}

export interface Reaction {
  id: string;
  emoji: string;
  count: number;
  users: string[];
}

export interface Role {
  id: string;
  name: string;
  color: string;
  position: number;
  permissions: number;
  serverId: string;
}