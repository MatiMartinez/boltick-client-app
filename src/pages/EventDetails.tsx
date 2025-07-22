import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Badge,
  Divider,
  IconButton,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Calendar, MapPin, Users, Clock, Plus, Minus } from "lucide-react";

import useTicketPurchase from "../hooks/useTicketPurchase";
import { formatARS } from "../utils/currency";

export default function EventDetails() {
  const {
    event,
    handleQuantityChange,
    isLoading,
    onPurchase,
    quantities,
    summary,
  } = useTicketPurchase();

  return (
    <Box py={{ base: 5, md: 10 }}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={12}>
          {/* Left Column - Event Details */}
          <VStack align="stretch" spacing={8}>
            <Image
              src={event.image}
              alt={event.name}
              borderRadius="2xl"
              objectFit="cover"
              h={{ base: "200px", md: "350px" }}
            />

            <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
              <Heading size="2xl">{event.name}</Heading>

              <HStack spacing={6}>
                <Badge colorScheme="brand" fontSize="md" px={3} py={1}>
                  {event.category}
                </Badge>
                <Text color="whiteAlpha.700">Evento #{event.edition}</Text>
              </HStack>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={{ base: 2, md: 6 }}
              >
                <HStack color="whiteAlpha.800">
                  <Calendar size={20} />
                  <Text>{event.date}</Text>
                </HStack>
                <HStack color="whiteAlpha.800">
                  <Clock size={20} />
                  <Text>{event.time}</Text>
                </HStack>
                <HStack color="whiteAlpha.800">
                  <MapPin size={20} />
                  <Link
                    href="https://maps.app.goo.gl/y3SvdpuJysCQcZyv9"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    <Text>{event.location}</Text>
                  </Link>
                </HStack>
              </Grid>

              <Divider borderColor="whiteAlpha.200" />

              <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
                <Heading size="md">Sobre este Evento</Heading>
                <Text
                  color="whiteAlpha.800"
                  lineHeight="tall"
                  whiteSpace="pre-line"
                >
                  {event.description}
                </Text>
              </VStack>

              <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
                <Heading size="md">Artistas Destacados</Heading>
                <VStack align="flex-start">
                  {event.artists.map((artist, index) => (
                    <Text key={index} color="whiteAlpha.800">
                      • {artist.name} - {artist.description}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </VStack>
          </VStack>

          {/* Right Column - Ticket Selection */}
          <VStack align="stretch" spacing={{ base: 2, md: 6 }}>
            <Heading size="lg">Seleccionar Entradas</Heading>

            <HStack color="whiteAlpha.700" mb={{ base: 2, md: 0 }}>
              <Users size={20} />
              <Text>Disponibilidad limitada</Text>
            </HStack>

            {event.tickets.map((ticket) => (
              <Box key={ticket.id} p={6} bg="gray.600" borderRadius="xl">
                <VStack align="stretch" spacing={4}>
                  <Flex justify="space-between" align="center">
                    <Heading size="md">{ticket.name}</Heading>
                    <Text color="brand.400" fontSize="lg" fontWeight="bold">
                      {formatARS(ticket.price)}
                    </Text>
                  </Flex>
                  <Text color="whiteAlpha.700">{ticket.description}</Text>
                  <HStack justify="space-between" align="center">
                    <Text fontSize="sm" color="whiteAlpha.600">
                      Unidades limitadas
                    </Text>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Reducir cantidad"
                        icon={<Minus size={16} />}
                        onClick={() => handleQuantityChange(ticket.id, false)}
                        isDisabled={quantities[ticket.id] === 0}
                        variant="outline"
                        size="sm"
                      />
                      <Text
                        w="40px"
                        textAlign="center"
                        fontSize="lg"
                        fontWeight="medium"
                      >
                        {quantities[ticket.id]}
                      </Text>
                      <IconButton
                        aria-label="Aumentar cantidad"
                        icon={<Plus size={16} />}
                        onClick={() => handleQuantityChange(ticket.id, true)}
                        isDisabled={quantities[ticket.id] === 10}
                        variant="outline"
                        size="sm"
                      />
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            ))}

            {summary.selectedTickets.length > 0 && (
              <VStack
                align="stretch"
                bg="gray.600"
                p={6}
                borderRadius="xl"
                spacing={4}
              >
                <Heading size="md">Resumen</Heading>
                {summary.selectedTickets.map((tier) => (
                  <Box key={tier.id}>
                    <Flex justify="space-between">
                      <Text>
                        {quantities[tier.id]}x {tier.name}
                      </Text>
                      <Text fontWeight="bold">
                        {formatARS(tier.price * quantities[tier.id])}
                      </Text>
                    </Flex>
                    <Flex
                      justify="space-between"
                      fontSize="sm"
                      color="whiteAlpha.700"
                      pl={4}
                    >
                      <Text>Subtotal</Text>
                      <Text>
                        {formatARS(tier.priceWithoutTax * quantities[tier.id])}
                      </Text>
                    </Flex>
                    <Flex
                      justify="space-between"
                      fontSize="sm"
                      color="whiteAlpha.700"
                      pl={4}
                    >
                      <Text>Cargo por servicio</Text>
                      <Text>{formatARS(tier.tax * quantities[tier.id])}</Text>
                    </Flex>
                  </Box>
                ))}
                <Divider borderColor="whiteAlpha.200" />
                <Flex justify="space-between">
                  <Text fontWeight="bold">Total</Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.400">
                    {formatARS(summary.total)}
                  </Text>
                </Flex>
              </VStack>
            )}

            <Button
              size="lg"
              height="60px"
              fontSize="lg"
              bgGradient="linear(to-r, brand.500, purple.500)"
              _hover={{
                bgGradient: "linear(to-r, brand.600, purple.600)",
              }}
              color="whiteAlpha.900"
              isDisabled={summary.selectedTickets.length === 0}
              isLoading={isLoading}
              loadingText="Procesando compra..."
              onClick={onPurchase}
            >
              {summary.selectedTickets.length === 0
                ? "Selecciona tus entradas"
                : `Comprar • ${formatARS(summary.total)}`}
            </Button>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}
