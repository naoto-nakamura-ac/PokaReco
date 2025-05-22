import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack } from '@yamada-ui/react';
import MyAccount from '../components/MyAccount';
import Header from '../components/Header';
import HeaderSpacer from '../components/HeaderSpacer';
import ChildList from '../components/ChildList';
import MainFunc from '../components/MainFunc';
import Graph from '../components/Graph';
import moment from 'moment';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [param, setParam] = useState(null);

  // 認証状態を取得し未認証ならTopへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.status === 401) {
        navigate('/');
      }
    })();
  }, []);

  const fetchUser = async () => {
    const res = await fetch('/api/users/myAccount', {
      credentials: 'include',
    });
    const data = await res.json();
    setUser(data);
  };

  const fetchRecords = async () => {
    const query = new URLSearchParams({
      start: moment().subtract(6, 'days').format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    });
    const baseUrl = '/api/records';
    const url = `${baseUrl}?${query.toString()}`;
    const res = await fetch(url, { credentials: 'include' });
    const data = await res.json();
    setParam(data);
  };


  useEffect(() => {
    fetchUser();
    fetchRecords();
  }, []);

  return (
    <Box h="100vh" maxH="100vh" overflow="hidden">
      <Header fetchUser={fetchUser} />
      <HeaderSpacer />
      <Box h="100vh" display="flex">
        <VStack gap="md" w="25vw" margin="md" marginLeft="lg">
          <MyAccount user={user} maxW="100%" />
          <ChildList children={user.children} maxW="100%" maxH="45vh" />
        </VStack>
        <VStack gap="md" w="70vw" margin="md" marginLeft="sm">
          <MainFunc
            user={user}
            maxW="100%"
            fetchUser={fetchUser}
            fetchRecords={fetchRecords}
          />
          <Graph
            children={user.children}
            maxW="100%"
            maxH="100vh"
            fetchRecords={fetchRecords}
            param={param}
          />
        </VStack>
      </Box>
    </Box>
  );
}

export default Dashboard;
