import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import { fetchScholarships, createScholarship, deleteScholarship } from './services/api';

export default function App() {
  const { user, token, logout } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStage, setFilterStage] = useState('All');
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    provider: '',
    url: '',
    deadline: '',
    status: 'Not started',
    eligibility: '',
    notes: ''
  });

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchScholarships();
      setScholarships(res.data || []);
    } catch (error) {
      console.error('Failed to load scholarships:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const timeoutId = setTimeout(() => {
      void loadData();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [token, loadData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    try {
      await createScholarship(formData);
      setFormData({
        title: '', amount: '', provider: '', url: '', deadline: '',
        status: 'Not started', eligibility: '', notes: ''
      });
      loadData();
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Error saving entry');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this entry from your hub?')) return;
    try {
      await deleteScholarship(id);
      setScholarships((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item.');
    }
  };

  const displayedScholarships = scholarships.filter((s) => 
    filterStage === 'All' ? true : s.status === filterStage
  );

  if (!token) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#2C302E] font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-[#E5E2DA] space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-2xl font-normal text-[#2C302E]">
              Scholarship & Grant Hub
            </h1>
            <p className="text-xs text-[#707571]">
              A calm, deliberate space to track your opportunities at any stage of life.
            </p>
          </div>

          <div className="bg-[#F9F8F5] p-1 rounded-2xl border border-[#E5E2DA] flex text-xs font-medium">
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-2 rounded-xl transition ${
                !isRegistering ? 'bg-white text-[#2C302E] shadow-xs' : 'text-[#707571]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-2 rounded-xl transition ${
                isRegistering ? 'bg-white text-[#2C302E] shadow-xs' : 'text-[#707571]'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="pt-2">
            {isRegistering ? (
              <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#2C302E] font-sans antialiased">
      <header className="bg-[#2D3A2F] text-[#E3E7D3] py-10 px-6 w-full">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs tracking-widest uppercase text-[#A3B19B] font-medium block">Personal Opportunity Tracker</span>
            <h1 className="font-serif text-2xl md:text-3xl mt-1 font-normal text-[#F2F4EB]">
              Welcome back, {user?.name || 'Applicant'}.
            </h1>
            <p className="text-xs text-[#B5C2AE] mt-1">
              Organize your funding goals smoothly and take it one application at a time.
            </p>
          </div>
          <button
            onClick={logout}
            className="text-xs bg-[#3E4E40] hover:bg-[#4A5C4C] text-[#E3E7D3] px-4 py-2 rounded-full transition border border-[#4A5C4C] self-start sm:self-auto"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
            <span className="text-xs text-[#707571] font-medium">Total Saved Opportunities</span>
            <span className="font-serif text-2xl font-normal text-[#2C302E] mt-2">{scholarships.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
            <span className="text-xs text-[#707571] font-medium">In Progress</span>
            <span className="font-serif text-2xl font-normal text-[#C86D51]">
              {scholarships.filter(s => s.status === 'In progress').length}
            </span>
          </div>
          <div className="bg-[#EFECE6] p-5 rounded-2xl border border-[#E0DCD3] shadow-xs flex flex-col justify-between">
            <span className="text-xs text-[#707571] font-medium">Daily Note</span>
            <p className="text-xs text-[#4A4E4B] italic mt-1">
              Focus on clarity and authenticity in your responses.
            </p>
          </div>
        </div>

        <details className="bg-white border border-[#E5E2DA] rounded-2xl p-5 shadow-xs group">
          <summary className="font-serif text-base text-[#2C302E] cursor-pointer flex justify-between items-center font-normal">
            <span>Add New Scholarship or Grant</span>
            <span className="text-xs text-[#707571] group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <form onSubmit={handleCreate} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              name="title"
              placeholder="Opportunity Name *"
              value={formData.title}
              onChange={handleInputChange}
              className="p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none"
              required
            />
            <input
              type="text"
              name="amount"
              placeholder="Award Amount ($)"
              value={formData.amount}
              onChange={handleInputChange}
              className="p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none"
            />
            <input
              type="text"
              name="provider"
              placeholder="Organization / Provider"
              value={formData.provider}
              onChange={handleInputChange}
              className="p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none"
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none"
            />
            <input
              type="url"
              name="url"
              placeholder="Application Link"
              value={formData.url}
              onChange={handleInputChange}
              className="p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none"
            >
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Awarded">Awarded</option>
            </select>
            <textarea
              name="eligibility"
              placeholder="Eligibility requirements or notes..."
              value={formData.eligibility}
              onChange={handleInputChange}
              className="md:col-span-3 p-3 rounded-xl border border-[#E5E2DA] bg-[#F9F8F5] outline-none h-20"
            />
            <button
              type="submit"
              className="md:col-span-3 bg-[#C86D51] hover:bg-[#B35C41] text-white font-medium py-3 rounded-xl transition shadow-xs"
            >
              Save Opportunity
            </button>
          </form>
        </details>

        <div className="flex justify-between items-center pt-2">
          <h2 className="font-serif text-lg text-[#2C302E]">Saved Applications</h2>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="bg-white border border-[#E5E2DA] text-xs px-3 py-1.5 rounded-xl outline-none text-[#707571]"
          >
            <option value="All">All Stages</option>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Submitted">Submitted</option>
            <option value="Awarded">Awarded</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E2DA]">
            <p className="text-xs text-[#707571]">Loading saved applications...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedScholarships.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E2DA]">
                <p className="font-serif text-[#2C302E]">No entries listed here.</p>
                <p className="text-xs text-[#707571] mt-1">Add a scholarship above to begin tracking.</p>
              </div>
            ) : (
              displayedScholarships.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E5E2DA] hover:border-[#D0CCC2] rounded-2xl p-5 shadow-xs transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base text-[#2C302E] font-medium">{item.title}</h3>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                          item.status === 'Awarded'
                            ? 'bg-[#E3E7D3] text-[#2D3A2F]'
                            : item.status === 'In progress'
                            ? 'bg-[#FBE8E1] text-[#C86D51]'
                            : 'bg-[#EFECE6] text-[#707571]'
                        }`}
                      >
                        {item.status || 'Not started'}
                      </span>
                    </div>
                    <p className="text-xs text-[#707571]">
                      {item.provider && <span>{item.provider} • </span>}
                      {item.amount && <strong className="text-[#2D3A2F]">${item.amount}</strong>}
                    </p>
                    {(item.eligibility || item.documents) && (
                      <p className="text-xs text-[#525754] bg-[#F9F8F5] p-2 rounded-lg mt-2 border border-[#E5E2DA]">
                        {item.eligibility || item.documents}
                      </p>
                    )}
                  </div>


                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#E5E2DA]">
                    {item.deadline && (
                      <div className="text-left md:text-right text-xs">
                        <span className="text-[#707571] block">Deadline</span>
                        <span className="font-medium text-[#2C302E]">{item.deadline}</span>
                      </div>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#C86D51] hover:underline font-medium"
                      >
                        Portal
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-[#707571] hover:text-red-500 transition px-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}