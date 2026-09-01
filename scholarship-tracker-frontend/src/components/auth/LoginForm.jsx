import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/api';

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;
      login(user, token);
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-[#FDF0EC] border border-[#F5C2B3] text-[#C86D51] text-xs rounded-xl">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#2C302E] mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-[#F9F8F5] border border-[#E5E2DA] rounded-xl outline-none focus:ring-2 focus:ring-[#C86D51]/30 placeholder-[#707571] text-[#2C302E]"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2C302E] mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-[#F9F8F5] border border-[#E5E2DA] rounded-xl outline-none focus:ring-2 focus:ring-[#C86D51]/30 placeholder-[#707571] text-[#2C302E]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#2D3A2F] hover:bg-[#4A5C4C] text-[#E3E7D3] rounded-xl text-xs font-semibold disabled:opacity-50 transition duration-150 cursor-pointer"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;