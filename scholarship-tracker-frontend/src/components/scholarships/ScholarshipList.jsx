import { useState, useEffect } from 'react';
import { fetchScholarships, deleteScholarship } from '../../services/api';

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);

  const loadScholarships = async () => {
    try {
      const res = await fetchScholarships();
      setScholarships(res.data);
    } catch (err) {
      alert('Failed to load scholarships');
    }
  };

  useEffect(() => {
    loadScholarships();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteScholarship(id);
      loadScholarships();
    } catch (err) {
      alert('Failed to delete scholarship');
    }
  };

  return (
    <div>
      <h2>Scholarships</h2>
      {scholarships.length === 0 ? (
        <p>No scholarships found.</p>
      ) : (
        <ul>
          {scholarships.map((s) => (
            <li key={s.id}>
              <strong>{s.title}</strong> - ${s.amount} ({s.status})
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScholarshipList;