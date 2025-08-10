import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Box, Text, SimpleGrid, HStack, IconButton } from "@chakra-ui/react";
import AuthShowcase from "./AuthShowcase";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <Box w="full">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 10 }}>
        {/* Left: Form card */}
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          borderWidth="1px"
          p={{ base: 4, md: 8 }}
        >
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Sign Up
          </Text>
          <Text color="gray.500" mb={6} mt={1}>
            Create your VibeLine account and start chatting instantly.
          </Text>

          <VStack spacing={4} align="stretch">
            <FormControl id="first-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.400" />} />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="blue.400"
                />
              </InputGroup>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.400" />} />
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="blue.400"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="password-confirm" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.400" />} />
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  focusBorderColor="blue.400"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="pic">
              <FormLabel>Upload your picture</FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </FormControl>

            <Button colorScheme="blue" w="100%" mt={2} onClick={submitHandler} isLoading={picLoading}>
              Create account
            </Button>

            <HStack spacing={3} justify="center" pt={2} color="gray.500">
              <Text fontSize="sm">Or continue with</Text>
              <HStack spacing={2}>
                <IconButton aria-label="alt-1" size="sm" variant="ghost" icon={<EmailIcon />} />
                <IconButton aria-label="alt-2" size="sm" variant="ghost" icon={<LockIcon />} />
              </HStack>
            </HStack>
          </VStack>
        </Box>

        {/* Right: Illustration area */}
        <AuthShowcase />
      </SimpleGrid>
    </Box>
  );
};

export default Signup;
