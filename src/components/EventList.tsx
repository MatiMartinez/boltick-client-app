import { Box, Container, Grid, Heading, VStack, Spinner, Text, Center } from "@chakra-ui/react";

import { useGetAllEvents } from "../hooks/useGetAllEvents";
import EventCard from "./EventCard";

export default function EventList() {
  const { events, isLoading } = useGetAllEvents();

  return (
    <Box py={{ base: 12, md: 20 }} bg="gray.800" id="events-section">
      <Container maxW="container.xl">
        <VStack spacing={{ base: 8, md: 16 }}>
          <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, white, whiteAlpha.800)" bgClip="text" letterSpacing="tight">
            Próximos Eventos
          </Heading>

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
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: 4, md: 8 }}
            >
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
