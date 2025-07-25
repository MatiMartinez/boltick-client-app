import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  Badge,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Calendar, MapPin } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

import { events } from "../consts/events";

export default function EventList() {
  return (
    <Box py={20} bg="gray.800" id="events-section">
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <Heading
            bgGradient="linear(to-r, white, whiteAlpha.800)"
            bgClip="text"
            letterSpacing="tight"
          >
            Próximos Eventos
          </Heading>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={8}
          >
            {events.map((event) => (
              <Box
                key={event.id}
                bg="gray.700"
                borderRadius="2xl"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "2xl",
                }}
                position="relative"
                display="flex"
                flexDirection="column"
              >
                <Box
                  w="100%"
                  aspectRatio={4 / 5}
                  overflow="hidden"
                  borderRadius="xl"
                  bg="gray.700"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={event.image}
                    alt={event.name}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                  />
                </Box>
                <VStack p={6} align="stretch" spacing={2} flex={1}>
                  <Badge
                    alignSelf="flex-start"
                    px={3}
                    py={0.5}
                    borderRadius="full"
                    bg="brand.500"
                    color="white"
                    fontSize="xs"
                  >
                    {event.category}
                  </Badge>
                  <Heading size="md" letterSpacing="tight" mt={1}>
                    {event.name}
                  </Heading>

                  <VStack align="stretch" spacing={2} flex={1} mt={1}>
                    <HStack color="whiteAlpha.700" fontSize="sm">
                      <Calendar size={16} />
                      <Text>{event.date}</Text>
                    </HStack>
                    <HStack color="whiteAlpha.700" fontSize="sm">
                      <MapPin size={16} />
                      <Text>{event.location}</Text>
                    </HStack>
                  </VStack>

                  <Button
                    as={RouterLink}
                    to={`/event/${event.id}`}
                    size="lg"
                    fontSize="md"
                    bgGradient="linear(to-r, brand.500, purple.500)"
                    _hover={{
                      bgGradient: "linear(to-r, brand.600, purple.600)",
                    }}
                    color="whiteAlpha.900"
                    mt={2}
                  >
                    Ir a comprar
                  </Button>
                </VStack>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}
