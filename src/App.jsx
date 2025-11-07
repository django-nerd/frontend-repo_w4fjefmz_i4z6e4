import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import EntryForm from './components/EntryForm';
import EntriesTable from './components/EntriesTable';
import SummaryCards from './components/SummaryCards';

// Simple localStorage persistence so data stays after refresh
const STORAGE_KEY = 'curd-tracker-entries-v1';

export default function App() {
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      const ad = `${a.date}T${a.time}`;
      const bd = `${b.date}T${b.time}`;
      return bd.localeCompare(ad);
    });
  }, [entries]);

  const handleAdd = (entry) => setEntries((prev) => [entry, ...prev]);
  const handleDelete = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-fuchsia-50 to-indigo-50 text-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-6">
        <Header />
        <SummaryCards entries={sortedEntries} />
        <EntryForm onAdd={handleAdd} />
        <EntriesTable entries={sortedEntries} onDelete={handleDelete} />
        <footer className="pt-2 pb-6 text-center text-xs text-gray-500">
          Made with love to help mom track curd easily 💖
        </footer>
      </div>
    </div>
  );
}
