import {
  Box,
  HStack,
  Spacer,
  Image,
  Heading,
  useDisclosure,
  Button,
  ButtonGroup,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useNotice,
  Dialog,
} from '@yamada-ui/react';
import { MenuIcon, SmilePlusIcon, Trash2Icon } from '@yamada-ui/lucide';
import logo from '../assets/header_logo.png';
import { HEADER_HEIGHT } from '../constants/layout';
import { useNavigate } from 'react-router-dom';
import AddChild from '../components/AddChild';

function Header({fetchUser}) {
  const drawer = useDisclosure();
  const dialog = useDisclosure();
  const childdialog = useDisclosure();
  const deldialog = useDisclosure();
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


  const registerSuccess = async () => {
    drawer.onClose();
    childdialog.onClose();
    fetchUser()
  };

  const deleteChild = async () => {
    try {
      const res = await fetch('/api/children/', {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status === 201) return true;
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

  const deleteSuccess = async () => {
    const success = await deleteChild();
    if (success) {
      notice({
        title: 'Success',
        description: '子どもの削除に成功しました',
        duration: 3000,
        status: 'success',
      });
      drawer.onClose();
      deldialog.onClose();
    fetchUser()
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
        <Drawer
          open={drawer.open}
          onClose={drawer.onClose}
          bg="yellow.50"
          size="xs"
        >
          <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
          <DrawerHeader color="warning">その他の機能</DrawerHeader>

          <DrawerBody>
            <ButtonGroup
              flexDirection="column"
              gap="sm"
              w="full"
              variant="ghost"
            >
              <Button
                startIcon={<SmilePlusIcon />}
                colorScheme="warning"
                onClick={childdialog.onOpen}
              >
                子どもを登録する
              </Button>
              <AddChild
                open={childdialog.open}
                onClose={childdialog.onClose}
                onSuccess={registerSuccess}
              />
              <Button
                startIcon={<Trash2Icon />}
                colorScheme="warning"
                onClick={deldialog.onOpen}
              >
                子どもを削除する
              </Button>
              <Dialog
                open={deldialog.open}
                onClose={deldialog.onClose}
                cancel="Cancel"
                onCancel={deldialog.onClose}
                success="削除"
                onSuccess={deleteSuccess}
              >
                本当に削除しますか？
              </Dialog>
            </ButtonGroup>
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
