import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
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

  const loginAuth = async () => {
    try {
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
      window.alert(data.message);
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
      navigate('/dashboard');
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
        <h2>アカウントログイン</h2>
        <input
          type="text"
          placeholder="登録するメールアドレスを入力"
          value={email}
          onChange={updateEmail}
        />
        <input
          type="password"
          placeholder="パスワード"
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
          onClick={navigateDashboard}
        >
          ログイン
        </button>
        <div style={{ textAlign: 'right' }}>
          <Link
            to="/signup"
            style={{
              fontSize: '12px',
              color: '#3182ce',
              textDecoration: 'none',
            }}
            onClick={clearForm}
          >
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

// YamadaUIメモ
// passwordは"PasswordInput"フォーム
// <button onClick={() => navigate('/signup')}>新規登録</button>
// buttonはアウトライン
