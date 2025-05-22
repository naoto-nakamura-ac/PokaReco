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
import { CakeIcon, VenusAndMarsIcon } from '@yamada-ui/lucide';
import { format } from 'date-fns';

function ChildInfo({ child }) {
  const { name, birthday, gender } = child;
  const formatDate = format(birthday, 'yyyy年 MM月 dd日');
  useEffect(() => {}, []);

  return (
    <Card padding="md">
      <CardBody>
        <VStack alignItems="center" gap="md">
          <HStack alignItems="center">
            <Avatar
              name={name}
              size="lg"
              // #TODO 仮で決めうち。アップロード機能作成する
              // src="https://avatars.githubusercontent.com/u/84060430?v=4"
            />
            <Box textAlign="center" lineHeight="1.2">
              <Text fontSize="xl" fontWeight="black" fontFamily="mono">
                {name}
              </Text>
            </Box>
          </HStack>
          <VStack alignItems="center">
            <Box textAlign="left" lineHeight="1.7">
              <HStack>
                <CakeIcon />
                <Text>{formatDate}</Text>
              </HStack>
              <HStack>
                <VenusAndMarsIcon />
                <Text>
                  {gender === 'm' ? '👦 おとこのこ' : '👩 おんなのこ'}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default ChildInfo;
