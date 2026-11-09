"use client";

import { useEffect, useState } from "react";

const EMPTY = { name: "", email: "", phone: "", department: "" };

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "e.g. Rahim Uddin" },
  { name: "email", label: "Email", type: "email", placeholder: "rahim@example.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "01XXXXXXXXX" },
  { name: "department", label: "Department", type: "text", placeholder: "e.g. CSE" },
];

export default function StudentForm({ editing, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(
      editing
        ? {
            name: editing.name,
            email: editing.email,
            phone: editing.phone,
            department: editing.department,
          }
        : EMPTY
    );
  }, [editing]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await onSubmit(form);
    if (ok && !editing) setForm(EMPTY);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold">
        {editing ? "Edit Student" : "Add New Student"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.name} className="block text-sm font-medium text-slate-700">
            {f.label}
            <input
              required
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : editing ? "Update" : "Add Student"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
