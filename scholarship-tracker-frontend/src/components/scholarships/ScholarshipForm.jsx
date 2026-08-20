import { useState } from 'react';
import { createScholarship } from '../../services/api';

function ScholarshipForm({ onScholarshipAdded }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createScholarship({ title, amount: Number(amount) });
      setTitle('');
      setAmount('');
      if (onScholarshipAdded) onScholarshipAdded();
      alert('Scholarship added!');
    } catch (err) {
      alert('Failed to add scholarship');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Scholarship</h3>
      <input 
        type="text" 
        placeholder="Scholarship Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount ($)" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button type="submit">Add Scholarship</button>
    </form>
  );
}

export default ScholarshipForm;