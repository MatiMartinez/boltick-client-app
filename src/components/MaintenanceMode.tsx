import { Box, VStack, Text, Image, useColorModeValue, keyframes } from "@chakra-ui/react";

// Animación para el pulso del logo
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function MaintenanceMode() {
  const bgGradient = useColorModeValue("linear(to-br, gray.900, purple.900)", "linear(to-br, gray.900, purple.900)");

  return (
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center" px={4}>
      <VStack spacing={8} textAlign="center" maxW="600px">
        {/* Logo con animación */}
        <Box animation={`${pulse} 3s ease-in-out infinite`}>
          <Image src="/logotipo-boltick-white.svg" alt="Boltick" boxSize="180px" filter="drop-shadow(0 0 30px rgba(128, 90, 213, 0.6))" />
        </Box>

        {/* Título principal */}
        <VStack spacing={4}>
          <Text color="white" fontSize="4xl" fontWeight="bold" letterSpacing="wide">
            Sitio en Mantenimiento
          </Text>
        </VStack>

        {/* Mensaje informativo */}
        <VStack spacing={4} opacity={0.8}>
          <Text color="gray.300" fontSize="lg">
            Estamos realizando actualizaciones para brindarte un mejor servicio.
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
