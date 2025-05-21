// import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Button, Center, Image, Box } from '@yamada-ui/react';
import { ArrowRightIcon } from '@yamada-ui/lucide';
import PageMotion from '../components/PageMotion';

function Top() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  // 認証状態を取得し済みならDashboardへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.status === 200) {
        navigate('/dashboard');
      }
    })();
  }, []);

  useEffect(() => {
    let timer;
    if (showAnimation) {
      timer = setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
    // クリーンナップ関数、アンマウントされる時(今回はnavigate)にタイマーをリセット
    // setTimeoutの返り値(TimerID)を指定して確実にリセットする
    return () => clearTimeout(timer);
  }, [showAnimation]);

  return (
    <Box>
      {showAnimation ? (
        <PageMotion />
      ) : (
        <Center flexDirection="column">
          <Image src={logo} alt="logo" boxSize="xl" />
          <Button
            colorScheme="amber"
            size="xl"
            variant="outline"
            endIcon={<ArrowRightIcon />}
            onClick={() => setShowAnimation(true)}
            disabled={showAnimation}
          >
            はじめる
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default Top;
