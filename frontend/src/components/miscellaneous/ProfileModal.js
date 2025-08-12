import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  VStack,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUser } = ChatState();
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(user?.name || "");
  const [pic, setPic] = React.useState(user?.pic || "");
  const [saving, setSaving] = React.useState(false);

  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  const save = async () => {
    try {
      setSaving(true);
      const config = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}` } };
      const { data } = await axios.put("/api/user/profile", { name, pic }, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setEditing(false);
    } catch (e) {
      // handle silently for now
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4} align="center" justify="center">
                <Image borderRadius="full" boxSize="120px" src={pic} alt={name} />
              </HStack>
              <VStack spacing={2} align="stretch">
                <Text fontSize="sm" color="gray.500">Email</Text>
                <Text>{user.email}</Text>
                <Divider />
                {editing ? (
                  <>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Profile image URL</FormLabel>
                      <Input value={pic} onChange={(e) => setPic(e.target.value)} />
                    </FormControl>
                  </>
                ) : (
                  <>
                    <Text><b>Name:</b> {name}</Text>
                  </>
                )}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack w="full" justify="space-between">
              <Button variant="ghost" onClick={logout}>Logout</Button>
              <HStack>
                <Button variant="ghost" onClick={onClose}>Close</Button>
                {editing ? (
                  <Button colorScheme="blue" isLoading={saving} onClick={save}>Save</Button>
                ) : (
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                )}
              </HStack>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
