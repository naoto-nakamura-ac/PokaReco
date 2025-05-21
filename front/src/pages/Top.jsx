// import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/logo.png'

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
  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#b59032',
    color: '#FFF',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
        backgroundColor: '#FFF4D8', // このアプリのベースカラー
      }}
    >
      <img src={logo} alt="logo" style={{width: "450px"}} />
      <div style={{ display: 'flex', gap: '20px' }}>
        <button style={buttonStyle} onClick={() => navigate('/login')}>はじめる</button>
      </div>
    </div>
  );
}

export default Top;
