import React from 'react';
import { Droplets, Heart, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500 text-white">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0 8%, transparent 8%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.35) 0 6%, transparent 6%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 0 10%, transparent 10%)',
        }}
      />
      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Droplets className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Curd Tracker</h1>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-sm bg-white/15 px-3 py-2 rounded-xl backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          <span>Colorful, simple daily tracking</span>
        </div>
      </div>
      <div className="relative px-6 sm:px-8 pb-6 sm:pb-8 text-white/90">
        <p className="max-w-2xl text-sm sm:text-base">
          Record when curd was taken, how much was taken, and how much was paid — all in one place.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <Badge>
            <Droplets className="h-3.5 w-3.5 mr-1" /> Daily intake
          </Badge>
          <Badge>
            <Heart className="h-3.5 w-3.5 mr-1" /> Family friendly
          </Badge>
        </div>
      </div>
    </header>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
      {children}
    </span>
  );
}
