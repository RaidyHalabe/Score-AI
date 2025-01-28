export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
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