import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, VStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { XCircle } from 'lucide-react';

import useUpdatePayment from '../../hooks/useUpdatePayment';

export default function PaymentError() {
  useUpdatePayment();

  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Icon as={XCircle} boxSize={16} color="red.400" />
          <Heading size="xl">Error en el Pago</Heading>
          <Text color="whiteAlpha.800" fontSize="lg">
            Lo sentimos, hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
          </Text>
          <Button
            as={RouterLink}
            to="/"
            size="lg"
            bgGradient="linear(to-r, brand.500, purple.500)"
            _hover={{
              bgGradient: 'linear(to-r, brand.600, purple.600)',
            }}
          >
            Volver al Inicio
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
