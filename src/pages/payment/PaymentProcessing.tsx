import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, VStack, Heading, Text, Button, Icon, Spinner } from '@chakra-ui/react';
import { Clock } from 'lucide-react';

import useUpdatePayment from '../../hooks/useUpdatePayment';

export default function PaymentProcessing() {
  useUpdatePayment();

  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Icon as={Clock} boxSize={16} color="yellow.400" />
          <Heading size="xl">Pago en Proceso</Heading>
          <Text color="whiteAlpha.800" fontSize="lg">
            Estamos validando tu pago. Este proceso puede tomar unos minutos.
          </Text>
          <Spinner size="xl" color="yellow.400" />
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
