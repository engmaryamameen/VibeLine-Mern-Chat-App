import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/input";
import { VStack, Stack } from "@chakra-ui/layout";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Box, Text, SimpleGrid, HStack, IconButton } from "@chakra-ui/react";
import AuthShowcase from "./AuthShowcase";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <Box w="full">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 10 }}>
        {/* Left: Form card */}
        <Box bg="white" borderRadius="xl" boxShadow="lg" borderWidth="1px" p={{ base: 4, md: 8 }}>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Login
          </Text>
          <Text color="gray.500" mb={6} mt={1}>
            Welcome back! Enter your credentials to continue.
          </Text>

          <VStack spacing={4} align="stretch">
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.400" />} />
                <Input
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  focusBorderColor="blue.400"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick} variant="ghost">
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={4} direction={{ base: "column", sm: "row" }} align="stretch">
              <Button colorScheme="blue" w={{ base: "100%", sm: "70%" }} onClick={submitHandler} isLoading={loading}>
                Login
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                w={{ base: "100%", sm: "30%" }}
                onClick={() => {
                  setEmail("guest@example.com");
                  setPassword("123456");
                }}
              >
                Use Guest
              </Button>
            </Stack>

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

export default Login;
