import React, { useMemo, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  HStack,
  Avatar,
  Text,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";

const AddMemberModal = ({ chat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setSelectedChat, chats, setChats, appTheme } = ChatState();
  const isDark = appTheme === "dark";
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const memberIdSet = useMemo(() => new Set((chat?.users || []).map((u) => u?._id || u)), [chat]);

  const search = async (q) => {
    setQuery(q);
    if (!q) return setResults([]);
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${encodeURIComponent(q)}`, config);
      // filter out users already present and self, and de-dup by _id
      const seen = new Set();
      const filtered = (data || [])
        .filter((u) => u._id !== user._id && !memberIdSet.has(u._id))
        .filter((u) => (seen.has(u._id) ? false : (seen.add(u._id), true)));
      setResults(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const add = async (userId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put("/api/chat/groupadd", { chatId: chat._id, userId }, config);
      setSelectedChat(data);
      if (Array.isArray(chats)) {
        const updated = chats.map((c) => (c._id === data._id ? data : c));
        setChats(updated);
      }
      toast({ title: "Member added", status: "success", duration: 2000, isClosable: true });
      onClose();
    } catch (e) {
      toast({ title: "Failed to add", description: e?.response?.data?.message || "", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} w="100%" size="sm" colorScheme="teal" onClick={onOpen} borderRadius="md">
        Add member
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={isDark ? "gray.800" : "white"} color={isDark ? "gray.100" : "inherit"}>
          <ModalHeader>Add member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Search by name or email"
              value={query}
              onChange={(e) => search(e.target.value)}
              bg={isDark ? "gray.700" : "white"}
            />
            <VStack align="stretch" mt={3} spacing={2} maxH="300px" overflowY="auto">
              {loading && <Spinner size="sm" />}
              {!loading && results.length === 0 && query && (
                <Text color={isDark ? "gray.400" : "gray.600"} fontSize="sm" px={1}>No users found</Text>
              )}
              {!loading && results.map((u) => (
                <HStack key={u._id} justify="space-between" p={2} borderRadius="md" _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }}>
                  <HStack>
                    <Avatar size="sm" name={u.name} src={u.pic} />
                    <Text>{u.name}</Text>
                  </HStack>
                  <Button size="xs" colorScheme="blue" onClick={() => add(u._id)}>Add</Button>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant={isDark ? "outline" : "ghost"} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMemberModal;

