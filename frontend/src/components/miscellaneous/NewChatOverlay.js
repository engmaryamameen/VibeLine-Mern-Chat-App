import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const NewChatOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user, setSelectedChat, chats, setChats } = ChatState();

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
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg="brand.background">
        <ModalHeader>New message</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>
          <Flex h="calc(100vh - 120px)" gap={4}>
            <Box w={{ base: "0", md: "360px" }} display={{ base: "none", md: "block" }} bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Box p={4} borderBottomWidth="1px">
                <Heading size="sm">Chats</Heading>
                <InputGroup mt={3} size="sm">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="brand.secondary" />
                  </InputLeftElement>
                  <Input placeholder="Search Messenger" bg="white" value={query} onChange={(e) => search(e.target.value)} />
                </InputGroup>
              </Box>
              <VStack align="stretch" spacing={0} maxH="calc(100vh - 220px)" overflowY="auto">
                {results.map((u) => (
                  <HStack key={u._id} p={3} spacing={3} bg={selected?._id === u._id ? "#DCF8C6" : "transparent"} _hover={{ bg: selected?._id === u._id ? "#DCF8C6" : "blackAlpha.50" }} cursor="pointer" onClick={() => setSelected(u)}>
                    <Avatar size="sm" name={u.name} src={u.pic} />
                    <VStack spacing={0} align="start" flex={1}>
                      <Text fontWeight={600}>{u.name}</Text>
                      <Text fontSize="xs" color="gray.500">{u.email}</Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Flex flex={1} bg="white" borderWidth="1px" borderRadius="lg" direction="column" p={6}>
              <Heading size="sm">To:</Heading>
              <InputGroup mt={3} mb={4} size="md">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="brand.secondary" />
                </InputLeftElement>
                <Input placeholder="Search contacts" value={query} onChange={(e) => search(e.target.value)} />
              </InputGroup>

              <HStack mb={6} minH="40px">
                {selected ? (
                  <Tag size="lg" borderRadius="full" bg="#DCF8C6">
                    <TagLabel>{selected.name}</TagLabel>
                  </Tag>
                ) : (
                  <Text color="gray.500">Search and select a contact</Text>
                )}
              </HStack>

              <Flex flex={1} align="center" justify="center" bg="brand.background" borderRadius="md">
                {selected ? (
                  <VStack spacing={4}>
                    <Avatar size="xl" name={selected.name} src={selected.pic} />
                    <VStack spacing={0}>
                      <Heading size="md">{selected.name}</Heading>
                      <Text color="gray.600">{selected.email}</Text>
                    </VStack>
                    <Button onClick={() => startChat(selected._id)} bg="brand.primary" _hover={{ bg: "#1EB85A" }} color="white">
                      Start Chat
                    </Button>
                  </VStack>
                ) : (
                  <Text color="gray.500">No contact selected</Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewChatOverlay;


