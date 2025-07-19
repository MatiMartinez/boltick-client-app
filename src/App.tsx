import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import theme from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import UserTickets from "./pages/UserTickets";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentProcessing from "./pages/payment/PaymentProcessing";
import PaymentError from "./pages/payment/PaymentError";
import PaymentUnknown from "./pages/payment/PaymentUnknown";
import Web3Provider from "./contexts/Web3Context";
import ReturnPolicy from "./pages/ReturnPolicy";

export default function App() {
  return (
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/tickets" element={<UserTickets />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route
                path="/payment/processing"
                element={<PaymentProcessing />}
              />
              <Route path="/payment/error" element={<PaymentError />} />
              <Route path="/payment/unknown" element={<PaymentUnknown />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
            </Routes>
          </Layout>
        </Router>
      </ChakraProvider>
    </Web3Provider>
  );
}
