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
import { HelpCircle } from "lucide-react";

import useUpdatePayment from "../../hooks/useUpdatePayment";

export default function PaymentUnknown() {
  const { isLoading } = useUpdatePayment();

  if (isLoading) {
    return (
      <Box py={20} textAlign="center">
        <Spinner size="xl" color="gray.400" />
        <Text mt={4}>Actualizando pago...</Text>
      </Box>
    );
  }

  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Icon as={HelpCircle} boxSize={16} color="gray.400" />
          <Heading size="xl">Estado Desconocido</Heading>
          <Text color="whiteAlpha.800" fontSize="lg">
            Ha ocurrido un error inesperado. Por favor, contacta con soporte si
            el problema persiste.
          </Text>
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
