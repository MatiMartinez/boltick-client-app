import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import useSession from "./useSession";
import { NFTDTO, paymentService } from "../services/payment";
import { Event } from "../models/event";

export default function useTicketPurchase(event: Event) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toast = useToast();
  const { isConnected, walletAddress, userInfo } = useSession();

  const isFreeEvent = useMemo(() => {
    return event.tickets.every((ticket) => ticket.price === 0);
  }, [event.tickets]);

  const maxTickets = isFreeEvent ? 2 : 10;

  const [quantities, setQuantities] = useState<Record<string, number>>(Object.fromEntries(event.tickets.map((ticket) => [ticket.id, 0])));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPR, setSelectedPR] = useState<string>(() => {
    return sessionStorage.getItem(`selectedPR_${event.id}`) || "";
  });
  const [isRRPPDrawerOpen, setRRPPDrawerOpen] = useState(false);

  useEffect(() => {
    const prParam = searchParams.get("rrpp");
    if (prParam && event?.prs) {
      const foundPR = event.prs.find((pr) => pr.slug === prParam.toLowerCase());

      if (foundPR) {
        if (!selectedPR) {
          setSelectedPR(foundPR.name);
          sessionStorage.setItem(`selectedPR_${event.id}`, foundPR.name);
        }
      }
    }
  }, [searchParams, event?.prs, event.id]);

  const openRRPPDrawer = () => setRRPPDrawerOpen(true);

  const closeRRPPDrawer = () => setRRPPDrawerOpen(false);

  const handleSelectPR = (prName: string) => {
    setSelectedPR(prName);
    setRRPPDrawerOpen(false);
  };

  const removeRRPP = () => {
    setSelectedPR("");
    sessionStorage.removeItem(`selectedPR_${event.id}`);
  };

  const handleQuantityChange = (ticketId: string, increment: boolean) => {
    setQuantities((prev) => {
      const currentQty = prev[ticketId] || 0;
      const tier = event.tickets.find((ticket) => ticket.id === ticketId);
      if (!tier) return prev;

      let newQty = increment ? currentQty + 1 : currentQty - 1;
      newQty = Math.max(0, Math.min(newQty, maxTickets));

      return { ...prev, [ticketId]: newQty };
    });
  };

  const summary = useMemo(() => {
    const selectedTickets = event.tickets.filter((ticket) => quantities[ticket.id] > 0);
    const total = selectedTickets.reduce((sum, ticket) => sum + ticket.price * quantities[ticket.id], 0);
    return { selectedTickets, total };
  }, [quantities, event.tickets]);

  const onPurchase = async () => {
    if (!isConnected || !userInfo?.email) {
      toast({
        title: "Iniciá sesión",
        description: "Necesitás iniciar sesión para continuar con tu compra.",
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
        eventName: event.name,
        nfts: nfts,
        prName: selectedPR,
        provider: "Mercado Pago",
        userId: userInfo.email,
        walletPublicKey: walletAddress,
      });

      if (newPayment.success === 0 || !newPayment.data) {
        toast({
          title: "Error en la compra",
          description: newPayment.message,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      window.location.href = newPayment.data.url;
    } catch (error) {
      toast({
        title: "Error en la compra",
        description: error instanceof Error ? error.message : "Ha ocurrido un error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFreePurchase = async () => {
    if (!isConnected || !userInfo?.email) {
      toast({
        title: "Iniciá sesión",
        description: "Necesitás iniciar sesión para continuar con tu compra.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      const nfts = generateNFTs();

      const freePayment = await paymentService.createFreePayment({
        eventId: event.id,
        eventName: event.name,
        nfts: nfts,
        prName: selectedPR,
        userId: userInfo.email,
        walletPublicKey: walletAddress,
      });

      if (freePayment.success === 1 && freePayment.data?.id) {
        navigate(`/payment/success?external_reference=${freePayment.data?.id}&status=approved`);
      } else {
        toast({
          title: "Error en la compra",
          description: freePayment.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error en la compra",
        description: error instanceof Error ? error.message : "Ha ocurrido un error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateNFTs = (): NFTDTO[] => {
    return event.tickets
      .filter((ticket) => quantities[ticket.id] > 0)
      .map((ticket) => ({
        collectionName: event.collectionName,
        collectionSymbol: event.collectionSymbol,
        imageUrl: ticket.imageUrl,
        quantity: quantities[ticket.id],
        type: ticket.name,
        unitPrice: ticket.price,
      }));
  };

  return {
    handleQuantityChange,
    isLoading,
    onPurchase,
    onFreePurchase,
    quantities,
    summary,
    selectedPR,
    openRRPPDrawer,
    closeRRPPDrawer,
    isRRPPDrawerOpen,
    handleSelectPR,
    removeRRPP,
    isFreeEvent,
    maxTickets,
  };
}
