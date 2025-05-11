import {
  Box,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

import WalletButton from './WalletButton';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as="nav"
        py={6}
        borderBottom="1px"
        borderColor="whiteAlpha.100"
        backdropFilter="blur(10px)"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Container maxW="container.xl">
          <VStack spacing={4}>
            <Flex w="full" justify="space-between" align="center">
              <HStack spacing={4}>
                <Button variant="ghost" onClick={onOpen} p={2}>
                  <Menu size={24} />
                </Button>

                <ChakraLink as={RouterLink} to="/">
                  <HStack spacing={3}>
                    <Box fontSize="xl" fontWeight="600" letterSpacing="tight">
                      BOLTICK
                    </Box>
                  </HStack>
                </ChakraLink>
              </HStack>

              {/* <Hide below="md">
                <Box flex={1} mx={8}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Search size={20} color="whiteAlpha.500" />
                    </InputLeftElement>
                    <Input
                      placeholder="Buscar eventos, lugares o artistas..."
                      bg="gray.700"
                      border="none"
                      borderRadius="xl"
                      _hover={{ bg: 'gray.600' }}
                      _focus={{ bg: 'gray.600' }}
                    />
                  </InputGroup>
                </Box>
              </Hide> */}

              <WalletButton />
            </Flex>

            {/* <Show below="md">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search size={20} color="whiteAlpha.500" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar eventos, lugares o artistas..."
                  bg="gray.700"
                  border="none"
                  borderRadius="xl"
                  _hover={{ bg: 'gray.600' }}
                  _focus={{ bg: 'gray.600' }}
                />
              </InputGroup>
            </Show> */}
          </VStack>
        </Container>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton mt={2} mr={1} />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4} pt={4}>
              <Button as={RouterLink} to="/" variant="ghost" justifyContent="flex-start" onClick={onClose}>
                Inicio
              </Button>
              <Button as={RouterLink} to="/about" variant="ghost" justifyContent="flex-start" onClick={onClose}>
                Nosotros
              </Button>
              <Button as={RouterLink} to="/contact" variant="ghost" justifyContent="flex-start" onClick={onClose}>
                Contacto
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
