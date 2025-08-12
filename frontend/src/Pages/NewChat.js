import React, { useState } from "react";
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, VStack, HStack, Text, Avatar, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/SideDrawer";

const NewChat = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory();

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
    history.push("/chats");
  };

  return (
    <div>
      {user && <SideDrawer />}
      <Flex direction="column" p={6} maxW="700px" mx="auto" gap={4}>
        <Heading size="md">To:</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Search contacts" value={query} onChange={(e) => search(e.target.value)} />
        </InputGroup>
        <Box bg="white" borderWidth="1px" borderRadius="md" shadow="sm">
          <VStack align="stretch" spacing={0} maxH="60vh" overflowY="auto">
            <Box p={3} borderBottomWidth="1px" fontWeight="600">Your contacts</Box>
            {results.map((u) => (
              <HStack key={u._id} p={3} _hover={{ bg: "gray.50" }} cursor="pointer" onClick={() => startChat(u._id)}>
                <Avatar size="sm" name={u.name} src={u.pic} />
                <VStack spacing={0} align="start" flex={1}>
                  <Text fontWeight={600}>{u.name}</Text>
                  <Text fontSize="sm" color="gray.500">{u.email}</Text>
                </VStack>
                <Button size="sm" colorScheme="blue">Chat</Button>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Flex>
    </div>
  );
};

export default NewChat;


