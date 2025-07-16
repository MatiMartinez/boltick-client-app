import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@chakra-ui/react";

import useSession from "../hooks/useSession";

export default function Profile() {
  const { walletAddress, userInfo } = useSession();
  const toast = useToast();

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Dirección copiada",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={12}>
          <VStack spacing={6}>
            <Avatar
              size="2xl"
              src={userInfo?.profileImage}
              name={userInfo?.name || "Usuario"}
            />
            <VStack spacing={2}>
              <Heading size="xl">{userInfo?.name || "Usuario"}</Heading>
              <Text color="whiteAlpha.700">{userInfo?.email}</Text>
            </VStack>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            <VStack
              align="stretch"
              p={6}
              bg="gray.700"
              borderRadius="xl"
              spacing={4}
            >
              <Heading size="md">Dirección de Billetera</Heading>
              <HStack justify="space-between">
                <Text fontSize="sm" color="whiteAlpha.800">
                  {walletAddress}
                </Text>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyAddress}
                    title="Copiar dirección"
                  >
                    <Copy size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    as="a"
                    href={`https://etherscan.io/address/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver en Etherscan"
                  >
                    <ExternalLink size={16} />
                  </Button>
                </HStack>
              </HStack>
            </VStack>

            <VStack
              align="stretch"
              p={6}
              bg="gray.700"
              borderRadius="xl"
              spacing={4}
            >
              <Heading size="md">Información de Cuenta</Heading>
              <VStack align="stretch" spacing={2}>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Tipo de Autenticación
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900">
                  {userInfo?.typeOfLogin || "Web3Auth"}
                </Text>
              </VStack>
              <Divider borderColor="whiteAlpha.200" />
              <VStack align="stretch" spacing={2}>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Miembro desde
                </Text>
                <Text fontSize="sm" color="whiteAlpha.900">
                  {new Date().toLocaleDateString()}
                </Text>
              </VStack>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
