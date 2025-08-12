import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import ChatInfoPanel from "../components/ChatInfoPanel";
import NewMessagePanel from "../components/panels/NewMessagePanel";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user, appTheme } = ChatState();
  const [showInfo, setShowInfo] = useState(false);
  const [mode, setMode] = useState("chat"); 

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex
        justifyContent="space-between"
        w="100%"
        h="100vh"
        p={{ base: 2, md: 4 }}
        bg={ChatState().appTheme === "dark" ? "gray.900" : "gray.50"}
      >
        {user && (
          <MyChats
            fetchAgain={fetchAgain}
            variant="light"
            containerProps={{ w: { base: "0", md: "28%" }, display: { base: "none", md: "flex" }, h: "100%" }}
            onStartNew={() => setMode("new")}
            onSelectChat={() => setMode("chat")}
          />
        )}
        {user && (
          mode === "new" ? (
            <Box flex={1} mx={{ base: 0, md: 4 }} h="100%">
              <NewMessagePanel />
            </Box>
          ) : (
            <Chatbox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              variant={appTheme === "dark" ? "dark" : "light"}
              containerProps={{ flex: 1, mx: { base: 0, md: 4 }, h: "100%" }}
              onToggleInfo={() => setShowInfo((v) => !v)}
            />
          )
        )}
        {user && showInfo && <ChatInfoPanel chat={ChatState().selectedChat} />}
      </Flex>
    </div>
  );
};

export default Chatpage;
