import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Activity, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin,
  Thermometer,
  Gauge,
  Zap,
  Camera,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function MonitorDashboard() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentSample, setCurrentSample] = useState<any>(null)

  // Mock real-time data
  const [sensorData, setSensorData] = useState({
    temperature: 23.5,
    ph: 7.2,
    turbidity: 12.3,
    flow: 2.1,
    particles: 0
  })

  const [recentDetections, setRecentDetections] = useState([
    { time: '14:23', count: 45, size: '15-50μm', type: 'PE', confidence: 94 },
    { time: '14:18', count: 32, size: '10-25μm', type: 'PP', confidence: 87 },
    { time: '14:12', count: 28, size: '25-100μm', type: 'PET', confidence: 91 },
    { time: '14:05', count: 67, size: '50-150μm', type: 'PS', confidence: 89 }
  ])

  // Mock chart data
  const chartData = [
    { time: '14:00', particles: 0 },
    { time: '14:05', particles: 67 },
    { time: '14:10', particles: 45 },
    { time: '14:15', particles: 32 },
    { time: '14:20', particles: 28 },
    { time: '14:25', particles: 45 }
  ]

  const handleScan = () => {
    if (isScanning) {
      // Stop scanning
      setIsScanning(false)
      setScanProgress(0)
    } else {
      // Start scanning
      setIsScanning(true)
      setScanProgress(0)
      
      // Simulate scan progress
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsScanning(false)
            // Generate mock detection
            setCurrentSample({
              id: `SAMPLE_${Date.now()}`,
              location: 'Ganga River, Kanpur',
              timestamp: new Date().toLocaleString(),
              particles: Math.floor(Math.random() * 100) + 10,
              contamination: Math.random() > 0.5 ? 'High' : 'Moderate'
            })
            return 100
          }
          return prev + 5
        })
      }, 200)
    }
  }

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
        ph: prev.ph + (Math.random() - 0.5) * 0.1,
        turbidity: prev.turbidity + (Math.random() - 0.5) * 2,
        flow: prev.flow + (Math.random() - 0.5) * 0.2,
        particles: isScanning ? Math.floor(Math.random() * 10) : 0
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isScanning])

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Field Monitor Dashboard</h1>
          <p className="text-muted-foreground">Real-time microplastics detection and monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isScanning ? 'default' : 'secondary'}>
            {isScanning ? 'Scanning Active' : 'Standby'}
          </Badge>
          <Badge variant="outline">
            <MapPin className="w-3 h-3 mr-1" />
            Ganga Research Station
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Particles</p>
                <p className="text-xl">{sensorData.particles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Thermometer className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-xl">{sensorData.temperature.toFixed(1)}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Gauge className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">pH Level</p>
                <p className="text-xl">{sensorData.ph.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">System Status</p>
                <p className="text-xl">
                  <Badge variant={isScanning ? 'default' : 'secondary'}>
                    {isScanning ? 'Active' : 'Ready'}
                  </Badge>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Detection Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Scan Controls */}
              <div className="space-y-4">
                <Button 
                  onClick={handleScan}
                  className="w-full"
                  variant={isScanning ? 'destructive' : 'default'}
                >
                  {isScanning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Scanning
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Scanning
                    </>
                  )}
                </Button>

                {isScanning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Scan Progress</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <Progress value={scanProgress} />
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Calibrate Sensors
                </Button>
              </div>

              {/* Current Sample Info */}
              {currentSample && (
                <div className="p-4 border rounded-lg space-y-2">
                  <h4>Latest Sample</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono">{currentSample.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{currentSample.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Particles:</span>
                      <span>{currentSample.particles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge variant={currentSample.contamination === 'High' ? 'destructive' : 'secondary'}>
                        {currentSample.contamination}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Environmental Sensors */}
              <div className="space-y-3">
                <h4>Environmental Sensors</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-muted rounded">
                    <div className="text-muted-foreground">Turbidity</div>
                    <div>{sensorData.turbidity.toFixed(1)} NTU</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="text-muted-foreground">Flow Rate</div>
                    <div>{sensorData.flow.toFixed(1)} m/s</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Charts and Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Particle Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="particles" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Detections */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Detections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDetections.map((detection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span>{detection.time}</span>
                          <Badge variant="outline">{detection.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {detection.count} particles • {detection.size}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{detection.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}