import React from 'react';
import { CalendarDays, Droplets, Wallet } from 'lucide-react';

export default function SummaryCards({ entries }) {
  const totalDays = new Set(entries.map((e) => e.date)).size;
  const totalQuantity = entries.reduce((sum, e) => sum + (e.quantity || 0), 0);
  const totalAmount = entries.reduce((sum, e) => sum + (e.amount || 0), 0);

  const cards = [
    {
      title: 'Days Tracked',
      value: totalDays,
      icon: <CalendarDays className="h-6 w-6" />,
      from: 'from-amber-400',
      to: 'to-orange-500',
    },
    {
      title: 'Total Curd',
      value: `${totalQuantity} ml`,
      icon: <Droplets className="h-6 w-6" />,
      from: 'from-cyan-400',
      to: 'to-blue-500',
    },
    {
      title: 'Total Paid',
      value: `Rs ${totalAmount}`,
      icon: <Wallet className="h-6 w-6" />,
      from: 'from-emerald-400',
      to: 'to-teal-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className={`rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${c.from} ${c.to}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm/5 opacity-90">{c.title}</div>
              <div className="mt-1 text-2xl font-bold">{c.value}</div>
            </div>
            <div className="opacity-90">{c.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
