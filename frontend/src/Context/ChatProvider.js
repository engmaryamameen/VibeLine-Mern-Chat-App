import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [appTheme, setAppTheme] = useState(() => {
    return localStorage.getItem("appTheme") || "light"; 
  });

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    // persist per user if available
    if (user && user._id) {
      localStorage.setItem(`appTheme:${user._id}`, appTheme);
    }
    // also keep a generic key for fallback before user loads
    localStorage.setItem("appTheme", appTheme);
  }, [appTheme, user]);

  useEffect(() => {
    // load theme for the current user when user changes
    if (user && user._id) {
      const saved = localStorage.getItem(`appTheme:${user._id}`);
      if (saved) setAppTheme(saved);
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        appTheme,
        setAppTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
