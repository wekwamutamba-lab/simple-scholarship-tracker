import { useState } from 'react';

function ScholarshipForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    provider: '',
    url: '',
    deadline: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    onAdd(formData);
    setFormData({
      title: '',
      amount: '',
      provider: '',
      url: '',
      deadline: '',
      status: 'Pending',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Scholarship</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Scholarship Title *</label>
          <input 
            type="text" 
            name="title"
            placeholder="e.g. STEM Leadership Award" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Amount ($) *</label>
          <input 
            type="number" 
            name="amount"
            placeholder="2500" 
            value={formData.amount} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Provider / Organization</label>
          <input 
            type="text" 
            name="provider"
            placeholder="e.g. Tech Foundation" 
            value={formData.provider} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Deadline</label>
          <input 
            type="date" 
            name="deadline"
            value={formData.deadline} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Application URL</label>
          <input 
            type="url" 
            name="url"
            placeholder="https://example.com/apply" 
            value={formData.url} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
          <select 
            name="status"
            value={formData.status} 
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-5 rounded-lg text-sm transition duration-150"
      >
        Save Scholarship
      </button>
    </form>
  );
}

export default ScholarshipForm;