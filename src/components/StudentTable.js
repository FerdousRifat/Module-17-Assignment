"use client";

export default function StudentTable({ students, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="py-10 text-center text-slate-500">Loading...</p>;
  }

  if (students.length === 0) {
    return (
      <p className="py-10 text-center text-slate-500">
        No students yet. Add one using the form above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((s, i) => (
            <tr key={s._id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-500">{i + 1}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
              <td className="px-4 py-3">{s.email}</td>
              <td className="px-4 py-3">{s.phone}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {s.department}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEdit(s)}
                  className="mr-2 rounded-md bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(s)}
                  className="rounded-md bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
