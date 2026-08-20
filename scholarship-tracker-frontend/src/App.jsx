import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ScholarshipList from './components/scholarships/ScholarshipList';
import ScholarshipForm from './components/scholarships/ScholarshipForm';

function App() {
  const { user, token, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Scholarship Tracker</h1>

      {!token ? (
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <LoginForm />
          </div>
          <div>
            <RegisterForm />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span>Welcome! </span>
            <button onClick={logout}>Logout</button>
          </div>

          <ScholarshipForm />
          <hr style={{ margin: '20px 0' }} />
          <ScholarshipList />
        </div>
      )}
    </div>
  );
}

export default App;