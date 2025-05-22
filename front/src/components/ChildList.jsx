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
  Center,
} from '@yamada-ui/react';
import { Carousel, CarouselSlide } from '@yamada-ui/carousel';
import { useState, useEffect } from 'react';
import ChildInfo from './ChildInfo';

function ChildList({ children , maxW = "100%" , maxH="100%" }) {
  // デバッグ用
  // const childrens = [
  //   {
  //     id: 17,
  //     user_id: 3,
  //     name: 'tete',
  //     birthday: '2025-05-21T15:00:00.000Z',
  //     gender: 'm',
  //   },
  //   {
  //     id: 18,
  //     user_id: 3,
  //     name: 'toto',
  //     birthday: '2023-12-03T15:00:00.000Z',
  //     gender: 'f',
  //   },
  // ];
  return (
    <Box maxW={maxW} maxH={maxH} w="full" h="full">
      <Card bg="whiteAlpha.600" >
        <CardHeader justifyContent="center">子ども一覧</CardHeader>
        <CardBody display="flex" justifyContent="center" alignItems="center">
        {children?.length > 0 ? (
            <VStack>
              <Carousel size="sm" withIndicators={false}maxH="100%" h="100%">
                {children.map((obj) => (
                  <CarouselSlide>
                    <ChildInfo key={obj.id} child={obj} />
                  </CarouselSlide>
                ))}
              </Carousel>
            </VStack>
          ) : (
            <Text>No Infomatiion</Text>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}

export default ChildList;
