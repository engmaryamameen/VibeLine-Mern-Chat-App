import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const NewMessagePanel = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { user, chats, setChats, setSelectedChat, appTheme } = ChatState();
  const isDark = appTheme === "dark";

  const search = async (q) => {
    setQuery(q);
    if (!q) return setResults([]);
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const { data } = await axios.get(`/api/user?search=${encodeURIComponent(q)}`, config);
    setResults(data);
  };

  const startChat = async (userId) => {
    const config = { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } };
    const { data } = await axios.post(`/api/chat`, { userId }, config);
    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    setSelectedChat(data);
  };

  return (
    <Box bg={isDark ? "gray.800" : "white"} borderWidth="1px" borderRadius="lg" p={6} h="100%" color={isDark ? "gray.100" : "inherit"}>
      <Heading size="md" mb={3}>To:</Heading>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color={isDark ? "gray.300" : "brand.secondary"} />
        </InputLeftElement>
        <Input placeholder="Search contacts" value={query} onChange={(e) => search(e.target.value)} bg={isDark ? "gray.700" : "white"} borderColor={isDark ? "whiteAlpha.300" : undefined} />
      </InputGroup>

      <VStack align="stretch" spacing={0} maxH="calc(100% - 100px)" overflowY="auto" borderWidth="1px" borderRadius="md" borderColor={isDark ? "whiteAlpha.300" : undefined}>
        {!results.length && (
          <Box p={6} color={isDark ? "gray.400" : "gray.500"}>Search and select a contact</Box>
        )}
        {results.map((u) => (
          <HStack key={u._id} p={3} _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }} cursor="pointer" onClick={() => startChat(u._id)}>
            <Avatar size="sm" name={u.name} src={u.pic} />
            <VStack spacing={0} align="start" flex={1}>
              <Text fontWeight={600}>{u.name}</Text>
              <Text fontSize="sm" color={isDark ? "gray.400" : "gray.500"}>{u.email}</Text>
            </VStack>
            <Button size="sm" bg="brand.primary" _hover={{ bg: "#1EB85A" }} color="white">Chat</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default NewMessagePanel;


