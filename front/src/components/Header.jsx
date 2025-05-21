import {
  Box,
  HStack,
  Spacer,
  Image,
  Heading,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useNotice,
  Dialog
} from '@yamada-ui/react';
import { MenuIcon } from '@yamada-ui/lucide';
import logo from '../assets/header_logo.png';
import { HEADER_HEIGHT } from '../constants/layout';
import { useNavigate } from 'react-router-dom';

function Header() {
  const drawer = useDisclosure();
  const dialog = useDisclosure();
  const navigate = useNavigate();
  const notice = useNotice({ limit: 1 });

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status === 200) return true;
      notice({
        title: 'Error',
        description: data.message,
        duration: 3000,
        status: 'error',
      });
    } catch (error) {
      console.log('error: ', error);
      notice({
        title: 'Error',
        description: data.message,
        duration: 3000,
        status: 'error',
      });
      return false;
    }
  };

  const navigateTop = async () => {
    const success = await logout();
    if (success) {
      notice({
        title: 'Success',
        description: 'ログアウトしました',
        duration: 3000,
        status: 'success',
      });
      navigate('/');
    }
  };
  return (
    <Box
      w="full"
      h={HEADER_HEIGHT}
      bgGradient="linear(to-r, yellow.300,amber.100,yellow.500)"
      color="white"
      shadow="md"
      position="fixed"
      zIndex="banner"
    >
      <HStack w="full" h="full" alignItems="center" px="lg">
        <Image src={logo} alt="logo" boxSize="6xs" />
        <Heading fontWeight="black" color="amber.600" paddingLeft="lg">
          PokaReco
        </Heading>
        <Spacer />
        <Button
          variant="ghost"
          startIcon={<MenuIcon fontSize="xl" />}
          size="lg"
          _hover=""
          onClick={drawer.onOpen}
        />
        <Drawer open={drawer.open} onClose={drawer.onClose} bg="yellow.50" size="xs">
          <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
          <DrawerHeader>ドラゴンボール</DrawerHeader>

          <DrawerBody>
            『ドラゴンボール』は、鳥山明による日本の漫画作品です。...
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              onClick={dialog.onOpen}
              w="full"
              borderColor="yellow.700"
              color="yellow.700"
            >
              Logout
            </Button>
          </DrawerFooter>
        </Drawer>
      </HStack>
        <Dialog
          open={dialog.open}
          onClose={dialog.onClose}
          cancel="Cancel"
          onCancel={dialog.onClose}
          success="Logout"
          onSuccess={navigateTop}
        >
          本当にログアウトしますか？
        </Dialog>
    </Box>
  );
}

export default Header;
