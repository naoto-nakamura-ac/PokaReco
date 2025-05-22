import {
  HStack,
  VStack,
  Text,
  Box,
  Button,
  useDisclosure,
} from '@yamada-ui/react';
import { CheckIcon, DownloadIcon, FeatherIcon } from '@yamada-ui/lucide';
import LogForm from './LogForm';
import GraphAll from './GraphAll';

function MainFunc({ fetchUser, fetchRecords, maxW = 'full' }) {
  const logDialog = useDisclosure();
  const graphDialog = useDisclosure();

  const registerSuccess = async () => {
    logDialog.onClose();
    fetchUser();
    fetchRecords();
  };

  return (
    <Box maxW={maxW} w="full" px={4} py={6} h="30vh">
      <VStack spacing={4} w="50vw" mx="auto" h="full">
        <Text fontSize="lg" textAlign="center" fontWeight="bold">
          操作メニュー
        </Text>
        <HStack spacing={4} w="full" h="full">
          <Button
            startIcon={<FeatherIcon />}
            colorScheme="warning"
            flex="1"
            h="full"
            onClick={logDialog.onOpen}
          >
            記録
          </Button>
          <LogForm
            open={logDialog.open}
            onClose={logDialog.onClose}
            onSuccess={registerSuccess}
          />
          <Button
            startIcon={<CheckIcon />}
            colorScheme="warning"
            flex="1"
            h="full"
            onClick={graphDialog.onOpen}
          >
            確認
          </Button>
          <GraphAll
            open={graphDialog.open}
            onClose={graphDialog.onClose}
            maxW="100%"

          />
          <Button
            startIcon={<DownloadIcon />}
            colorScheme="warning"
            flex="1"
            h="full"
          >
            出力
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default MainFunc;
