import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  AreaChart,
  Area
} from 'recharts'
import { 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingDown,
  AlertTriangle
} from 'lucide-react'

// Mock data for charts
const monthlyData = [
  { month: 'Jan', samples: 120, avgConcentration: 1.2, highRisk: 15 },
  { month: 'Feb', samples: 135, avgConcentration: 1.4, highRisk: 18 },
  { month: 'Mar', samples: 148, avgConcentration: 1.6, highRisk: 22 },
  { month: 'Apr', samples: 162, avgConcentration: 1.8, highRisk: 28 },
  { month: 'May', samples: 171, avgConcentration: 1.5, highRisk: 24 },
  { month: 'Jun', samples: 189, avgConcentration: 1.7, highRisk: 31 },
]

const locationData = [
  { location: 'Thames River', concentration: 2.1, particles: 45, riskLevel: 'High' },
  { location: 'Lake Geneva', concentration: 1.3, particles: 28, riskLevel: 'Moderate' },
  { location: 'Baltic Sea', concentration: 0.8, particles: 15, riskLevel: 'Low' },
  { location: 'Mediterranean', concentration: 2.4, particles: 52, riskLevel: 'High' },
  { location: 'North Sea', concentration: 1.6, particles: 34, riskLevel: 'Moderate' },
  { location: 'Black Sea', concentration: 1.9, particles: 41, riskLevel: 'High' },
]

const plasticTrendData = [
  { week: 'W1', PET: 35, PE: 28, PP: 20, PS: 12, PVC: 5 },
  { week: 'W2', PET: 32, PE: 30, PP: 22, PS: 11, PVC: 5 },
  { week: 'W3', PET: 38, PE: 25, PP: 19, PS: 13, PVC: 5 },
  { week: 'W4', PET: 34, PE: 29, PP: 21, PS: 12, PVC: 4 },
]

const sizeDistribution = [
  { size: '1-10μm', count: 45, percentage: 35 },
  { size: '10-50μm', count: 38, percentage: 30 },
  { size: '50-100μm', count: 25, percentage: 20 },
  { size: '100-500μm', count: 15, percentage: 12 },
  { size: '>500μm', count: 4, percentage: 3 },
]

export function ResultsAnalytics() {
  const [timeRange, setTimeRange] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('concentration')

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Results & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis and trends of microplastic detection data
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Detections</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,247</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.3%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg Concentration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.64 μg/L</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-3 w-3 text-red-500" />
              <span className="text-red-500">+8.7%</span>
              <span className="text-muted-foreground">concerning trend</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>High Risk Areas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-3 w-3 text-green-500" />
              <span className="text-green-500">-3.2%</span>
              <span className="text-muted-foreground">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Detection Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.4%</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+1.8%</span>
              <span className="text-muted-foreground">model improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="locations">Geographic Data</TabsTrigger>
          <TabsTrigger value="composition">Plastic Composition</TabsTrigger>
          <TabsTrigger value="distribution">Size Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Detection Trends</CardTitle>
                <CardDescription>
                  Sample count and average concentration over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="avgConcentration" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      name="Avg Concentration (μg/L)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High Risk Incidents</CardTitle>
                <CardDescription>
                  Monthly count of samples exceeding safe thresholds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="highRisk" fill="#ef4444" name="High Risk Samples" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Risk Assessment</CardTitle>
                <CardDescription>
                  Contamination levels by geographic location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locationData.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{location.location}</div>
                        <div className="text-muted-foreground">
                          {location.concentration} μg/L • {location.particles} particles/L
                        </div>
                      </div>
                      <Badge 
                        variant={
                          location.riskLevel === 'High' ? 'destructive' : 
                          location.riskLevel === 'Moderate' ? 'default' : 
                          'secondary'
                        }
                      >
                        {location.riskLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Concentration vs Particle Count</CardTitle>
                <CardDescription>
                  Correlation between detection metrics by location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="concentration" name="Concentration" unit="μg/L" />
                    <YAxis dataKey="particles" name="Particles" unit="/L" />
                    <Tooltip 
                      formatter={(value, name) => [value, name === 'concentration' ? 'μg/L' : 'particles/L']}
                      labelFormatter={(label) => `Location: ${locationData[label]?.location || ''}`}
                    />
                    <Scatter dataKey="concentration" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="composition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plastic Type Trends</CardTitle>
              <CardDescription>
                Weekly trends of different plastic polymer types detected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={plasticTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="PET" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="PE" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="PP" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="PS" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="PVC" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Particle Size Distribution</CardTitle>
                <CardDescription>
                  Distribution of detected microplastic sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sizeDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="size" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="Particle Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Size Category Breakdown</CardTitle>
                <CardDescription>
                  Percentage distribution by particle size ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sizeDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{item.size}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-muted-foreground">
                        {item.count} particles detected
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}