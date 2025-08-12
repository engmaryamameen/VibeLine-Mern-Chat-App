import { AddIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender, getOtherDisplayName, getDisplayNameForUser } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import ProfileModal from "./miscellaneous/ProfileModal";
import { Button, IconButton, Input, InputGroup, InputLeftElement, Avatar, VStack, Text, Box, HStack, Stack } from "@chakra-ui/react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain, variant = "light", containerProps = {}, onStartNew, onSelectChat }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, notification, appTheme } = ChatState();

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

  const isDark = appTheme === "dark";
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();

  const searchUsers = async (term) => {
    setSearchTerm(term);
    if (!term) {
      setSearchResults([]);
      return;
    }
    try {
      setIsSearching(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${encodeURIComponent(term)}`, config);
      // Exclude self
      setSearchResults((data || []).filter((u) => u._id !== user._id));
    } catch (e) {
      // ignore
    } finally {
      setIsSearching(false);
    }
  };

  const startChat = async (userId) => {
    try {
      const config = { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...(chats || [])]);
      setSelectedChat(data);
      setSearchTerm("");
      setSearchResults([]);
    } catch (e) { }
  };

  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg={isDark ? "gray.800" : "brand.surface"}
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={isDark ? "whiteAlpha.300" : "gray.200"}
        color={isDark ? "gray.100" : "inherit"}
        {...containerProps}
      >
        <HStack pb={3} px={3} w="100%" justify="space-between" align="center">
          <HStack spacing={3}>
            <ProfileModal user={user}>
              <Avatar size="sm" name={user?.name} src={user?.pic} cursor="pointer" />
            </ProfileModal>
            <Text fontSize={{ base: "22px", md: "24px" }} fontWeight="700" fontFamily="Work sans">
              Chats
            </Text>
          </HStack>
          <HStack>
            <IconButton aria-label="new" icon={<EditIcon />} size="sm" variant="ghost" onClick={() => onStartNew && onStartNew()} />
            <GroupChatModal>
              <IconButton aria-label="new group" icon={<AddIcon />} size="sm" colorScheme="blue" />
            </GroupChatModal>
          </HStack>
        </HStack>
        <Box px={3} w="100%" pb={2}>
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none" children={<SearchIcon color={isDark ? "gray.300" : "brand.secondary"} />} />
            <Input
              placeholder="Search Messenger"
              bg={isDark ? "gray.700" : "white"}
              border="none"
              borderRadius="full"
              color={isDark ? "gray.100" : "brand.text"}
              _placeholder={{ color: isDark ? "gray.400" : "gray.500" }}
              value={searchTerm}
              onChange={(e) => searchUsers(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg={isDark ? "gray.800" : "#F8F8F8"}
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {searchTerm && (
            <VStack align="stretch" spacing={1} mb={3}>
              {isSearching && <Text fontSize="sm" color={isDark ? "gray.300" : "gray.600"}>Searching…</Text>}
              {!isSearching && searchResults.length === 0 && (
                <Text fontSize="sm" color={isDark ? "gray.300" : "gray.600"}>No users found</Text>
              )}
              {!isSearching && searchResults.map((u) => (
                <HStack key={u._id} spacing={3} p={2} borderRadius="md" _hover={{ bg: isDark ? "gray.700" : "white" }} cursor="pointer" onClick={() => startChat(u._id)}>
                  <Avatar size="sm" name={u.name} src={u.pic} />
                  <VStack spacing={0} align="start" flex={1}>
                    <Text fontWeight={600}>{u.name}</Text>
                    <Text fontSize="xs" color={isDark ? "gray.300" : "gray.600"}>{u.email}</Text>
                  </VStack>
                  <Button size="xs" colorScheme="blue">Chat</Button>
                </HStack>
              ))}
            </VStack>
          )}
          {chats ? (
            <Stack overflowY="scroll" spacing={1}>
              {chats
                .filter((chat) => {
                  const name = !chat.isGroupChat ? getOtherDisplayName(loggedUser, chat) : chat.chatName;
                  return name.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((chat) => {
                  const name = !chat.isGroupChat ? getOtherDisplayName(loggedUser, chat) : chat.chatName;
                  const last = chat.latestMessage;
                  const hasUnread = notification?.some((n) => n.chat && n.chat._id === chat._id);
                  const isSelected = selectedChat === chat;
                  const selectedBg = "#E7F3FF";
                  const hoverBg = "#F0F2F5";
                  return (
                    <HStack
                      key={chat._id}
                      onClick={() => { setSelectedChat(chat); if (onSelectChat) onSelectChat(); }}
                      cursor="pointer"
                      spacing={3}
                      p={2}
                      borderRadius="md"
                      bg={isSelected ? (isDark ? "blue.700" : selectedBg) : "transparent"}
                      _hover={{ bg: isSelected ? (isDark ? "blue.700" : selectedBg) : (isDark ? "gray.700" : hoverBg) }}
                      color={isSelected ? (isDark ? "white" : "inherit") : (isDark ? "gray.100" : "black")}
                      align="center"
                    >
                      <Avatar
                        size="sm"
                        name={name}
                        src={
                          !chat.isGroupChat
                            ? (chat.users || []).find((u) => u._id !== loggedUser?._id)?.pic || undefined
                            : undefined
                        }
                      />
                      <VStack spacing={0} align="start" flex={1}>
                        <Text fontWeight={hasUnread ? "700" : "600"} noOfLines={1}>
                          {name}
                        </Text>
                        {last && (
                          <Text fontSize="xs" color={isSelected ? (isDark ? "whiteAlpha.900" : "gray.600") : isDark ? "gray.300" : "gray.600"} noOfLines={1}>
                            {last.sender?._id ? `${getDisplayNameForUser(chat, last.sender._id, last.sender.name)}: ` : ""}
                            {last.content}
                          </Text>
                        )}
                      </VStack>
                      {hasUnread && <Box w={2} h={2} bg={isDark ? "#60A5FA" : "#0084FF"} borderRadius="full" />}
                    </HStack>
                  );
                })}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
