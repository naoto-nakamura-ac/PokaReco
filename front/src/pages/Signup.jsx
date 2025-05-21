import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { MailIcon, UserPenIcon } from '@yamada-ui/lucide';

function Signup() {
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
  const [name, setName] = useState('');

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidName, setIsInvalidName] = useState(false);

  const [visible, setVisible] = useState(false);

  const alert = (message) => {
    notice({
      title: 'Error',
      description: message,
      duration: 3000,
      status: 'error',
    });
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };
  const clearForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };
  const nameBlur = () => {
    setIsInvalidName(true);
  };
  const emailBlur = () => {
    setIsInvalidEmail(true);
  };
  const passwordBlur = () => {
    setIsInvalidPassword(true);
  };

  const createAccount = async () => {
    try {
      if (email && password && name) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        });
        clearForm();
        const data = await res.json();
        if (res.status === 201) return true;
        alert(data.message);
      } else {
        alert('入力項目が不足しています');
        setIsInvalidEmail(true);
        setIsInvalidPassword(true);
        setIsInvalidName(true);
      }
      return false;
    } catch (error) {
      console.log('error: ', error);
      window.alert('Error');
      return false;
    }
  };

  const navigateLogin = async () => {
    const success = await createAccount();
    if (success) {
      notice({
        title: 'Success',
        description: 'アカウント作成に成功しました',
        duration: 3000,
        status: 'success',
      });
      navigate('/login');
    }
  };

  return (
    <Center h="100vh">
      <Card bg="white" w="2xl" padding="xl">
        <CardHeader>
          <Heading size="md">アカウント作成</Heading>
        </CardHeader>
        <CardBody>
        <FormControl
            label="User Name"
            required
            invalid={isInvalidName && !name}
            onBlur={nameBlur}
            errorMessage="ユーザーの名前を入力してください"
          >
            <InputGroup>
              <InputLeftElement>
                <UserPenIcon />
              </InputLeftElement>
              <Input
                variant="filled"
                type="text"
                placeholder="****"
                _placeholder={{ opacity: 1, color: 'yellow.800' }}
                value={name}
                onChange={updateName}
              />
            </InputGroup>
          </FormControl>
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
                placeholder="***@***"
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
            borderRadius="full"
            marginBottom="sm"
            onClick={navigateLogin}
          >
            作成する
          </Button>
        </CardBody>
      </Card>
    </Center>
    // <div
    //   style={{
    //     height: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //     gap: '20px',
    //     // background: '#FFF',
    //   }}
    // >
    //   <div
    //     style={{
    //       padding: '20px',
    //       background: '#fff',
    //       border: '1px solid #ccc',
    //       borderRadius: '8px',
    //       boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    //       width: '300px',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       gap: '5px',
    //     }}
    //   >
    //     <h2>アカウント作成</h2>
    //     <input
    //       type="text"
    //       placeholder="登録する名前を入力"
    //       value={name}
    //       onChange={updateName}
    //     />
    //     <input
    //       type="text"
    //       placeholder="登録するメールアドレスを入力"
    //       value={email}
    //       onChange={updateEmail}
    //     />
    //     <input
    //       type="password"
    //       placeholder="登録するパスワードを入力"
    //       value={password}
    //       onChange={updatePassword}
    //     />
    //     <button
    //       style={{
    //         width: '100%',
    //         marginBottom: '8px',
    //         borderRadius: '9999px',
    //         border: '1px solid #ccc',
    //       }}
    //       onClick={navigateLogin}
    //     >
    //       作成
    //     </button>
    //   </div>
    // </div>
  );
}

export default Signup;
