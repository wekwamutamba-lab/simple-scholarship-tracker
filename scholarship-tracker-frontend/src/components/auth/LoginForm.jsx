import { useState, useContext } from 'react';
import { loginUser } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      login(res.data.user, res.data.token);
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-black mb-1">
            Email Address
          </label>
          <input 
            type="email" 
            placeholder="name@domain.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-3 py-2 text-xs bg-white border border-black rounded-xl outline-none focus:ring-1 focus:ring-black placeholder-neutral-400"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-black mb-1">
            Password
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-3 py-2 text-xs bg-white border border-black rounded-xl outline-none focus:ring-1 focus:ring-black placeholder-neutral-400"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded-xl text-xs transition duration-150 disabled:opacity-50 mt-2"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;