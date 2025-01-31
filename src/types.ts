export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}

export interface Chat {
  id: string;
  title: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  messages?: Message[];
}

export interface Folder {
  id: string;
  name: string;
  chats: string[];
  createdAt: Date;
  updatedAt: Date;
} 