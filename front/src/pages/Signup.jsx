import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
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

  const createAccount = async() => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password ,name}),
      });
      clearForm();
      const data = await res.json();
      window.alert(data.message);
      if (res.status === 201) return true;
      return false;
    } catch (error) {
      console.log('error: ', error);
      window.alert('Error');
      return false;
    }
  }

  const navigateLogin = async () => {
    const success = await createAccount();
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        background: '#FFF',
      }}
    >
      <div
        style={{
          padding: '20px',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <h2>アカウント作成</h2>
        <input
          type="text"
          placeholder="登録する名前を入力"
          value={name}
          onChange={updateName}
        />
        <input
          type="text"
          placeholder="登録するメールアドレスを入力"
          value={email}
          onChange={updateEmail}
        />
        <input
          type="password"
          placeholder="登録するパスワードを入力"
          value={password}
          onChange={updatePassword}
        />
        <button
          style={{
            width: '100%',
            marginBottom: '8px',
            borderRadius: '9999px',
            border: '1px solid #ccc',
          }}
          onClick={navigateLogin}
        >
          作成
        </button>
      </div>
    </div>
  );
}

export default Signup;
