import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Camera, ImageUp, CloudDownload, LogOut, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

const COLORS = ['#2563eb', '#e5e7eb'];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [espIp, setEspIp] = useState('http://192.168.4.1');
  const [stats, setStats] = useState({
    total: 0,
    micro: 0,
    non: 0,
    purity: 100,
  });
  const [history, setHistory] = useState([]);
  const [communityAvg, setCommunityAvg] = useState(76);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  // Derived datasets
  const pieData = [
    { name: 'Microplastic', value: stats.micro },
    { name: 'Non-plastic', value: stats.non },
  ];

  function updateDummyStats(base = 42) {
    const micro = Math.round(base + Math.random() * 30);
    const non = Math.round(20 + Math.random() * 25);
    const total = micro + non;
    const purity = Math.max(0, Math.min(100, Math.round(100 - (micro / Math.max(1, total)) * 100)));
    setStats({ total, micro, non, purity });
  }

  function handleSignOut() {
    try {
      // Clear any stored session (placeholder)
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
    } catch (e) {
      // ignore
    }
    navigate('/auth?role=user', { replace: true });
  }

  // Save Report (PDF) using dynamic CDN scripts
  async function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) { existing.onload = resolve; existing.onerror = reject; return resolve(); }
      const s = document.createElement('script');
      s.src = src; s.async = true; s.onload = resolve; s.onerror = reject; document.body.appendChild(s);
    });
  }

  async function saveReportPDF() {
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
      const { jsPDF } = window.jspdf || {};
      const pdf = new jsPDF('p', 'mm', 'a4');
      let y = 10;
      pdf.setFontSize(16);
      pdf.text('MicroPlastic Report', 105, y, { align: 'center' }); y += 8;
      pdf.setFontSize(11);
      pdf.text(`Date: ${new Date().toLocaleString()}`, 10, y); y += 6;
      pdf.text(`Total Particles: ${stats.total}`, 10, y); y += 6;
      pdf.text(`Microplastic Count: ${stats.micro}`, 10, y); y += 6;
      pdf.text(`Non-plastic Count: ${stats.non}`, 10, y); y += 6;
      pdf.text(`Water Purity: ${stats.purity}% (${stats.purity >= 80 ? 'Safe' : 'Unsafe'})`, 10, y); y += 8;
      if (imageSrc) {
        // Add image preview
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;
        await new Promise((res) => { img.onload = res; img.onerror = res; });
        const maxW = 180, maxH = 100;
        const ratio = Math.min(maxW / img.width, maxH / img.height);
        const w = Math.max(10, Math.min(maxW, img.width * ratio));
        const h = Math.max(10, Math.min(maxH, img.height * ratio));
        pdf.text('Preview:', 10, y); y += 4;
        pdf.addImage(img, 'PNG', 10, y, w, h);
        y += h + 6;
      }
      pdf.text(`Community Avg Purity: ${communityAvg}%`, 10, y); y += 8;
      pdf.save('microplastic-report.pdf');
    } catch (e) {
      alert('Unable to generate PDF. You can use the browser print function as a fallback.');
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await api.get('/dashboard/stats');
        if (cancelled) return;
        // Map backend fields to local stats
        const total = Number(data?.total_samples ?? 0);
        const micro = Number(data?.unsafe_samples ?? 0); // assuming unsafe => plastics present
        const non = Math.max(0, total - micro);
        const purity = total > 0 ? Math.round((non / total) * 100) : 100;
        setStats({ total, micro, non, purity });

        // History
        try {
          const hist = await api.get('/results/history');
          if (!cancelled && Array.isArray(hist)) {
            const mapped = hist.map((item, idx) => ({ idx: idx + 1, micro: Number(item?.particle_count ?? 0) }));
            setHistory(mapped);
          }
        } catch (_) { /* ignore, keep default */ }

        // Analytics
        try {
          const analytics = await api.get('/results/analytics');
          if (!cancelled && analytics) {
            const sp = Number(analytics.safe_percentage ?? 76);
            if (!Number.isNaN(sp)) setCommunityAvg(sp);
          }
        } catch (_) { /* ignore */ }
      } catch (_) {
        // Fallback to local dummy stats
        if (!cancelled) updateDummyStats();
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Analyze sample -> calls backend /predict using current image or camera frame
  async function analyzeSample() {
    try {
      let payload = imageSrc;
      if (!payload && videoRef.current) {
        // Capture a frame from camera
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          payload = canvas.toDataURL('image/png');
        }
      }
      if (!payload) {
        alert('No image available. Please upload or capture an image first.');
        return;
      }

      const res = await api.post('/predict', { payload_data: payload });
      // Map result into stats
      const particleCount = Number(res?.particle_count ?? res?.prediction_result?.count ?? 0);
      const plasticPresent = Boolean(res?.plastic_present ?? res?.prediction_result?.is_detected ?? false);
      const micro = plasticPresent ? particleCount : 0;
      const total = Math.max(stats.total, micro + stats.non); // keep at least current scale
      const non = Math.max(0, total - micro);
      const purity = total > 0 ? Math.round((non / total) * 100) : stats.purity;
      setStats({ total, micro, non, purity });

      // Append to history visualization
      setHistory(prev => {
        const next = [...prev, { idx: (prev[prev.length - 1]?.idx || 0) + 1, micro: particleCount }];
        return next.slice(-12);
      });
    } catch (err) {
      alert('Prediction failed. Please ensure the backend and ML service are running.');
    }
  }

  // Upload from gallery
  function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    updateDummyStats(55);
  }

  // Device Camera controls
  async function startCamera() {
    try {
      // Stop any existing streams first
      stopCamera();
      
      // Request camera access with constraints
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Prefer the rear camera
        },
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        // Set the stream to the video element
        videoRef.current.srcObject = stream;
        // Play the video
        await videoRef.current.play().catch(err => {
          console.error('Error playing video stream:', err);
          throw new Error('Could not start video playback');
        });
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      let errorMessage = 'Could not access the camera.';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera access was denied. Please allow camera access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera is already in use by another application.';
      } else if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
        errorMessage = 'The requested camera configuration is not supported.';
      }
      
      alert(errorMessage);
      stopCamera();
    }
  }

  function stopCamera() {
    const video = videoRef.current;
    if (!video) return;
    
    // Pause the video
    video.pause();
    
    // Stop all tracks in the stream
    const stream = video.srcObject;
    if (stream && typeof stream.getTracks === 'function') {
      try {
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
      } catch (err) {
        console.error('Error stopping camera tracks:', err);
      }
    }
    
    // Clear the video source
    video.srcObject = null;
    setCameraActive(false);
  }
  
  // Clean up camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  function captureFromCamera() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImageSrc(dataUrl);
    updateDummyStats(60);
  }

  // Fetch from ESP32-CAM
  async function fetchFromEsp() {
    try {
      const res = await fetch(`${espIp}/capture`);
      if (!res.ok) throw new Error('ESP32 fetch failed');
      const blob = await res.blob();
      setImageSrc(URL.createObjectURL(blob));
      updateDummyStats(50);
    } catch (e) {
      alert('Could not fetch image from ESP32-CAM. Check IP and network.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      {/* Left Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} transition-all duration-200 shrink-0 border-r border-blue-100 bg-white/80 backdrop-blur`}> 
        <div className="h-16 flex items-center justify-between px-3 border-b border-gray-200 text-sm font-semibold">
          <span className={`${collapsed ? 'hidden' : 'block'}`}>User</span>
          <button
            aria-label="Toggle sidebar"
            className="rounded-md px-2 py-1 text-gray-600 hover:bg-blue-50"
            onClick={() => setCollapsed(v => !v)}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>
        <nav className="p-2 space-y-1 text-sm">
          <Link to="/dashboard/user" className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-700 hover:bg-blue-50">
            <span className="text-base">🏠</span>
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Home</span>
          </Link>
          <Link to="/dashboard/user" className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-700 hover:bg-blue-50">
            <span className="text-base">📊</span>
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
          </Link>
          <button onClick={handleSignOut} className="mt-4 w-full flex items-center gap-2 rounded-md px-2 py-2 text-left text-gray-700 hover:bg-blue-50">
            <span className="text-base">🚪</span>
            <span className={`${collapsed ? 'hidden' : 'block'}`}>Sign out</span>
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 min-w-0">
        <header className="h-16 flex items-center justify-between border-b border-blue-100 bg-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold text-gray-900">User Dashboard</h1>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Upload Image</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <ImageUp className="h-4 w-4" /> Upload Image
                  </button>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={onPickFile} 
                  />
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm text-gray-500">or</span>
                    <input 
                      type="text" 
                      value={espIp} 
                      onChange={(e) => setEspIp(e.target.value)}
                      placeholder="ESP32-CAM IP"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button 
                      onClick={fetchFromEsp}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <CloudDownload className="h-4 w-4" /> Fetch
                    </button>
                  </div>
                </div>

                {/* Device camera controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {!cameraActive ? (
                    <button onClick={startCamera} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      <Camera className="h-4 w-4" /> Start Camera
                    </button>
                  ) : (
                    <>
                      <button onClick={captureFromCamera} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <Camera className="h-4 w-4" /> Capture
                      </button>
                      <button onClick={stopCamera} className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Stop Camera
                      </button>
                    </>
                  )}
                </div>

                {/* Image Preview */}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="aspect-video overflow-hidden rounded-lg border-2 border-dashed border-blue-100 bg-blue-50">
                  {imageSrc ? (
                    <img 
                      src={imageSrc} 
                      alt="Uploaded preview" 
                      className="h-full w-full object-contain" 
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-blue-400">
                      <p className="text-sm">No image selected</p>
                    </div>
                  )}
                  </div>
                  <div className="aspect-video overflow-hidden rounded-lg border border-blue-100 bg-black">
                    <video ref={videoRef} className="h-full w-full object-contain" />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                </div>
              </div>
            </div>

          {/* Results Section */}
          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Analysis Results</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm font-medium text-gray-500">Particle Count</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm font-medium text-gray-500">Plastic Presence</div>
                <div className="mt-1 text-2xl font-semibold text-blue-600">
                  {stats.micro > 0 ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
                  <span>Water Purity</span>
                  <span className="text-gray-400">{stats.purity}%</span>
                </div>
                <div className="relative mx-auto h-28 w-28">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${stats.purity >= 80 ? '#16a34a' : '#dc2626'} ${stats.purity * 3.6}deg, #e5e7eb 0deg)`,
                    }}
                  />
                  <div className="absolute inset-2 rounded-full bg-white" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-semibold text-gray-900">{stats.purity}%</div>
                      <div className={`text-xs ${stats.purity >= 80 ? 'text-green-600' : 'text-red-600'}`}>{stats.purity >= 80 ? 'Safe' : 'Unsafe'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-lg border border-blue-100 p-4">
                <div className="h-24 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        dataKey="value" 
                        nameKey="name" 
                        innerRadius={30} 
                        outerRadius={40}
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-1 text-center text-xs text-gray-500">
                    {stats.micro}% microplastics
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={saveReportPDF} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                <Download className="h-4 w-4" /> Save Report (PDF)
              </button>
              <button onClick={analyzeSample} className="ml-2 inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Analyze
              </button>
            </div>
          </div>

          {/* Recent trends (Bar chart) */}
          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Historical Trends (last 12 reports)</h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={history} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="idx" tickFormatter={(v) => `#${v}`} label={{ value: 'Report #', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Micro count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="micro" fill="#2563eb" radius={[6, 6, 0, 0]} name="Microplastics" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Community Comparison */}
          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Community Comparison</h2>
            <div className="text-sm text-gray-600">Your score vs regional average</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-xs uppercase text-blue-700">You</div>
                <div className="text-2xl font-bold text-blue-700">{stats.purity}%</div>
              </div>
              <div className="rounded-lg bg-white p-4 ring-1 ring-blue-100">
                <div className="text-xs uppercase text-gray-600">Region</div>
                <div className="text-2xl font-bold text-gray-900">{communityAvg}%</div>
              </div>
            </div>
          </div>
        </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Camera Feed */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              {/* */}
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                {espIp ? (
                  <img 
                    src={`${espIp}/stream`} 
                    alt="ESP32-CAM Feed" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23f3f4f6%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22285.5%22%20y%3D%22220%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%20fill%3D%22%236b7280%22%3ECamera%20feed%20unavailable%3C%2Ftext%3E%3C%2Fsvg%3E';
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <Camera className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={espIp}
                  onChange={(e) => setEspIp(e.target.value)}
                  placeholder="ESP32-CAM IP"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                  onClick={fetchFromEsp}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <CloudDownload className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="mb-2 text-sm font-medium text-blue-800">Tips for better results</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">1</span>
                  <span>Use good lighting when capturing images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">2</span>
                  <span>Ensure the sample is in focus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">3</span>
                  <span>Avoid shadows and reflections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}
