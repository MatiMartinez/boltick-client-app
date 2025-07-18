import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Icon,
  HStack,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { Mail, Phone, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <Box py={{ base: 5, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, white, whiteAlpha.800)"
              bgClip="text"
            >
              Contáctanos
            </Heading>
            <Text color="whiteAlpha.800" fontSize="lg" maxW="600px">
              ¿Tienes preguntas sobre nuestra plataforma o necesitas ayuda?
              ¡Estamos aquí para ayudarte!
            </Text>
          </VStack>

          {/* Contact Information */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <VStack
              p={8}
              bg="gray.700"
              borderRadius="xl"
              spacing={4}
              align="start"
            >
              <Icon as={Mail} boxSize={6} color="brand.400" />
              <Text fontWeight="semibold">Correo Electrónico</Text>
              <Text color="whiteAlpha.700">boltick.entrada@gmail.com</Text>
            </VStack>

            <VStack
              p={8}
              bg="gray.700"
              borderRadius="xl"
              spacing={4}
              align="start"
            >
              <Icon as={Phone} boxSize={6} color="brand.400" />
              <Text fontWeight="semibold">Teléfono</Text>
              <Text color="whiteAlpha.700">+54 2634 371155</Text>
            </VStack>
          </SimpleGrid>

          {/* Social Media */}
          <VStack spacing={8} align="center">
            <Heading size="lg">Síguenos en Redes Sociales</Heading>
            <HStack spacing={8}>
              <Link
                href="https://www.instagram.com/boltick.web/"
                target="_blank"
                color="whiteAlpha.700"
                _hover={{ color: "brand.400" }}
                transition="color 0.2s"
              >
                <Icon as={Instagram} boxSize={6} />
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
