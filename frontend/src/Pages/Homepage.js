import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="100%" centerContent={false} px={0} py={{ base: 6, md: 10 }}>
      <Box w="full" maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <Box textAlign="center" mb={{ base: 4, md: 6 }}>
          <Heading size="lg" bgGradient="linear(to-r, blue.500, teal.400)" bgClip="text" fontFamily="Work sans">
          VibeLine
          </Heading>
          <Text mt={2} color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            Welcome back. Please sign in or create a new account to continue.
          </Text>
        </Box>
        <Tabs isFitted colorScheme="blue" variant="enclosed">
          <TabList mb={6}>
            <Tab fontWeight="600">Login</Tab>
            <Tab fontWeight="600">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Login />
            </TabPanel>
            <TabPanel px={0}>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
