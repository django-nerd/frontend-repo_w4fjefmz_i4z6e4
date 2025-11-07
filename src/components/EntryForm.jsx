import React, { useState } from 'react';
import { Calendar, Clock, Droplets, Banknote, Plus } from 'lucide-react';

export default function EntryForm({ onAdd }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));
  const [quantity, setQuantity] = useState('500');
  const [amount, setAmount] = useState('0');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity) return;
    const entry = {
      date,
      time,
      quantity: parseFloat(quantity),
      amount: parseFloat(amount || '0'),
    };
    onAdd?.(entry);
    setQuantity('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-black/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LabeledInput icon={<Calendar className="h-4 w-4 text-pink-600" />} label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </LabeledInput>
        <LabeledInput icon={<Clock className="h-4 w-4 text-indigo-600" />} label="Time">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </LabeledInput>
        <LabeledInput icon={<Droplets className="h-4 w-4 text-fuchsia-600" />} label="Quantity (ml)">
          <input
            type="number"
            min="0"
            step="50"
            placeholder="e.g. 500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            required
          />
        </LabeledInput>
        <LabeledInput icon={<Banknote className="h-4 w-4 text-emerald-600" />} label="Amount Paid (₹)">
          <input
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 40"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </LabeledInput>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow hover:opacity-95 active:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add Entry
        </button>
      </div>
    </form>
  );
}

function LabeledInput({ icon, label, children }) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
