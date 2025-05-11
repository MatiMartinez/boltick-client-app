import { Box, Container, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <Box 
      py={4}
      bg="gray.800"
      borderBottom="1px"
      borderColor="whiteAlpha.100"
      position="sticky"
      top="80px"
      zIndex={900}
      backdropFilter="blur(10px)"
    >
      <Container maxW="container.lg">
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Search size={20} color="whiteAlpha.500" />
          </InputLeftElement>
          <Input
            placeholder="Search events, venues, or artists..."
            bg="gray.700"
            border="none"
            borderRadius="2xl"
            _hover={{ bg: 'gray.600' }}
            _focus={{ bg: 'gray.600' }}
            boxShadow="lg"
            fontSize="md"
            height="50px"
          />
        </InputGroup>
      </Container>
    </Box>
  );
}