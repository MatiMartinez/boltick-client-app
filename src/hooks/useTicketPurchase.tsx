import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import useSession from "./useSession";
import { events } from "../consts/events";
import { Event } from "../models/event";
import { NFTDTO, paymentService } from "../services/payment";

export default function useTicketPurchase() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === id) as unknown as Event;

  if (!event) {
    navigate("/");
  }

  const toast = useToast();
  const { isConnected, walletAddress, userInfo } = useSession();

  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(event.tickets.map((ticket) => [ticket.id, 0]))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPR, setSelectedPR] = useState<string>("");
  const [isRRPPDrawerOpen, setRRPPDrawerOpen] = useState(false);

  const openRRPPDrawer = () => setRRPPDrawerOpen(true);

  const closeRRPPDrawer = () => setRRPPDrawerOpen(false);

  const handleSelectPR = (prName: string) => {
    setSelectedPR(prName);
    setRRPPDrawerOpen(false);
  };

  const removeRRPP = () => setSelectedPR("");

  const handleQuantityChange = (ticketId: string, increment: boolean) => {
    setQuantities((prev) => {
      const maxQty = 10;
      const currentQty = prev[ticketId] || 0;
      const tier = event.tickets.find((ticket) => ticket.id === ticketId);
      if (!tier) return prev;

      let newQty = increment ? currentQty + 1 : currentQty - 1;
      newQty = Math.max(0, Math.min(newQty, maxQty));

      return { ...prev, [ticketId]: newQty };
    });
  };

  const summary = useMemo(() => {
    const selectedTickets = event.tickets.filter(
      (ticket) => quantities[ticket.id] > 0
    );
    const total = selectedTickets.reduce(
      (sum, ticket) => sum + ticket.price * quantities[ticket.id],
      0
    );
    return { selectedTickets, total };
  }, [quantities, event.tickets]);

  const onPurchase = async () => {
    if (!isConnected || !userInfo?.email) {
      toast({
        title: "Conecta tu billetera",
        description: "Necesitas conectar tu billetera para comprar entradas",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      const nfts = generateNFTs();

      const newPayment = await paymentService.createPayment({
        eventId: event.id,
        nfts: nfts,
        provider: "Mercado Pago",
        userId: userInfo.email,
        walletPublicKey: walletAddress,
        prName: selectedPR,
      });

      window.location.href = newPayment.url;
    } catch (error) {
      toast({
        title: "Error en la compra",
        description:
          error instanceof Error ? error.message : "Ha ocurrido un error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setIsLoading(false);
    }
  };

  const generateNFTs = (): NFTDTO[] => {
    return event.tickets
      .filter((ticket) => quantities[ticket.id] > 0)
      .map((ticket) => ({
        collectionName: event.collectionName,
        collectionSymbol: event.collectionSymbol,
        quantity: quantities[ticket.id],
        type: ticket.name,
        unitPrice: ticket.price,
      }));
  };

  return {
    event,
    handleQuantityChange,
    isLoading,
    onPurchase,
    quantities,
    summary,
    selectedPR,
    openRRPPDrawer,
    closeRRPPDrawer,
    isRRPPDrawerOpen,
    handleSelectPR,
    removeRRPP,
  };
}
