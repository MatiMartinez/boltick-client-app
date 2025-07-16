import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <Box bg="gray.900" borderTop="1px" borderColor="whiteAlpha.50">
      <Container maxW="container.xl" py={12}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          gap={8}
        >
          <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
            <img
              src="/logotipo-boltick-white.svg"
              alt="Boltick Logo"
              width={120}
            />
            <Text color="whiteAlpha.600">Tus Tickets, Tus Reglas</Text>
          </VStack>

          <HStack spacing={6}>
            <Link
              href="#"
              color="whiteAlpha.600"
              _hover={{ color: "brand.400" }}
              transition="color 0.2s"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="#"
              color="whiteAlpha.600"
              _hover={{ color: "brand.400" }}
              transition="color 0.2s"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="#"
              color="whiteAlpha.600"
              _hover={{ color: "brand.400" }}
              transition="color 0.2s"
            >
              <Instagram size={18} />
            </Link>
          </HStack>
        </Flex>

        <Text mt={12} textAlign="center" color="whiteAlpha.400" fontSize="sm">
          © 2025 BOLTICK. Powered by Blockchain Technology.
        </Text>
      </Container>
    </Box>
  );
}
