import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

import { useScrollTo } from '../hooks/useScrollTo';

export default function Banner() {
  const scrollTo = useScrollTo();

  return (
    <Box
      minH="60vh"
      position="relative"
      pt={20}
      bgGradient="linear(to-b, gray.900, gray.800)"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '140%',
        height: '140%',
        bgGradient: 'radial(circle, whiteAlpha.50 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    >
      <Container maxW="container.xl" h="full" position="relative">
        <VStack h="full" justify="center" align="center" spacing={8} textAlign="center" pt={{ md: 20 }}>
          <Box
            position="absolute"
            top="20%"
            left="50%"
            transform="translateX(-50%)"
            width="600px"
            height="600px"
            bgGradient="radial(circle, brand.500 0%, transparent 70%)"
            opacity={0.1}
            filter="blur(100px)"
          />
          <Heading
            size="2xl"
            maxW="800px"
            bgGradient="linear(to-r, white, whiteAlpha.800)"
            bgClip="text"
            letterSpacing="tight"
            lineHeight="1.2"
          >
            El Futuro de la Venta de Entradas está Aquí
          </Heading>
          <Text fontSize="xl" maxW="600px" color="whiteAlpha.800">
            Venta de entradas segura, transparente y descentralizada impulsada por tecnología blockchain
          </Text>
          <Button
            size="lg"
            px={8}
            py={6}
            fontSize="md"
            bgGradient="linear(to-r, brand.500, purple.500)"
            _hover={{
              bgGradient: 'linear(to-r, brand.600, purple.600)',
            }}
            color="whiteAlpha.900"
            onClick={() => scrollTo('events-section')}
          >
            Descubrir Eventos
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
