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
  const [usingBackend, setUsingBackend] = useState(false);
  const backendBase = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin.replace(':3000', ':8000') : '');

  // Try to load from backend on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${backendBase}/api/entries`);
        if (!res.ok) throw new Error('backend not ok');
        const data = await res.json();
        if (!cancelled) {
          setEntries(Array.isArray(data) ? data : []);
          setUsingBackend(true);
        }
      } catch (e) {
        // fallback to localStorage data already in state
        if (!cancelled) setUsingBackend(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Always keep a backup in localStorage for offline
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      const ad = `${a.date}T${a.time}`;
      const bd = `${b.date}T${b.time}`;
      return bd.localeCompare(ad);
    });
  }, [entries]);

  const handleAdd = async (entry) => {
    if (usingBackend) {
      try {
        const res = await fetch(`${backendBase}/api/entries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        if (!res.ok) throw new Error('Failed to create');
        const saved = await res.json();
        setEntries((prev) => [saved, ...prev]);
        return;
      } catch (e) {
        console.error(e);
      }
    }
    // Fallback: local only
    const withId = { id: crypto.randomUUID(), ...entry };
    setEntries((prev) => [withId, ...prev]);
  };

  const handleDelete = async (id) => {
    if (usingBackend && id) {
      try {
        const res = await fetch(`${backendBase}/api/entries/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        setEntries((prev) => prev.filter((e) => (e.id || e._id) !== id));
        return;
      } catch (e) {
        console.error(e);
      }
    }
    setEntries((prev) => prev.filter((e) => (e.id || e._id) !== id));
  };

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
