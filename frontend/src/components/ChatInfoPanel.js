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
} from "@chakra-ui/react";
import { ChevronRightIcon, SearchIcon, BellIcon, SettingsIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ProfileModal from "./miscellaneous/ProfileModal";
import { ChatState } from "../Context/ChatProvider";
import { getSenderFull } from "../config/ChatLogics";

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

const MediaGrid = () => (
  <Grid templateColumns="repeat(3, 1fr)" gap={3} w="full">
    {Array.from({ length: 12 }).map((_, idx) => (
      <GridItem key={idx} bg="whiteAlpha.200" borderRadius="md" h="70px" />
    ))}
  </Grid>
);

const ChatInfoPanel = ({ chat, variant = "dark" }) => {
  const { user } = ChatState();
  const isGroup = Boolean(chat?.isGroupChat);
  const otherUser = !isGroup && chat ? getSenderFull(user, chat.users) : null;

  return (
    <VStack
      w={{ base: "0", xl: "22%" }}
      display={{ base: "none", xl: "flex" }}
      h="full"
      p={4}
      spacing={4}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      color="inherit"
      align="stretch"
    >
      {/* Header */}
      <VStack spacing={2} align="center" py={2}>
        <Avatar size="xl" name={isGroup ? chat?.chatName : otherUser?.name} src={isGroup ? undefined : otherUser?.pic} />
        <Text fontWeight="700" fontSize="lg" noOfLines={1}>
          {isGroup ? chat?.chatName : otherUser?.name}
        </Text>
        <Badge colorScheme="green" variant="subtle">Active now</Badge>
        <HStack pt={2}>
          <IconButton aria-label="mute" icon={<BellIcon />} size="sm" variant="ghost" />
          <IconButton aria-label="search" icon={<SearchIcon />} size="sm" variant="ghost" />
          <IconButton aria-label="settings" icon={<SettingsIcon />} size="sm" variant="ghost" />
        </HStack>
      </VStack>

      <Divider borderColor="gray.200" />

      {/* Sections differ by chat type */}
      {isGroup ? (
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="700">Chat info</Text>
          <SectionRow label="Change chat name" />
          <SectionRow label="Change photo" />
          <SectionRow label="Change theme" />
          <SectionRow label="Change emoji" />
          <SectionRow label="Edit nicknames" />

          <Divider borderColor="gray.200" />

          <Text fontWeight="700">Chat members</Text>
          <UpdateGroupChatModal>
            <Button colorScheme="blue" size="sm" alignSelf="start">Manage members</Button>
          </UpdateGroupChatModal>

          <Divider borderColor="gray.200" />

          <Text fontWeight="700">Media, files and links</Text>
          <MediaGrid />

          <Divider borderColor="gray.200" />

          <Text fontWeight="700">Privacy & support</Text>
          <SectionRow label="Block" />
          <SectionRow label="Report" />
        </VStack>
      ) : (
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="700">Chat info</Text>
          {otherUser && (
            <ProfileModal user={otherUser}>
              <Button size="sm" colorScheme="blue" alignSelf="start">View profile</Button>
            </ProfileModal>
          )}

          <Divider borderColor="gray.200" />

          <Text fontWeight="700">Customize chat</Text>
          <SectionRow label="Change theme" />
          <SectionRow label="Change emoji" />
          <SectionRow label="Edit nicknames" />

          <Divider borderColor={variant === "dark" ? "whiteAlpha.300" : "gray.200"} />

          <Text fontWeight="700">Media & files</Text>
          <MediaGrid />

          <Divider borderColor={variant === "dark" ? "whiteAlpha.300" : "gray.200"} />

          <Text fontWeight="700">Privacy & support</Text>
          <SectionRow label="Block" />
          <SectionRow label="Report" />
        </VStack>
      )}
    </VStack>
  );
};

export default ChatInfoPanel;


