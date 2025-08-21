import { useNavigate, useParams } from "react-router-dom";
import { Spinner, VStack, Text, Container, Center } from "@chakra-ui/react";

import { useGetEvent } from "../hooks/useGetEvent";
import EventDetail from "../components/EventDetail";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { event, isLoading: isEventLoading } = useGetEvent(id);

  if (isEventLoading) {
    return (
      <Container maxW="container.xl" h="100vh">
        <Center h="70vh">
          <VStack spacing={6}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.600" color="brand.500" size="xl" />
            <Text color="whiteAlpha.700" fontSize="md" textAlign="center">
              Buscando evento...
            </Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  if (!event) {
    navigate("/");
    return null;
  }

  return <EventDetail {...event} />;
}
