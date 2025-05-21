// import './App.css';
import { useNavigate } from 'react-router-dom';

function Top() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        background: '#f5f5f5',
      }}
    >
      <h1>PokaReco</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button onClick={() => navigate('/login')}>ログイン</button>
        <button onClick={() => navigate('/signup')}>新規登録</button>
      </div>
    </div>
  );
}

export default Top;
