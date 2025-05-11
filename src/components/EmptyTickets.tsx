import { Box, VStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { Ticket, ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

export default function EmptyTickets() {
  return (
    <Box w="full" py={20} px={4} display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} maxW="md" textAlign="center">
        <Box>
          <Icon as={Ticket} boxSize={16} color="brand.400" />
        </Box>
        <VStack spacing={3}>
          <Heading size="lg">Aún no tienes tickets</Heading>
          <Text color="whiteAlpha.800">
            Explora los próximos eventos y asegura tu lugar comprando tickets. ¡No te pierdas las mejores experiencias!
          </Text>
        </VStack>

        <Button
          as={RouterLink}
          to="/"
          size="lg"
          rightIcon={<ArrowRight size={20} />}
          bgGradient="linear(to-r, brand.500, purple.500)"
          _hover={{
            bgGradient: 'linear(to-r, brand.600, purple.600)',
          }}
        >
          Explorar Eventos
        </Button>
      </VStack>
    </Box>
  );
}
