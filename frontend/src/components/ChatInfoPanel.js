import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  ListItem,
  Switch,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChevronRightIcon, SearchIcon, BellIcon, SettingsIcon, AttachmentIcon, LinkIcon, ViewIcon, LockIcon, WarningTwoIcon, TimeIcon, AtSignIcon, NotAllowedIcon, SunIcon, StarIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import ThemeModal from "./miscellaneous/ThemeModal";
import AddMemberModal from "./miscellaneous/AddMemberModal";
import { ChatState } from "../Context/ChatProvider";
import { getSenderFull, getDisplayNameForUser } from "../config/ChatLogics";

const SectionRow = ({ icon, label, onClick, rightEl }) => (
  <HStack
    w="full"
    justify="space-between"
    p={3}
    borderRadius="md"
    _hover={{ bg: "whiteAlpha.100" }}
    cursor="pointer"
    onClick={onClick}
  >
    <HStack spacing={3}>
      {icon && <Icon as={icon} />}
      <Text>{label}</Text>
    </HStack>
    {rightEl || <ChevronRightIcon />}
  </HStack>
);


const SettingRow = ({ icon, label, subtitle, isDark }) => (
  <HStack p={3} borderRadius="md" _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }} justify="space-between">
    <HStack spacing={3}>
      <Icon as={icon} />
      <Box>
        <Text>{label}</Text>
        {subtitle && (
          <Text fontSize="xs" color={isDark ? "gray.400" : "gray.500"}>
            {subtitle}
          </Text>
        )}
      </Box>
    </HStack>
  </HStack>
);

const ChatInfoPanel = ({ chat, variant = "dark" }) => {
  const { user, appTheme, setAppTheme, setSelectedChat, chats, setChats } = ChatState();
  const isGroup = Boolean(chat?.isGroupChat);
  const otherUser = !isGroup && chat ? getSenderFull(user, chat.users) : null;
  const isDark = appTheme === "dark";
  const iconColor = isDark ? "gray.200" : "gray.600";
  const toast = useToast();

  const handleRemove = async (userId) => {
    if (!chat?._id) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        { chatId: chat._id, userId },
        config
      );
      setSelectedChat(data);
      if (Array.isArray(chats)) {
        const updated = chats.map((c) => (c._id === data._id ? data : c));
        setChats(updated);
      }
      toast({ title: "Member removed", status: "success", duration: 2000, isClosable: true });
    } catch (err) {
      toast({ title: "Failed to remove", description: err?.response?.data?.message || "", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <VStack
      w={{ base: "0", xl: "22%" }}
      display={{ base: "none", xl: "flex" }}
      h="full"
      maxH="100%"
      minH="0"
      overflowY="auto"
      p={4}
      spacing={4}
      bg={isDark ? "gray.800" : "white"}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={isDark ? "whiteAlpha.300" : "gray.200"}
      color={isDark ? "gray.100" : "inherit"}
      align="stretch"
    >
      {/* Header */}
      <VStack spacing={2} align="center" py={2}>
        <Avatar size="xl" name={isGroup ? chat?.chatName : getDisplayNameForUser(chat, otherUser?._id, otherUser?.name)} src={isGroup ? undefined : otherUser?.pic} />
        <Text fontWeight="700" fontSize="lg" noOfLines={1}>
          {isGroup ? chat?.chatName : getDisplayNameForUser(chat, otherUser?._id, otherUser?.name)}
        </Text>
        <Badge colorScheme="green" variant="subtle">Active now</Badge>
      
      </VStack>

      <Divider borderColor={isDark ? "whiteAlpha.300" : "gray.200"} />

      {/* Sections differ by chat type */}
      {isGroup ? (
        <VStack align="stretch" spacing={2}>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionButton _expanded={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }} borderRadius="md" px={0}>
                <Box as="span" flex="1" textAlign="left" fontWeight="600">Customize chat</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} pb={2}>
                <HStack justify="space-between" p={2} borderRadius="md" _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }}>
                  <HStack>
                    <SunIcon color={iconColor} />
                    <Text>Dark mode</Text>
                  </HStack>
                  <Switch isChecked={isDark} onChange={(e) => setAppTheme(e.target.checked ? "dark" : "light")} />
                </HStack>
                {isGroup && (
                  <HStack justify="space-between" p={2} borderRadius="md" _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }} mt={2}>
                    <Text flex="1">Group name</Text>
                    <input
                      defaultValue={chat?.chatName || ""}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        if (!value || value === chat?.chatName) return;
                        // lazy import to keep top clean
                        (async () => {
                          try {
                            const axios = (await import("axios")).default;
                            const config = { headers: { Authorization: `Bearer ${user.token}` } };
                            const { data } = await axios.put("/api/chat/rename", { chatId: chat._id, chatName: value }, config);
                            setSelectedChat(data);
                            if (Array.isArray(chats)) {
                              const updated = chats.map((c) => (c._id === data._id ? data : c));
                              setChats(updated);
                            }
                          } catch (err) {
                            // silently ignore here; can add toast if desired
                          }
                        })();
                      }}
                      style={{
                        background: isDark ? "#374151" : "white",
                        color: isDark ? "#E5E7EB" : "inherit",
                        border: "1px solid",
                        borderColor: isDark ? "rgba(255,255,255,0.2)" : "#E2E8F0",
                        borderRadius: 6,
                        padding: "6px 10px",
                        minWidth: 160,
                      }}
                    />
                  </HStack>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Divider borderColor={isDark ? "whiteAlpha.300" : "gray.200"} />

          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionButton _expanded={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }} borderRadius="md" px={0}>
                <Box as="span" flex="1" textAlign="left" fontWeight="600">Chat members</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} pb={2}>
                <VStack align="stretch" spacing={1} maxH="260px" overflowY="auto">
                  {(chat?.users || []).map((u) => (
                    <HStack key={u._id} justify="space-between" p={2} borderRadius="md" _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }}>
                      <HStack>
                        <Avatar size="sm" name={u.name} src={u.pic} />
                        <Text>
                          {getDisplayNameForUser(chat, u._id, u.name)}
                          {u._id === user._id ? " (You)" : ""}
                        </Text>
                      </HStack>
                      {u._id !== user._id && (
                        <IconButton
                          aria-label="remove"
                          icon={<SmallCloseIcon />}
                          size="xs"
                          variant="ghost"
                          color={iconColor}
                          onClick={() => handleRemove(u._id)}
                        />
                      )}
                    </HStack>
                  ))}
                </VStack>
                <Box pt={2}>
                  <AddMemberModal chat={chat} />
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      ) : (
        <VStack align="stretch" spacing={2}>
          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionButton _expanded={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }} borderRadius="md" px={0}>
                <Box as="span" flex="1" textAlign="left" fontWeight="600">Customize chat</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} pb={2}>
                <HStack justify="space-between" p={2} borderRadius="md" _hover={{ bg: isDark ? "whiteAlpha.100" : "gray.50" }}>
                  <HStack>
                    <SunIcon color={iconColor} />
                    <Text>Dark mode</Text>
                  </HStack>
                  <Switch isChecked={isDark} onChange={(e) => setAppTheme(e.target.checked ? "dark" : "light")} />
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      )}
    </VStack>
  );
};

export default ChatInfoPanel;


