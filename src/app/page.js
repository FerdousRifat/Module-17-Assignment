import StudentManager from "@/components/StudentManager";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Student Management System
        </h1>
        <p className="mt-1 text-slate-500">
          Add, view, edit and delete student records.
        </p>
      </header>
      <StudentManager />
    </main>
  );
}
