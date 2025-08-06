import { Box, Button, Container, Text, VStack } from "@chakra-ui/react";

import { useScrollTo } from "../hooks/useScrollTo";

export default function Banner() {
  const scrollTo = useScrollTo();

  return (
    <Box
      minH={{ base: "40vh", md: "50vh" }}
      position="relative"
      pt={{ base: 16, md: 20 }}
      bgGradient="linear(to-b, gray.900, gray.800)"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "140%",
        height: "140%",
        bgGradient: "radial(circle, whiteAlpha.50 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        opacity: 0.3,
        pointerEvents: "none",
      }}
    >
      <Container maxW="container.xl" h="full" position="relative">
        <VStack h="full" justify="center" align="center" spacing={4} textAlign="center" py={{ base: 8, md: 12 }}>
          <Box
            position="absolute"
            top="10%"
            left="50%"
            transform="translateX(-50%)"
            width="400px"
            height="400px"
            bgGradient="radial(circle, brand.500 0%, transparent 70%)"
            opacity={0.08}
            filter="blur(80px)"
          />
          <Text fontSize={{ base: "md", md: "lg" }} maxW="400px" color="whiteAlpha.900" fontWeight="medium" mb={1}>
            Venta de entradas segura, transparente y descentralizada impulsada por tecnología blockchain
          </Text>
          <Button
            size={{ base: "md", md: "lg" }}
            px={{ base: 6, md: 8 }}
            py={{ base: 4, md: 6 }}
            fontSize={{ base: "sm", md: "md" }}
            bgGradient="linear(to-r, brand.500, purple.500)"
            _hover={{
              bgGradient: "linear(to-r, brand.600, purple.600)",
              transform: "translateY(-2px)",
            }}
            color="whiteAlpha.900"
            onClick={() => scrollTo("events-section")}
            transition="all 0.2s"
            shadow="lg"
          >
            Ver Eventos
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
