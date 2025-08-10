import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, HStack, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, IconButton, Input, InputGroup, InputLeftElement, Avatar } from "@chakra-ui/react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain, variant = "light", containerProps = {} }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, notification } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const isDark = false;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg={isDark ? "blackAlpha.400" : "white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={isDark ? "whiteAlpha.300" : "gray.200"}
      color={isDark ? "gray.100" : "inherit"}
      {...containerProps}
    >
      <HStack pb={3} px={3} w="100%" justify="space-between" align="center">
        <Text fontSize={{ base: "22px", md: "24px" }} fontWeight="700" fontFamily="Work sans">
          Chats
        </Text>
        <HStack>
          <IconButton aria-label="edit" icon={<EditIcon />} size="sm" variant="ghost" />
          <GroupChatModal>
            <IconButton aria-label="new group" icon={<AddIcon />} size="sm" colorScheme="blue" />
          </GroupChatModal>
        </HStack>
      </HStack>
      <Box px={3} w="100%" pb={2}>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none" children={<SearchIcon color={isDark ? "gray.300" : "gray.500"} />} />
          <Input
            placeholder="Search Messenger"
            bg={isDark ? "whiteAlpha.200" : "gray.100"}
            border="none"
            borderRadius="full"
            color={isDark ? "gray.100" : "inherit"}
            _placeholder={{ color: isDark ? "gray.400" : "gray.500" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg={isDark ? "whiteAlpha.100" : "#F8F8F8"}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" spacing={1}>
            {chats
              .filter((chat) => {
                const name = !chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName;
                return name.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((chat) => {
                const name = !chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName;
                const last = chat.latestMessage;
                const hasUnread = notification?.some((n) => n.chat && n.chat._id === chat._id);
                const isSelected = selectedChat === chat;
                return (
                  <HStack
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    spacing={3}
                    p={2}
                    borderRadius="md"
                    bg={isSelected ? (isDark ? "blue.600" : "#38B2AC") : isDark ? "transparent" : "#E8E8E8"}
                    _hover={{ bg: isSelected ? undefined : isDark ? "whiteAlpha.100" : "gray.200" }}
                    color={isSelected ? "white" : isDark ? "gray.100" : "black"}
                    align="center"
                  >
                    <Avatar size="sm" name={name} />
                    <VStack spacing={0} align="start" flex={1}>
                      <Text fontWeight={hasUnread ? "700" : "600"} noOfLines={1}>
                        {name}
                      </Text>
                      {last && (
                        <Text fontSize="xs" color={isSelected ? "whiteAlpha.900" : isDark ? "gray.300" : "gray.600"} noOfLines={1}>
                          {last.sender?.name ? `${last.sender.name}: ` : ""}
                          {last.content}
                        </Text>
                      )}
                    </VStack>
                    {hasUnread && <Box w={2} h={2} bg="blue.400" borderRadius="full" />}        
                  </HStack>
                );
              })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
