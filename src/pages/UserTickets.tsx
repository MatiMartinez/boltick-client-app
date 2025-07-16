import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Badge,
  Button,
  HStack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Calendar, MapPin, QrCode, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import useUserTickets from "../hooks/useUserTickets";

export default function UserTickets() {
  const { tickets, isLoading, refreshTickets } = useUserTickets();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleShowQR = (ticket: any) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Flex width="100%" justify="space-between" align="flex-start">
            <VStack spacing={4} align="start">
              <Heading
                size="2xl"
                bgGradient="linear(to-r, white, whiteAlpha.800)"
                bgClip="text"
              >
                Mis Tickets
              </Heading>
              <Text color="whiteAlpha.800" fontSize="lg">
                Gestiona tus tickets a eventos
              </Text>
            </VStack>
            <Button
              leftIcon={<RefreshCw size={20} />}
              onClick={refreshTickets}
              isLoading={isLoading}
              loadingText="Actualizando"
              variant="outline"
              borderColor="brand.400"
            >
              Actualizar
            </Button>
          </Flex>

          {/* UX: Sin tickets */}
          {tickets.length === 0 && !isLoading ? (
            <VStack spacing={6} py={16} w="full">
              <Box fontSize="64px" color="brand.400" as="span" aria-label="Ticket icon">
                🎫
              </Box>
              <Heading size="lg" color="whiteAlpha.900" textAlign="center">
                Aún no tienes tickets comprados.
              </Heading>
              <Text color="whiteAlpha.700" fontSize="md" textAlign="center" maxW="md">
                ¡No te pierdas la oportunidad de vivir una experiencia única! Explora los eventos disponibles y adquiere tus tickets fácilmente.
              </Text>
              <Button
                as="a"
                href="/"
                size="lg"
                colorScheme="brand"
                bgGradient="linear(to-r, brand.500, purple.500)"
                _hover={{ bgGradient: "linear(to-r, brand.600, purple.600)" }}
                px={8}
                py={6}
                fontWeight="bold"
                fontSize="lg"
                borderRadius="xl"
                shadow="md"
              >
                Ver eventos disponibles
              </Button>
            </VStack>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {tickets.map((ticket) => (
                <Box
                  key={ticket.createdAt}
                  bg="gray.700"
                  borderRadius="xl"
                  overflow="hidden"
                  transition="transform 0.2s"
                  _hover={{ transform: "translateY(-4px)" }}
                >
                  <Image
                    src={ticket.imageUrl}
                    alt={ticket.assetId}
                    h="200px"
                    w="full"
                    objectFit="cover"
                  />
                  <VStack p={6} spacing={4} align="stretch">
                    <Badge alignSelf="start" colorScheme="brand">
                      {ticket.type}
                    </Badge>
                    <Heading size="md">{ticket.assetId}</Heading>
                    <VStack spacing={2} align="stretch">
                      <HStack color="whiteAlpha.700">
                        <Calendar size={16} />
                        <Text fontSize="sm">{ticket.assetId}</Text>
                      </HStack>
                      <HStack color="whiteAlpha.700">
                        <MapPin size={16} />
                        <Text fontSize="sm">{ticket.assetId}</Text>
                      </HStack>
                    </VStack>
                    <Text fontSize="sm" color="whiteAlpha.600">
                      ID de Entrada: {ticket.assetId}
                    </Text>
                    <Button
                      leftIcon={<QrCode size={16} />}
                      onClick={() => handleShowQR(ticket)}
                      variant="outline"
                      borderColor="brand.400"
                      _hover={{ bg: "brand.500" }}
                    >
                      Mostrar QR
                    </Button>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.700" maxW="sm">
          <ModalHeader textAlign="center">Código QR de Entrada</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} py={6}>
              <Box
                bg="white"
                p={4}
                borderRadius="xl"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <QRCodeSVG
                  value="https://google.com"
                  size={200}
                  level="H"
                  includeMargin
                />
              </Box>
              {selectedTicket && (
                <VStack spacing={2} align="center">
                  <Text fontWeight="bold">{selectedTicket.eventName}</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">
                    ID: {selectedTicket.ticketId}
                  </Text>
                </VStack>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
