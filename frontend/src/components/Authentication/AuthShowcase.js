import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const floatAnim = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
`;

const AuthShowcase = () => {
  return (
    <Box position="relative" minH={{ base: "280px", md: "520px" }}>
      <Box
        h="full"
        w="full"
        borderRadius="2xl"
        bgGradient="linear(to-br, blue.500, purple.500)"
        position="relative"
        overflow="hidden"
        boxShadow="lg"
      >
        {/* soft radial spotlights */}
        <Box
          position="absolute"
          top="-20%"
          right="-10%"
          w="70%"
          h="70%"
          bgGradient="radial(circle at 50% 50%, rgba(255,255,255,0.28), transparent 60%)"
          filter="blur(12px)"
        />
        <Box
          position="absolute"
          bottom="-25%"
          left="-15%"
          w="80%"
          h="70%"
          bgGradient="radial(circle at 50% 50%, rgba(255,255,255,0.24), transparent 65%)"
          filter="blur(14px)"
        />

        {/* animated glass blobs */}
        <Box
          position="absolute"
          top="18%"
          left="12%"
          w="180px"
          h="140px"
          bg="whiteAlpha.300"
          borderRadius="40px"
          backdropFilter="auto"
          backdropBlur="6px"
          boxShadow="xl"
          animation={`${floatAnim} 7s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          top="46%"
          right="16%"
          w="220px"
          h="160px"
          bg="whiteAlpha.200"
          borderRadius="50px"
          backdropFilter="auto"
          backdropBlur="8px"
          animation={`${floatAnim} 9s ease-in-out infinite`}
        />

        {/* Floating stat card */}
        <Box
          position="absolute"
          top={{ base: 5, md: 8 }}
          left={{ base: 5, md: 8 }}
          bg="white"
          p={4}
          borderRadius="xl"
          boxShadow="2xl"
          minW="200px"
        >
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold">Activity</Text>
            <Badge colorScheme="green">+12%</Badge>
          </HStack>
          <Text fontSize="3xl" fontWeight="800">176,18</Text>
          <Text fontSize="xs" color="gray.500">weekly messages</Text>
        </Box>

        {/* Floating info card */}
        <Box
          position="absolute"
          bottom={{ base: 5, md: 8 }}
          right={{ base: 5, md: 8 }}
          bg="white"
          p={4}
          borderRadius="xl"
          boxShadow="2xl"
          maxW="260px"
        >
          <Text fontWeight="semibold" mb={1}>Your data, your rules</Text>
          <Text fontSize="xs" color="gray.600">
            Choose what to share. We never post to your channels without permission.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthShowcase;


