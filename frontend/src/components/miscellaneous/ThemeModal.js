import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const themes = [
  { id: "light", name: "Light", preview: "#0084FF" },
  { id: "dark", name: "Dark", preview: "#111827" },
];

const ThemeModal = ({ trigger }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appTheme, setAppTheme } = ChatState();

  const handlePick = (id) => {
    setAppTheme(id);
    onClose();
  };

  return (
    <>
      <Box onClick={onOpen} display="inline-block">{trigger}</Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
              {themes.map((t) => (
                <Button
                  key={t.id}
                  variant={appTheme === t.id ? "solid" : "outline"}
                  onClick={() => handlePick(t.id)}
                  h="70px"
                >
                  <HStack>
                    <Box w={4} h={4} borderRadius="full" bg={t.preview} />
                    <Text>{t.name}</Text>
                  </HStack>
                </Button>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThemeModal;

