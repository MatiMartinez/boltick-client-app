import { Box } from '@chakra-ui/react';

import Navbar from './Navbar';
import Footer from './Footer';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useScrollToTop();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" mt={{ base: '116px', md: '88px' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
