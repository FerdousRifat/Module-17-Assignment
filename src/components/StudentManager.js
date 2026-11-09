"use client";

import { useCallback, useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState(null);

  function notify(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  }

  const loadStudents = useCallback(async () => {
    try {
      const res = await fetch("/api/students", { cache: "no-store" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setStudents(json.data);
    } catch (err) {
      notify("error", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  async function handleSubmit(form) {
    setSaving(true);
    try {
      const url = editing ? `/api/students/${editing._id}` : "/api/students";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      notify("success", editing ? "Student updated" : "Student added");
      setEditing(null);
      await loadStudents();
      return true;
    } catch (err) {
      notify("error", err.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(student) {
    if (!confirm(`Delete "${student.name}"?`)) return;
    try {
      const res = await fetch(`/api/students/${student._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      if (editing?._id === student._id) setEditing(null);
      notify("success", "Student deleted");
      await loadStudents();
    } catch (err) {
      notify("error", err.message);
    }
  }

  function handleEdit(student) {
    setEditing(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <StudentForm
        editing={editing}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold">
          All Students ({students.length})
        </h2>
        <StudentTable
          students={students}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
