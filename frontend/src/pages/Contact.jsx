import React, { useState } from 'react';
import { Microscope, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 600));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Microscope className="h-6 w-6 text-blue-600" />
            <span className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">MicroPlastic Detector</span>
          </Link>
          <nav className="hidden gap-6 text-sm text-gray-600 sm:flex">
            <Link to="/auth" className="hover:text-gray-900">Sign in</Link>
            <Link to="/dashboard/user" className="hover:text-gray-900">Dashboard</Link>
            <Link to="/contact" className="text-blue-700 hover:text-blue-800">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Microscope className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Contact Us</h1>
        </div>
        <p className="mt-2 max-w-2xl text-gray-600">Have questions or feedback? We'd love to hear from you.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-blue-100">
              <div className="mb-2 flex items-center gap-2 text-gray-900">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Email</span>
              </div>
              <div className="text-sm text-gray-600">support@example.com</div>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-blue-100">
              <div className="mb-2 flex items-center gap-2 text-gray-900">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Phone</span>
              </div>
              <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-blue-100">
              <div className="mb-2 flex items-center gap-2 text-gray-900">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Address</span>
              </div>
              <div className="text-sm text-gray-600">Silicon Valley, CA</div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm ring-1 ring-blue-100">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input name="subject" value={form.subject} onChange={onChange} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" rows="5" value={form.message} onChange={onChange} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
            <div className="mt-4">
              <button disabled={status==='submitting'} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
                <Send className="h-4 w-4" /> {status==='submitting' ? 'Sending…' : status==='success' ? 'Sent!' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
