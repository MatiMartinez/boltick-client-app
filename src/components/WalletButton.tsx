import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Text,
  HStack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { ChevronDown, Ticket, LogOut, Copy, Wallet } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import useSession from "../hooks/useSession";

export default function WalletButton() {
  const { isConnected, walletAddress, balance, connect, disconnect } =
    useSession();
  const { onCopy } = useClipboard(walletAddress);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Dirección copiada",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        bgGradient="linear(to-r, blue.500, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, brand.600, purple.600)",
        }}
      >
        Iniciar sesión
      </Button>
    );
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDown size={20} />}
        bgGradient="linear(to-r, brand.500, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, brand.600, purple.600)",
        }}
        _active={{
          bgGradient: "linear(to-r, brand.600, purple.600)",
        }}
        color="whiteAlpha.900"
      >
        Mi Cuenta
      </MenuButton>

      <MenuList bg="gray.700" borderColor="whiteAlpha.200" p={4} minW="300px">
        <VStack spacing={4} align="stretch">
          <VStack
            w="full"
            bg="gray.600"
            p={4}
            borderRadius="lg"
            spacing={3}
            align="stretch"
          >
            <HStack>
              <Wallet size={16} />
              <Text fontSize="sm">Billetera</Text>
            </HStack>
            <HStack justify="space-between" spacing={2}>
              <Text
                fontSize="sm"
                color="whiteAlpha.700"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                maxW="200px"
              >
                {walletAddress}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                p={1}
                h="auto"
                minW="auto"
                onClick={handleCopy}
                title="Copiar dirección"
              >
                <Copy size={14} />
              </Button>
            </HStack>
            <Text fontSize="sm" color="brand.400">
              {balance} SOL
            </Text>
          </VStack>
          <MenuItem
            as={RouterLink}
            to="/tickets"
            icon={<Ticket size={20} />}
            bg="transparent"
            _hover={{ bg: "gray.600" }}
            h="48px"
            borderRadius="md"
          >
            Mis Tickets
          </MenuItem>
          <MenuItem
            icon={<LogOut size={20} />}
            bg="transparent"
            _hover={{ bg: "gray.600" }}
            h="48px"
            borderRadius="md"
            onClick={disconnect}
          >
            Cerrar Sesión
          </MenuItem>
        </VStack>
      </MenuList>
    </Menu>
  );
}
