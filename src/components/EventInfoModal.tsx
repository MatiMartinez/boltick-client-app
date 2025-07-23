import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Heading,
  Box,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { Calendar, MapPin, ExternalLink, Clock } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Event } from "../models/event";

interface EventInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function EventInfoModal({
  isOpen,
  onClose,
  event,
}: EventInfoModalProps) {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.700" maxW="sm" borderRadius="2xl" boxShadow="2xl">
        <ModalHeader textAlign="center" pb={0}>
          Detalles del Evento
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={4} pb={6} pt={6}>
          <VStack spacing={2} align="center">
            <Box
              w="100%"
              aspectRatio={5 / 6}
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
            <Heading size="lg" color="whiteAlpha.900" textAlign="center" mb={2}>
              {event.name}
            </Heading>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              color="whiteAlpha.700"
            >
              <Calendar size={18} />
              <Text fontSize="md" fontWeight="medium">
                {event.date}
              </Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              color="whiteAlpha.700"
            >
              <Clock size={18} />
              <Text fontSize="md" fontWeight="medium">
                {event.time}
              </Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              color="whiteAlpha.700"
            >
              <MapPin size={18} />
              <Link
                href={event.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                <Text fontSize="md" fontWeight="medium">
                  Ver ubicación
                </Text>
              </Link>
            </Box>

            <Button
              as={RouterLink}
              to={`/event/${event.id}`}
              width="100%"
              size="lg"
              fontSize="md"
              bgGradient="linear(to-r, brand.500, purple.500)"
              _hover={{ bgGradient: "linear(to-r, brand.600, purple.600)" }}
              color="white"
              mt={4}
            >
              Ir al evento
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
