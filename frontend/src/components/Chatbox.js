import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain, variant = "light", containerProps = {}, onToggleInfo }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg={variant === "dark" ? "gray.800" : "white"}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={variant === "dark" ? "whiteAlpha.300" : "gray.200"}
      color={variant === "dark" ? "gray.100" : "inherit"}
      {...containerProps}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        variant={variant}
        onToggleInfo={onToggleInfo}
      />
    </Box>
  );
};

export default Chatbox;
