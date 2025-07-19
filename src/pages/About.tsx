import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Target } from "lucide-react";

import { innovations } from "../consts/about";

export default function About() {
  return (
    <Box py={{ base: 5, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={20}>
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, white, whiteAlpha.800)"
              bgClip="text"
            >
              Tus Tickets, Tus Reglas <br /> La Revolución Comienza
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.800">
              Boltick revoluciona el futuro de la venta de entradas a través de
              la tecnología blockchain, transformando las entradas tradicionales
              en NFTs para garantizar mayor seguridad, transparencia y
              accesibilidad.
            </Text>
          </VStack>

          {/* <VStack spacing={12}>
            <Heading size="xl">Nuestro Equipo</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {teamMembers.map((member, index) => (
                <VStack
                  key={index}
                  spacing={4}
                  p={6}
                  bg="gray.700"
                  borderRadius="xl"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    borderRadius="full"
                    boxSize="150px"
                    objectFit="cover"
                  />
                  <VStack spacing={1}>
                    <Heading size="md">{member.name}</Heading>
                    <Text color="whiteAlpha.700">{member.role}</Text>
                  </VStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack> */}

          <VStack spacing={8} align="stretch">
            <Heading size="xl">Innovaciones</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {innovations.map((milestone, index) => (
                <HStack
                  key={index}
                  bg="gray.700"
                  p={6}
                  borderRadius="xl"
                  spacing={6}
                >
                  <Icon as={Target} boxSize={6} color="brand.400" />
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{milestone.title}</Heading>
                    <Text color="whiteAlpha.700">{milestone.description}</Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
