import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Center,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  PasswordInput,
  Button,
  useNotice,
} from '@yamada-ui/react';
import { MailIcon } from '@yamada-ui/lucide';

function Login() {
  const navigate = useNavigate();
  const notice = useNotice({ limit: 1 });
  // 認証状態を取得し済みならDashboardへリダイレクトする
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.status === 200) {
        navigate('/dashboard');
      }
    })();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [visible, setVisible] = useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const emailBlur = () => {
    setIsInvalidEmail(true);
  };
  const passwordBlur = () => {
    setIsInvalidPassword(true);
  };

  const alert = (message) => {
    notice({
      title: 'Error',
      description: message,
      duration: 3000,
      status: 'error',
    });
  };

  const loginAuth = async () => {
    try {
      if (email && password) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        clearForm();
        const data = await res.json();
        if (res.status === 200) return true;
        alert(data.message);
      } else {
        alert('入力項目が不足しています');
        setIsInvalidEmail(true);
        setIsInvalidPassword(true);
      }
      return false;
    } catch (error) {
      console.log('error: ', error);
      window.alert('Error');
      return false;
    }
  };

  const navigateDashboard = async () => {
    const success = await loginAuth();
    if (success) {
      notice({
        title: 'Success',
        description: "ログインに成功しました",
        duration: 3000,
        status: 'success',
      })
      navigate('/dashboard');
    }
  };

  return (
    <Center h="100vh">
      <Card bg="white" w="2xl" padding="xl">
        <CardHeader>
          <Heading size="md">アカウントログイン</Heading>
        </CardHeader>
        <CardBody>
          <FormControl
            label="Email addres"
            required
            invalid={isInvalidEmail && !email}
            onBlur={emailBlur}
            errorMessage="メールアドレスを入力してください"
          >
            <InputGroup>
              <InputLeftElement>
                <MailIcon />
              </InputLeftElement>
              <Input
                variant="filled"
                type="email"
                placeholder="MailAddress"
                _placeholder={{ opacity: 1, color: 'yellow.800' }}
                value={email}
                onChange={updateEmail}
              />
            </InputGroup>
          </FormControl>
          <FormControl
            label="Password"
            required
            invalid={isInvalidPassword && !password}
            onBlur={passwordBlur}
            errorMessage="メールアドレスを入力してください"
          >
            <PasswordInput
              variant="filled"
              visible={visible}
              onVisibleChange={setVisible}
              placeholder="Password"
              _placeholder={{ opacity: 1, color: 'yellow.800' }}
              value={password}
              onChange={updatePassword}
            />
          </FormControl>
          <Button
            variant="solid"
            bg="yellow.300"
            w="full"
            borderRadius="9999px"
            marginBottom="sm"
            onClick={navigateDashboard}
          >
            ログイン
          </Button>
          <Link
            to="/signup"
            style={{
              fontSize: '12px',
              color: '#3182ce',
              textDecoration: 'none',
              marginLeft: 'auto',
            }}
            onClick={clearForm}
          >
            新規登録
          </Link>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Login;

// YamadaUIメモ
// passwordは"PasswordInput"フォーム
// <button onClick={() => navigate('/signup')}>新規登録</button>
// buttonはアウトライン
