import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  MapPin, 
  Calendar,
  Download,
  Filter,
  Eye,
  AlertTriangle
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts'

export function ResearcherDashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedLocation, setSelectedLocation] = useState('all')

  // Mock data for analysis
  const trendData = [
    { date: '2024-01-01', ganga: 45, yamuna: 32, narmada: 28, godavari: 35 },
    { date: '2024-01-02', ganga: 52, yamuna: 38, narmada: 31, godavari: 42 },
    { date: '2024-01-03', ganga: 48, yamuna: 35, narmada: 29, godavari: 38 },
    { date: '2024-01-04', ganga: 58, yamuna: 44, narmada: 35, godavari: 45 },
    { date: '2024-01-05', ganga: 62, yamuna: 49, narmada: 38, godavari: 48 },
    { date: '2024-01-06', ganga: 55, yamuna: 41, narmada: 33, godavari: 43 },
    { date: '2024-01-07', ganga: 67, yamuna: 56, narmada: 42, godavari: 52 }
  ]

  const polymerData = [
    { name: 'Polyethylene (PE)', value: 35, color: '#0088FE' },
    { name: 'Polypropylene (PP)', value: 28, color: '#00C49F' },
    { name: 'PET', value: 20, color: '#FFBB28' },
    { name: 'Polystyrene (PS)', value: 12, color: '#FF8042' },
    { name: 'Others', value: 5, color: '#8884D8' }
  ]

  const sizeDistribution = [
    { size: '10-25μm', count: 245, percentage: 35 },
    { size: '25-50μm', count: 189, percentage: 27 },
    { size: '50-100μm', count: 156, percentage: 22 },
    { size: '100-250μm', count: 87, percentage: 12 },
    { size: '>250μm', count: 28, percentage: 4 }
  ]

  const correlationData = [
    { temperature: 20, particles: 35 },
    { temperature: 22, particles: 42 },
    { temperature: 25, particles: 58 },
    { temperature: 28, particles: 67 },
    { temperature: 30, particles: 72 },
    { temperature: 32, particles: 85 },
    { temperature: 35, particles: 92 }
  ]

  const locations = [
    { id: 'ganga-kanpur', name: 'Ganga - Kanpur', samples: 156, avgParticles: 58, trend: 'up' },
    { id: 'yamuna-delhi', name: 'Yamuna - Delhi', samples: 143, avgParticles: 44, trend: 'down' },
    { id: 'narmada-bhopal', name: 'Narmada - Bhopal', samples: 98, avgParticles: 35, trend: 'up' },
    { id: 'godavari-nashik', name: 'Godavari - Nashik', samples: 87, avgParticles: 45, trend: 'stable' }
  ]

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Research Analytics Dashboard</h1>
          <p className="text-muted-foreground">Advanced analysis and insights on microplastics data</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="ganga">Ganga River</SelectItem>
              <SelectItem value="yamuna">Yamuna River</SelectItem>
              <SelectItem value="narmada">Narmada River</SelectItem>
              <SelectItem value="godavari">Godavari River</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Samples</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl">1,284</p>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Particles/L</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl">46.2</p>
                  <Badge variant="destructive" className="text-xs">↑12%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Stations</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl">24</p>
                  <Badge variant="secondary" className="text-xs">Online</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Risk Areas</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl">7</p>
                  <Badge variant="destructive" className="text-xs">Critical</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="composition">Composition</TabsTrigger>
          <TabsTrigger value="size">Size Analysis</TabsTrigger>
          <TabsTrigger value="correlation">Correlations</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temporal Trends Across River Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ganga" stroke="#0088FE" strokeWidth={2} name="Ganga" />
                    <Line type="monotone" dataKey="yamuna" stroke="#00C49F" strokeWidth={2} name="Yamuna" />
                    <Line type="monotone" dataKey="narmada" stroke="#FFBB28" strokeWidth={2} name="Narmada" />
                    <Line type="monotone" dataKey="godavari" stroke="#FF8042" strokeWidth={2} name="Godavari" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="composition" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Polymer Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={polymerData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {polymerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Polymer Trends by Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { location: 'Ganga', PE: 40, PP: 25, PET: 20, PS: 15 },
                      { location: 'Yamuna', PE: 35, PP: 30, PET: 22, PS: 13 },
                      { location: 'Narmada', PE: 32, PP: 28, PET: 25, PS: 15 },
                      { location: 'Godavari', PE: 38, PP: 26, PET: 21, PS: 15 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="PE" stackId="a" fill="#0088FE" />
                      <Bar dataKey="PP" stackId="a" fill="#00C49F" />
                      <Bar dataKey="PET" stackId="a" fill="#FFBB28" />
                      <Bar dataKey="PS" stackId="a" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="size" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Particle Size Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sizeDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.size}</span>
                        <span>{item.count} particles ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Size vs Count Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sizeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="size" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temperature vs Particle Count Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="temperature" name="Temperature" unit="°C" />
                    <YAxis dataKey="particles" name="Particles" unit="/L" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="particles" fill="hsl(var(--primary))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid gap-4">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3>{location.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {location.samples} samples collected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg">{location.avgParticles} particles/L</p>
                        <p className="text-sm text-muted-foreground">Average</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {location.trend === 'up' && <TrendingUp className="w-5 h-5 text-red-500" />}
                        {location.trend === 'down' && <TrendingDown className="w-5 h-5 text-green-500" />}
                        {location.trend === 'stable' && <div className="w-5 h-5 bg-gray-400 rounded-full" />}
                        <Badge variant={location.trend === 'up' ? 'destructive' : location.trend === 'down' ? 'default' : 'secondary'}>
                          {location.trend}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}