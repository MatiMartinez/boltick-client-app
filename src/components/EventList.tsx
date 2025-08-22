import { Box, Container, Grid, Heading, VStack, Spinner, Text, Center, Divider } from "@chakra-ui/react";

import { useGetAllEvents } from "../hooks/useGetAllEvents";
import EventCard from "./EventCard";

export default function EventList() {
  const { events, isLoading } = useGetAllEvents();

  // Separar eventos activos e inactivos
  const activeEvents = events.filter((event) => event.isActive === 1);
  const inactiveEvents = events.filter((event) => event.isActive === 0);

  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.800" id="events-section">
      <Container maxW="container.xl">
        <VStack spacing={{ base: 12, md: 20 }}>
          {isLoading ? (
            <Center py={20}>
              <VStack spacing={4}>
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text color="whiteAlpha.700" fontSize="lg">
                  Cargando eventos...
                </Text>
              </VStack>
            </Center>
          ) : (
            <>
              {/* Sección de Próximos Eventos */}
              {activeEvents.length > 0 && (
                <VStack spacing={{ base: 8, md: 12 }} w="full">
                  <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, white, whiteAlpha.800)" bgClip="text" letterSpacing="tight">
                    Próximos Eventos
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                    gap={{ base: 4, md: 8 }}
                    w="full"
                  >
                    {activeEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </Grid>
                </VStack>
              )}

              <Divider />

              {/* Sección de Eventos Finalizados */}
              {inactiveEvents.length > 0 && (
                <VStack spacing={{ base: 8, md: 12 }} w="full">
                  <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, white, whiteAlpha.800)" bgClip="text" letterSpacing="tight">
                    Eventos Finalizados
                  </Heading>
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                    gap={{ base: 4, md: 8 }}
                    w="full"
                  >
                    {inactiveEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </Grid>
                </VStack>
              )}

              {/* Estado vacío cuando no hay eventos */}
              {activeEvents.length === 0 && inactiveEvents.length === 0 && (
                <Center py={20}>
                  <VStack spacing={6}>
                    <Box fontSize="64px" color="brand.400" as="span" aria-label="No events icon">
                      🎪
                    </Box>
                    <Heading size="lg" color="whiteAlpha.900" textAlign="center">
                      No hay eventos disponibles
                    </Heading>
                    <Text color="whiteAlpha.700" fontSize="md" textAlign="center" maxW="md">
                      Mantente atento a nuestras redes sociales para conocer los próximos eventos.
                    </Text>
                  </VStack>
                </Center>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
