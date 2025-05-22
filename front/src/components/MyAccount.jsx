import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  AvatarBadge,
  HStack,
  VStack,
  Text,
  Box,
  Separator,
  Image,
} from '@yamada-ui/react';
import { useState, useEffect } from 'react';

function MyAccount({ user }) {
  const { name, email, children } = user;
  const [url, setUrl] = useState(null);
  const childrenNum = children?.length;
  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://weather.tsukumijima.net/api/forecast/city/230010'
      );
      const data = await res.json();
      const icon = data.forecasts[0].image.url;
      setUrl(icon);
    })();
  }, []);

  return (
    <Card bg="white" padding="md">
      <CardHeader justifyContent="center">あなたの情報</CardHeader>
      <CardBody>
        <HStack alignItems="center" gap="lg">
          <VStack>
            <Avatar
              name={name}
              size="xl"
              // #TODO 仮で決めうち。アップロード機能作成する
              // src="https://avatars.githubusercontent.com/u/84060430?v=4"
            >
              <AvatarBadge
                bg="green"
                ping
                pingColor="green.300"
                pingScale={2}
              />
            </Avatar>
            <Box textAlign="center" lineHeight="1.2">
              <Text fontSize="5xl" fontWeight="black" fontFamily="mono">
                {name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {email}
              </Text>
            </Box>
          </VStack>
          <VStack>
            <Box textAlign="center" lineHeight="1.2">
              <Text fontSize="sm" color="gray.600">
                子ども
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mt="1">
                {childrenNum}人
              </Text>
            </Box>
            <Separator variant="solid" />
            <Box textAlign="center" lineHeight="1.2">
              <Text fontSize="sm" color="gray.600">
                名古屋の天気
              </Text>
              <Image src={url} />
            </Box>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default MyAccount;
