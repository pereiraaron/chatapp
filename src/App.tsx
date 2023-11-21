import { useEffect, useCallback, useState } from "react";
import Header from "./components/Header";
import Messages from "./components/Messages";
import MessageComposer from "./components/MessageComposer";
import MessageContainer from "./components/containers/MessageContainer";
import { groupedMessages, parseMessages, sendRequest } from "./lib/helper";
import { MessageType } from "./lib/types";

function App() {
  const [messages, setMessages] = useState<MessageType[] | []>([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = useCallback(async () => {
    try {
      const response = await sendRequest("/messages", "GET");
      setMessages(parseMessages(response));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <MessageContainer>
        <Header />
        <Messages messages={messages} getMessages={getMessages} />
        <MessageComposer getMessages={getMessages} />
      </MessageContainer>
    </div>
  );
}

export default App;
