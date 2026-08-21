import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ScholarshipForm from './components/scholarships/ScholarshipForm';
import ScholarshipList from './components/scholarships/ScholarshipList';
import { fetchScholarships, createScholarship, deleteScholarship } from './services/api';

function App() {
  const { user, token, logout } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch scholarships from database when token is available
  const loadScholarships = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchScholarships();
      setScholarships(res.data);
    } catch (err) {
      console.error('Failed to fetch scholarships:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScholarships();
  }, [token]);

  // Handler to create a new scholarship
  const handleAddScholarship = async (formData) => {
    try {
      await createScholarship(formData);
      await loadScholarships();
    } catch (err) {
      alert('Failed to save scholarship. Please try again.');
    }
  };

  // Handler to delete a scholarship
  const handleDeleteScholarship = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteScholarship(id);
      setScholarships((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete scholarship.');
    }
  };

  // Metric Calculations
  const totalFunding = scholarships.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const pendingCount = scholarships.filter((item) => item.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Scholarship Tracker</h1>
          {token && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600">
                Welcome, <strong className="text-slate-900">{user?.name || user?.email || 'Student'}</strong> 👋
              </span>
              <button 
                onClick={logout}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!token ? (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-start mt-6">
            <LoginForm />
            <RegisterForm />
          </div>
        ) : (
          <div>
            {/* Metric Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-semibold uppercase">Total Tracked Value</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">${totalFunding.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-semibold uppercase">Pending Applications</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
              </div>
            </div>

            {/* Form & List */}
            <ScholarshipForm onAdd={handleAddScholarship} />
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Your Scholarships</h2>
              {loading ? (
                <p className="text-gray-500 text-sm py-4 text-center">Loading applications...</p>
              ) : (
                <ScholarshipList scholarships={scholarships} onDelete={handleDeleteScholarship} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;