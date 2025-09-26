import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, Filter, Upload, Download, MapPin } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

function toCsv(rows) {
  const header = Object.keys(rows[0] || {}).join(',');
  const body = rows.map(r => Object.values(r).join(',')).join('\n');
  return `${header}\n${body}`;
}

export default function ResearcherDashboard() {
  const navigate = useNavigate();
  // Dummy dataset of samples
  const [samples] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      date: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString().slice(0, 10),
      location: ['Bay Area', 'Chennai', 'Sydney', 'Berlin'][i % 4],
      count: Math.round(50 + Math.random() * 150),
      avgSize: Math.round(20 + Math.random() * 80),
      lat: 12 + Math.random() * 20,
      lng: 77 + Math.random() * 20,
    }))
  );

  const [filters, setFilters] = useState({
    from: '',
    to: '',
    location: 'All',
    minCount: '',
    maxCount: '',
  });

  const filtered = useMemo(() => {
    return samples.filter(s => {
      if (filters.from && s.date < filters.from) return false;
      if (filters.to && s.date > filters.to) return false;
      if (filters.location !== 'All' && s.location !== filters.location) return false;
      if (filters.minCount && s.count < Number(filters.minCount)) return false;
      if (filters.maxCount && s.count > Number(filters.maxCount)) return false;
      return true;
    });
  }, [samples, filters]);

  const trendData = filtered
    .slice()
    .reverse()
    .map(s => ({ date: s.date.slice(5), total: s.count }));

  const sizeDist = useMemo(() => {
    const buckets = [0, 20, 40, 60, 80, 100];
    const result = buckets.map((b, i) => ({
      bucket: i === 0 ? '0-20' : `${b}-${b + 20}`,
      count: 0,
    }));
    filtered.forEach(s => {
      const idx = Math.min(5, Math.floor(s.avgSize / 20));
      result[idx].count += 1;
    });
    return result;
  }, [filtered]);

  const contributors = useMemo(() => (
    [
      { name: 'Lab A', samples: 128 },
      { name: 'WaterWatch', samples: 97 },
      { name: 'Coastal Lab', samples: 66 },
      { name: 'Enviro Group', samples: 41 },
    ]
  ), []);

  function exportCsv() {
    if (filtered.length === 0) return alert('No rows to export');
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'researcher-data.csv';
    a.click();
  }

  function handleSignOut() {
    try {
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
    } catch (e) {}
    navigate('/auth?role=researcher', { replace: true });
  }

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} transition-all duration-200 shrink-0 border-r border-blue-100 bg-white/80 backdrop-blur`}>
        <div className="h-16 flex items-center justify-between px-3 border-b border-gray-200 text-sm font-semibold">
          <span className={`${collapsed ? 'hidden' : 'block'}`}>Researcher</span>
          <button
            aria-label="Toggle sidebar"
            className="rounded-md px-2 py-1 text-gray-600 hover:bg-blue-50"
            onClick={() => setCollapsed(v => !v)}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>
        <nav className="p-2 space-y-1 text-sm">
          <Link to="/dashboard/researcher" className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-700 hover:bg-blue-50">
            <span className="text-base">🏠</span>
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Home</span>
          </Link>
          <Link to="/dashboard/researcher" className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-700 hover:bg-blue-50">
            <span className="text-base">📊</span>
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
          </Link>
          <button onClick={handleSignOut} className="mt-4 w-full flex items-center gap-2 rounded-md px-2 py-2 text-left text-gray-700 hover:bg-blue-50">
            <span className="text-base">🚪</span>
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Sign out</span>
          </button>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 min-w-0">
        <header className="h-16 flex items-center justify-between border-b border-blue-100 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold">Researcher Dashboard</span>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <section className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900"><Filter className="h-4 w-4" /> Filter samples</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <div>
              <label className="mb-1 block text-xs text-gray-600">From</label>
              <input type="date" value={filters.from} onChange={(e)=>setFilters(f=>({...f, from: e.target.value}))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">To</label>
              <input type="date" value={filters.to} onChange={(e)=>setFilters(f=>({...f, to: e.target.value}))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">Location</label>
              <select value={filters.location} onChange={(e)=>setFilters(f=>({...f, location: e.target.value}))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                {['All','Bay Area','Chennai','Sydney','Berlin'].map(l=> <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">Min count</label>
              <input type="number" value={filters.minCount} onChange={(e)=>setFilters(f=>({...f, minCount: e.target.value}))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">Max count</label>
              <input type="number" value={filters.maxCount} onChange={(e)=>setFilters(f=>({...f, maxCount: e.target.value}))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-end">
              <button onClick={exportCsv} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"><Download className="h-4 w-4" /> Export CSV</button>
            </div>
          </div>
        </section>

        {/* Analytics Cards */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-gray-500">Total Samples</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{filtered.length}</div>
            <div className="mt-4 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData.slice(-10)}>
                  <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-gray-500">Avg Count per Sample</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{Math.round(filtered.reduce((a, s) => a + s.count, 0) / Math.max(1, filtered.length))}</div>
            <div className="mt-4 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData.slice(-10)}>
                  <Line type="monotone" dataKey="total" stroke="#9ca3af" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-semibold text-gray-900">Particle Size Distribution</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={sizeDist}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="bucket" label={{ value: 'Size (µm)', position: 'insideBottom', offset: -5 }} />
                <YAxis allowDecimals={false} label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Contribution and Leaderboard */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">Dataset Contribution</div>
              <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Upload className="h-4 w-4" /> Upload ZIP</button>
            </div>
            <div className="rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-500">Drag and drop a .zip file with labeled images to contribute to the dataset.</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-gray-900">Leaderboard</div>
            <ul className="space-y-2 text-sm">
              {contributors.map(c => (
                <li key={c.name} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
                  <span>{c.name}</span>
                  <span className="font-semibold">{c.samples}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900"><MapPin className="h-4 w-4" /> Sample Locations (heatmap placeholder)</div>
          <div className="h-72 w-full rounded-md bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Simple scatter representation */}
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {filtered.slice(0, 50).map((s, idx) => (
                <circle key={idx} cx={(s.lng % 100)} cy={(s.lat % 100)} r="1.8" fill="#2563eb" fillOpacity="0.6" />
              ))}
            </svg>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
