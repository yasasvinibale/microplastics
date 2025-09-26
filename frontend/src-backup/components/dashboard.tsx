import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { 
  TestTube, 
  AlertTriangle, 
  TrendingUp, 
  Droplets,
  Calendar,
  MapPin,
  Download,
  Zap,
  Cpu,
  Camera
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const detectionData = [
  { time: '00:00', particles: 12, concentration: 0.8 },
  { time: '04:00', particles: 18, concentration: 1.2 },
  { time: '08:00', particles: 25, concentration: 1.8 },
  { time: '12:00', particles: 31, concentration: 2.1 },
  { time: '16:00', particles: 28, concentration: 1.9 },
  { time: '20:00', particles: 22, concentration: 1.5 },
]

const plasticTypes = [
  { name: 'Polyethylene (PE)', value: 35, color: '#3b82f6' },
  { name: 'Polypropylene (PP)', value: 28, color: '#10b981' },
  { name: 'PET', value: 20, color: '#f59e0b' },
  { name: 'Polystyrene (PS)', value: 12, color: '#ef4444' },
  { name: 'Unknown/Mixed', value: 5, color: '#8b5cf6' },
]

const recentSamples = [
  { id: 'SEN-001', location: 'Ganga River, Varanasi', status: 'High Risk', particles: 45, date: '2024-01-15', sensorType: 'Optical-ML' },
  { id: 'SEN-002', location: 'Yamuna River, Delhi', status: 'Moderate', particles: 23, date: '2024-01-15', sensorType: 'Fluorescence' },
  { id: 'SEN-003', location: 'Narmada River, MP', status: 'Low Risk', particles: 8, date: '2024-01-14', sensorType: 'Light Scattering' },
  { id: 'SEN-004', location: 'Godavari River, AP', status: 'High Risk', particles: 52, date: '2024-01-14', sensorType: 'Optical-ML' },
]

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>SIH 2025 - Microplastics Sensor Platform</h1>
          <p className="text-muted-foreground">
            Smart India Hackathon: Development of Sensor for Detection of Microplastics (PS ID: 25036)
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Sensor Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Sensor Network</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Active</div>
            <p className="text-xs text-muted-foreground">
              Battery: 87% avg | Solar powered
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Detection Range</CardTitle>
            <Camera className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10-100 μm</div>
            <p className="text-xs text-muted-foreground">
              Optical signature analysis
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>ML Accuracy</CardTitle>
            <Cpu className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <p className="text-xs text-muted-foreground">
              Pattern recognition model
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Processing Speed</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">&lt; 3 min</div>
            <p className="text-xs text-muted-foreground">
              Real-time analysis
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Performance Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sensor Network Performance</CardTitle>
            <CardDescription>
              Real-time optical detection and ML processing results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={detectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="particles" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Particle Count"
                />
                <Line 
                  type="monotone" 
                  dataKey="concentration" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Concentration (μg/L)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Polymer Identification */}
        <Card>
          <CardHeader>
            <CardTitle>Polymer Classification</CardTitle>
            <CardDescription>
              AI-powered polymer type identification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plasticTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {plasticTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {plasticTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="flex-1">{type.name}</span>
                  <span className="font-medium">{type.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Deployments */}
        <Card>
          <CardHeader>
            <CardTitle>Active Sensor Deployments</CardTitle>
            <CardDescription>
              Field-deployed sensors across Indian water bodies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSamples.map((sample) => (
                <div key={sample.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{sample.id}</span>
                      <Badge 
                        variant={
                          sample.status === 'High Risk' ? 'destructive' : 
                          sample.status === 'Moderate' ? 'default' : 
                          'secondary'
                        }
                      >
                        {sample.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{sample.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{sample.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{sample.particles}</div>
                    <div className="text-muted-foreground">particles/L</div>
                    <div className="text-xs text-muted-foreground mt-1">{sample.sensorType}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sensor Development */}
        <Card>
          <CardHeader>
            <CardTitle>Sensor Prototype</CardTitle>
            <CardDescription>
              Low-cost portable optical detection system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1662601316968-af7e0fb73b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNlbnNvciUyMGRldmljZSUyMHdhdGVyJTIwdGVzdGluZ3xlbnwxfHx8fDE3NTc5MTQ3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Portable water testing sensor device"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Development Progress</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="w-full" />
              <p className="text-muted-foreground">
                Prototype testing: Battery life, Solar integration
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}