import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";

export default function ReturnPolicy() {
  return (
    <Box py={{ base: 5, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={16} maxW="800px" mx="auto" align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, white, whiteAlpha.800)"
              bgClip="text"
            >
              Políticas de Devolución
            </Heading>
          </VStack>

          <VStack spacing={2} align="start">
            <Heading size="lg">
              1. Derecho de Arrepentimiento (Ley 24.240)
            </Heading>
            <Text>
              El comprador puede ejercer su derecho de arrepentimiento dentro de
              los 10 días corridos desde la compra, siempre que el evento no
              haya ocurrido y sin expresión de causa.
            </Text>
            <Text>
              <strong>¿Cómo solicitar la devolución?</strong> Podés contactarnos
              por email (boltick.entrada@gmail.com) o WhatsApp (+54 2634
              371155).
            </Text>
            <Text>
              La devolución será gestionada por el organizador del evento, quien
              reintegrará el 100% del monto abonado (incluyendo comisiones)
              dentro de los 10 días hábiles desde la solicitud.
            </Text>
          </VStack>

          <VStack spacing={2} align="start">
            <Heading size="lg">2. Cancelación del Evento</Heading>
            <Text>
              Si el evento es cancelado, suspendido o reprogramado de manera
              definitiva, el organizador/productora será el único responsable de
              realizar las devoluciones correspondientes.
            </Text>
            <Text>
              <strong>Importante:</strong> Boltick actúa únicamente como
              plataforma tecnológica y no administra los fondos. Los reembolsos
              deben realizarse por el organizador a través del mismo medio de
              pago, en un plazo máximo de 10 días hábiles desde la confirmación
              de la cancelación.
            </Text>
          </VStack>

          <VStack spacing={2} align="start">
            <Heading size="lg">3. Casos SIN Derecho a Devolución</Heading>
            <Text>
              <strong>No aplican devoluciones en los siguientes casos:</strong>{" "}
              no presentación al evento, errores de datos del comprador, pérdida
              de la entrada digital, reventa de entradas, o compra a terceros no
              autorizados.
            </Text>
            <Text>
              <strong>Modificaciones menores que NO generan devolución:</strong>{" "}
              cambios de horario dentro del mismo día, cambios de artista
              telonero, cambios de espacio dentro del mismo predio, condiciones
              climáticas en eventos al aire libre, o modificaciones menores en
              el line-up (manteniendo artista principal).
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
