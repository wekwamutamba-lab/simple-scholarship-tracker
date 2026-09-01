import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { registerUser } from '../../services/api';

function RegisterForm({ onSwitchToLogin }) {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerUser({ name, email, password });
      if (res.data?.token && res.data?.user) {
        login(res.data.user, res.data.token);
      } else {
        alert('Account created successfully! Please sign in.');
        if (onSwitchToLogin) onSwitchToLogin();
      }
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || 'Registration failed!';
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
            Full Name
          </label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-3 py-2.5 text-xs bg-[#F9F8F5] border border-[#E5E2DA] rounded-xl outline-none focus:ring-2 focus:ring-[#C86D51]/30 placeholder-[#707571] text-[#2C302E]"
            required
          />
        </div>

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
          <label className="block text-xs font-medium text-[#2C302E] mb-1">
            Password
          </label>
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
          className="w-full bg-[#2D3A2F] hover:bg-[#4A5C4C] text-[#E3E7D3] font-medium py-2.5 px-4 rounded-xl text-xs transition duration-150 disabled:opacity-50 mt-2 cursor-pointer"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;