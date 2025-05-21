import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div>dashboard</div>

      <button
        onClick={async () => {
          const res = await fetch('/api/auth/logout', { method: 'POST' });
          const data = await res.json();
          console.log(data.message);
          navigate('/');
        }}
      >
        デバッグ用ログアウトボタン
      </button>
    </>
  );
}

export default Dashboard;
