import {Message} from './message';

export interface ChatRoom {
  id: number;
  title: string;
  description: string;
  messages: Message[];
  lastModified: string;
}
