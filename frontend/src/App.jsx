import React from 'react';
import { Waves, ShieldCheck, BarChart3, UploadCloud, ArrowRight, Camera, Microscope } from 'lucide-react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import UserDashboard from './pages/UserDashboard';
import ResearcherDashboard from './pages/ResearcherDashboard';
import Contact from './pages/Contact';

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Microscope className="h-6 w-6 text-blue-600" />
            <span className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">MicroPlastic Detector</span>
          </div>
          <nav className="hidden gap-6 text-sm text-gray-600 sm:flex">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#how" className="hover:text-gray-900">How it works</a>
            <Link to="/contact" className="hover:text-gray-900">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50">Sign in</Link>
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_300px_at_10%_10%,rgba(59,130,246,0.10),transparent),radial-gradient(700px_300px_at_90%_0%,rgba(59,130,246,0.08),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
              <ShieldCheck className="h-4 w-4" /> Trusted analytics for clean water
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Detect Microplastics with Confidence
            </h1>
            <p className="mt-4 max-w-xl text-gray-600">
              Upload images or connect your device to analyze water samples. Get fast, accurate, and easy-to-understand results.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/auth?role=user" className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                <UploadCloud className="h-4 w-4" /> Start as User
              </Link>
              <Link to="/auth?role=researcher" className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                <Camera className="h-4 w-4" /> Researcher Access
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md mx-auto">
              <div className="rounded-lg bg-white p-4 text-center shadow-sm ring-1 ring-blue-100">
                <div className="text-2xl font-bold text-blue-700">98%</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Accuracy</div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm ring-1 ring-blue-100">
                <div className="text-2xl font-bold text-blue-700">5s</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Avg time</div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm ring-1 ring-blue-100">
                <div className="text-2xl font-bold text-blue-700">12k+</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Images</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Why choose our platform</h2>
            <p className="mt-2 text-gray-600">Built for both users and researchers with speed, accuracy, and clarity in mind.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-blue-100">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700"><BarChart3 className="h-5 w-5" /></div>
              <div className="text-lg font-semibold text-gray-900">Clear analytics</div>
              <p className="mt-2 text-sm text-gray-600">Understand results at a glance with intuitive metrics and charts.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-blue-100">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700"><ShieldCheck className="h-5 w-5" /></div>
              <div className="text-lg font-semibold text-gray-900">Reliable detection</div>
              <p className="mt-2 text-sm text-gray-600">Backed by best practices in image analysis and quality checks.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-blue-100">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700"><UploadCloud className="h-5 w-5" /></div>
              <div className="text-lg font-semibold text-gray-900">Flexible uploads</div>
              <p className="mt-2 text-sm text-gray-600">Upload manually or connect devices like ESP32‑CAM in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[{n:1,t:'Upload',d:'Upload a sample image of your water.'},{n:2,t:'Analyze',d:'Our system detects and quantifies microplastics.'},{n:3,t:'Report',d:'View insights and download your report.'}].map(step => (
              <div key={step.n} className="rounded-xl bg-blue-50 p-6 ring-1 ring-blue-100">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 ring-1 ring-blue-200">{step.n}</div>
                <div className="mt-3 text-lg font-semibold text-gray-900">{step.t}</div>
                <p className="mt-1 text-sm text-gray-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-sm">
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <div className="text-2xl font-semibold">“Fast and accurate results that we can trust.”</div>
                <div className="mt-2 text-sm text-blue-100">— Environmental Lab Partner</div>
              </div>
              <div className="rounded-xl bg-white/10 p-6 ring-1 ring-white/20">
                <div className="text-sm">Get started today:</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link to="/auth?role=user" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">User</Link>
                  <Link to="/auth?role=researcher" className="inline-flex items-center justify-center rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Researcher</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-blue-100 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Waves className="h-4 w-4 text-blue-600" />
            <span>© {new Date().getFullYear()} MicroPlastic Detector</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-700" href="#features">Features</a>
            <a className="hover:text-gray-700" href="#how">How it works</a>
            <Link className="hover:text-gray-700" to="/auth?role=user">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
