export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export interface Folder {
  id: string;
  name: string;
  chats: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Chat {
  id: string;
  title: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}