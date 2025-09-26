import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User2, Microscope, Waves } from 'lucide-react';

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-600" />
            <span className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">MicroPlastic Detector</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 sm:text-5xl">MicroPlastic Detector</h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">Choose your role to continue</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <button
            onClick={() => navigate('/auth?role=user')}
            className="group rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100">
              <User2 className="h-6 w-6" />
            </div>
            <div className="text-xl font-semibold text-gray-900">User</div>
            <p className="mt-1 text-gray-600">Analyze personal water samples and track your results.</p>
          </button>

          <button
            onClick={() => navigate('/auth?role=researcher')}
            className="group rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100">
              <Microscope className="h-6 w-6" />
            </div>
            <div className="text-xl font-semibold text-gray-900">Researcher</div>
            <p className="mt-1 text-gray-600">Run analytics at scale, manage datasets, and export results.</p>
          </button>
        </div>
      </main>
    </div>
  );
}
