import { Box, Flex, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import ChatInfoPanel from "../components/ChatInfoPanel";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex
        justifyContent="space-between"
        w="100%"
        h="100vh"
        p={{ base: 2, md: 4 }}
        bg="gray.50"
      >
        {user && (
          <MyChats
            fetchAgain={fetchAgain}
            variant="light"
            containerProps={{ w: { base: "0", md: "28%" }, display: { base: "none", md: "flex" }, h: "100%" }}
          />
        )}
        {user && (
          <Chatbox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            variant="light"
            containerProps={{ flex: 1, mx: { base: 0, md: 4 }, h: "100%" }}
            onToggleInfo={() => setShowInfo((v) => !v)}
          />
        )}
        {user && showInfo && <ChatInfoPanel chat={ChatState().selectedChat} />}
      </Flex>
    </div>
  );
};

export default Chatpage;
