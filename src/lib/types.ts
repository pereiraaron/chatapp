export interface MessageContainerProps {
  children: any;
}
export interface MessageComposerProps {
  getMessages: () => Promise<void>;
}

export interface MessagesProps {
  messages: MessageType[];
  getMessages: () => Promise<void>;
}
export interface MessageProps {
  message: MessageType;
  getMessages: () => Promise<void>;
}

export interface MessageBodyProps {
  message: MessageType;
  openModal: () => void;
}

export interface MessageAvatarProps {
  userId: string;
}

export type MessageType = {
  id: string;
  content: string;
  userId: string;
  timestamp: string;
};
export type MessageGroup = {
  [key in string]: MessageType[];
};
