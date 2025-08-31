import { Box, Image, VStack, Badge, HStack, Button, Heading, Text } from "@chakra-ui/react";
import { Calendar, MapPin, Eye, ShoppingCart } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Event } from "../models/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const isEventActive = event.isActive === 1;
  const buttonText = isEventActive ? "Ir a comprar" : "Ver evento";
  const buttonIcon = isEventActive ? <ShoppingCart size={16} /> : <Eye size={16} />;

  return (
    <Box
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
        aspectRatio={{ base: 3 / 4, md: 3 / 4 }}
        overflow="hidden"
        borderRadius="xl"
        borderLeftRadius="0"
        borderRightRadius="0"
        bg="gray.700"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {event.image ? (
          <Image src={event.image} alt={event.name} w="100%" h="100%" objectFit="contain" />
        ) : (
          <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center" bg="gray.600" borderRadius="xl">
            <Box fontSize="64px" color="brand.400" as="span" aria-label="Event icon">
              🎪
            </Box>
          </Box>
        )}
      </Box>
      <VStack p={{ base: 5, md: 6 }} align="stretch" spacing={{ base: 1, md: 2 }} flex={1}>
        <Badge alignSelf="flex-start" px={{ base: 2, md: 3 }} py={0.5} borderRadius="full" bg="brand.500" color="white" fontSize="xs">
          {event.category}
        </Badge>
        <Heading size={{ base: "sm", md: "md" }} letterSpacing="tight" mt={1}>
          {event.name}
        </Heading>

        <VStack align="stretch" spacing={{ base: 1, md: 2 }} flex={1} mt={1}>
          <HStack color="whiteAlpha.700" fontSize={{ base: "xs", md: "sm" }}>
            <Calendar size={14} />
            <Text>{event.date}</Text>
          </HStack>
          <HStack color="whiteAlpha.700" fontSize={{ base: "xs", md: "sm" }}>
            <MapPin size={14} />
            <Text>{event.location}</Text>
          </HStack>
        </VStack>

        <Button
          as={RouterLink}
          to={`/event/${event.id}`}
          size={{ base: "md", md: "lg" }}
          fontSize={{ base: "xs", md: "md" }}
          bgGradient="linear(to-r, brand.500, purple.500)"
          _hover={{
            bgGradient: "linear(to-r, brand.600, purple.600)",
          }}
          color="whiteAlpha.900"
          mt={{ base: 2 }}
          leftIcon={buttonIcon}
        >
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
}
