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
} from '@chakra-ui/react';
import { Calendar, MapPin, QrCode, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import useUserTickets from '../hooks/useUserTickets';

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
              <Heading size="2xl" bgGradient="linear(to-r, white, whiteAlpha.800)" bgClip="text">
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
              _hover={{ bg: 'brand.500' }}
            >
              Actualizar
            </Button>
          </Flex>

          {tickets.length === 0 ? (
            <>asd</>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {tickets.map((ticket) => (
                <Box
                  key={ticket.createdAt}
                  bg="gray.700"
                  borderRadius="xl"
                  overflow="hidden"
                  transition="transform 0.2s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  <Image src={ticket.imageUrl} alt={ticket.name} h="200px" w="full" objectFit="cover" />
                  <VStack p={6} spacing={4} align="stretch">
                    <Badge alignSelf="start" colorScheme="brand">
                      {ticket.type}
                    </Badge>
                    <Heading size="md">{ticket.name}</Heading>
                    <VStack spacing={2} align="stretch">
                      <HStack color="whiteAlpha.700">
                        <Calendar size={16} />
                        <Text fontSize="sm">{ticket.name}</Text>
                      </HStack>
                      <HStack color="whiteAlpha.700">
                        <MapPin size={16} />
                        <Text fontSize="sm">{ticket.name}</Text>
                      </HStack>
                    </VStack>
                    <Text fontSize="sm" color="whiteAlpha.600">
                      ID de Entrada: {ticket.name}
                    </Text>
                    <Button
                      leftIcon={<QrCode size={16} />}
                      onClick={() => handleShowQR(ticket)}
                      variant="outline"
                      borderColor="brand.400"
                      _hover={{ bg: 'brand.500' }}
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
              <Box bg="white" p={4} borderRadius="xl" display="flex" justifyContent="center" alignItems="center">
                <QRCodeSVG value="https://google.com" size={200} level="H" includeMargin />
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
