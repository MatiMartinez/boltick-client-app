import { ReactNode } from "react";
import { Box, VStack, Text, Progress, useColorModeValue, keyframes, Image } from "@chakra-ui/react";
import useWeb3Context from "../hooks/useWeb3Context";

interface SessionLoadingProps {
  children: ReactNode;
}

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function SessionLoading({ children }: SessionLoadingProps) {
  const { isInitializing } = useWeb3Context();
  const bgGradient = useColorModeValue("linear(to-br, gray.900, purple.900)", "linear(to-br, gray.900, purple.900)");

  if (isInitializing) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient={bgGradient}
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={8} textAlign="center">
          <Box animation={`${pulse} 2s ease-in-out infinite`}>
            <Image src="/logotipo-boltick-white.svg" alt="Boltick" boxSize="180px" filter="drop-shadow(0 0 30px rgba(128, 90, 213, 0.6))" />
          </Box>

          <VStack spacing={2}>
            <Text color="white" fontSize="2xl" fontWeight="bold" letterSpacing="wide">
              Inicializando Web3
            </Text>
            <Text color="purple.200" fontSize="md" opacity={0.9}>
              Conectando con la blockchain
            </Text>
          </VStack>

          <Box width="300px">
            <Progress value={undefined} size="sm" colorScheme="purple" bg="whiteAlpha.200" borderRadius="full" overflow="hidden" position="relative">
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                bgGradient="linear(90deg, transparent, purple.400, transparent)"
                animation="loading 1.5s ease-in-out infinite"
                sx={{
                  "@keyframes loading": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                  },
                }}
              />
            </Progress>
          </Box>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
}
