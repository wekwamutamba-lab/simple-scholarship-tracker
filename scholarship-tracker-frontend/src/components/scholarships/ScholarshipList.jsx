function ScholarshipList({ scholarships, onDelete }) {
  if (!scholarships || scholarships.length === 0) {
    return <p className="text-gray-500 text-center py-4">No scholarships added yet.</p>;
  }

  return (
    <div className="space-y-4">
      {scholarships.map((s) => (
        <div key={s.id} className="p-4 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-800 text-lg">{s.title}</h3>
              {s.status && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                  {s.status}
                </span>
              )}
            </div>
            <p className="text-emerald-600 font-semibold text-sm mt-1">${s.amount}</p>
            
            {(s.provider || s.deadline || s.url) && (
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                {s.provider && <p><span className="font-medium">Provider:</span> {s.provider}</p>}
                {s.deadline && <p><span className="font-medium">Deadline:</span> {s.deadline}</p>}
                {s.url && (
                  <p>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                      View Link
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <button 
            onClick={() => onDelete(s.id)} 
            className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-1.5 px-3 rounded-md transition duration-150"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ScholarshipList;