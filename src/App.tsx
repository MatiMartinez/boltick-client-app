import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import MaintenanceMode from "./components/MaintenanceMode";

// Variable para controlar el modo de mantenimiento
const MAINTENANCE_MODE = true;

export default function App() {
  // Si está en modo mantenimiento, mostrar solo la página de mantenimiento
  if (MAINTENANCE_MODE) {
    return (
      <ChakraProvider theme={theme}>
        <MaintenanceMode />
      </ChakraProvider>
    );
  }

  // Código original de la aplicación (comentado para referencia)
  /*
  return (
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <Router>
          <SessionLoading>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/tickets"
                  element={
                    <PrivateRoute>
                      <UserTickets />
                    </PrivateRoute>
                  }
                />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/processing" element={<PaymentProcessing />} />
                <Route path="/payment/error" element={<PaymentError />} />
                <Route path="/payment/unknown" element={<PaymentUnknown />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
              </Routes>
            </Layout>
          </SessionLoading>
        </Router>
      </ChakraProvider>
    </Web3Provider>
  );
  */
}
