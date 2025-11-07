import React from 'react';
import { Trash2, FileDown } from 'lucide-react';

function toCSV(rows) {
  const header = ['Date', 'Time', 'Quantity (ml)', 'Amount (INR)'];
  const escape = (v) => {
    const s = String(v ?? '');
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const lines = [header.join(',')].concat(
    rows.map((e) => [e.date, e.time, e.quantity, e.amount].map(escape).join(','))
  );
  return lines.join('\n');
}

export default function EntriesTable({ entries, onDelete }) {
  const totalQuantity = entries.reduce((sum, e) => sum + (e.quantity || 0), 0);
  const totalAmount = entries.reduce((sum, e) => sum + (e.amount || 0), 0);

  const handleExport = () => {
    const csv = toCSV(entries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curd-entries.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-black/5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Entries</h2>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Total: <span className="font-medium">{totalQuantity} ml</span> · ₹ <span className="font-medium">{totalAmount}</span>
          </div>
          <button onClick={handleExport} className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-emerald-700 hover:bg-emerald-100">
            <FileDown className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-4">Quantity (ml)</th>
              <th className="py-2 pr-4">Amount (₹)</th>
              <th className="py-2 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">No entries yet</td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id || e._id} className="border-t border-gray-100">
                  <td className="py-2 pr-4">{e.date}</td>
                  <td className="py-2 pr-4">{e.time}</td>
                  <td className="py-2 pr-4">{e.quantity}</td>
                  <td className="py-2 pr-4">₹ {e.amount}</td>
                  <td className="py-2 pr-2 text-right">
                    <button
                      onClick={() => onDelete?.(e.id || e._id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
