import { useEffect, useCallback, useState } from "react";
import Header from "./components/Header";
import Chat from "./components/Chat";
import ChatComposer from "./components/ChatComposer";
import ChatContainer from "./components/containers/ChatContainer";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://mapi.harmoney.dev/api/v1/messages",
        {
          headers: { Authorization: "noag2GiqPZO81KS1" },
        }
      );
      setMessages([...response.data]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <ChatContainer>
        <Header />
        <Chat messages={messages} getMessages={getMessages} />
        <ChatComposer getMessages={getMessages} />
      </ChatContainer>
    </div>
  );
}

export default App;
