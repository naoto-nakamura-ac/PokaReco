// import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Top() {
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
      <h1>PokaReco</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={() => navigate('/login')}>ログイン</button>
      </div>
    </div>
  );
}

export default Top;
