import { useState } from 'react';
import { registerUser } from '../../services/api';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      alert('Account created successfully! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.error || 'Registration failed!';
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-black mb-1">
            Full Name
          </label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-3 py-2 text-xs bg-white border border-black rounded-xl outline-none focus:ring-1 focus:ring-black placeholder-neutral-400"
            required
          />
        </div>

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
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;