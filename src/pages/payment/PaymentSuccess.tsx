import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { CheckCircle } from "lucide-react";

import useUpdatePayment from "../../hooks/useUpdatePayment";
import useSession from "../../hooks/useSession";

export default function PaymentSuccess() {
  const { isLoading } = useUpdatePayment();
  const { isConnected } = useSession();

  if (isLoading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" color="green.400" />
        <Text mt={4}>Actualizando pago...</Text>
      </Box>
    );
  }

  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={6} textAlign="center">
          <Icon as={CheckCircle} boxSize={16} color="green.400" />
          <Heading size="xl">¡Pago Exitoso!</Heading>
          <Text color="whiteAlpha.800" fontSize="lg">
            Tu compra ha sido procesada correctamente.
          </Text>
          <Text color="yellow.300" fontSize="md">
            Recuerda: tus tickets NFT pueden demorar unos minutos en aparecer en
            tu billetera.
          </Text>
          {isConnected ? (
            <>
              <Text color="whiteAlpha.800" fontSize="md">
                Puedes ver y gestionar tus tickets en la sección "Mis Tickets".
              </Text>
              <Button
                as={RouterLink}
                to="/tickets"
                size="lg"
                bgGradient="linear(to-r, brand.500, purple.500)"
                _hover={{ bgGradient: "linear(to-r, brand.600, purple.600)" }}
              >
                Ir a Mis Tickets
              </Button>
            </>
          ) : null}
          <Button
            as={RouterLink}
            to="/"
            size="lg"
            bgGradient="linear(to-r, brand.500, purple.500)"
            _hover={{
              bgGradient: "linear(to-r, brand.600, purple.600)",
            }}
          >
            Volver al Inicio
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
