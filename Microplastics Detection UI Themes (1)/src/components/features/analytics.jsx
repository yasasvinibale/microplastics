import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  LineChart, 
  PieChart, 
  Download, 
  Filter, 
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Badge } from '../ui/badge';

// Mock data for charts
const detectionData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 56 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 40 },
  { name: 'Aug', value: 52 },
  { name: 'Sep', value: 67 },
  { name: 'Oct', value: 72 },
  { name: 'Nov', value: 68 },
  { name: 'Dec', value: 75 },
];

const plasticTypes = [
  { name: 'Polyethylene', value: 45, color: '#3b82f6' },
  { name: 'Polypropylene', value: 25, color: '#8b5cf6' },
  { name: 'Polystyrene', value: 15, color: '#ec4899' },
  { name: 'Other', value: 15, color: '#10b981' },
];

const locations = [
  { name: 'River Ganga', value: 40, color: '#3b82f6' },
  { name: 'Yamuna River', value: 30, color: '#8b5cf6' },
  { name: 'Coastal Areas', value: 20, color: '#ec4899' },
  { name: 'Other', value: 10, color: '#10b981' },
];

const recentDetections = [
  {
    id: 1,
    location: 'New Delhi, Yamuna River',
    date: '2023-06-15T14:30:00Z',
    concentration: 12.5,
    status: 'high',
    type: 'Polyethylene',
  },
  {
    id: 2,
    location: 'Varanasi, Ganga Ghat',
    date: '2023-06-14T10:15:00Z',
    concentration: 8.2,
    status: 'medium',
    type: 'Polypropylene',
  },
  {
    id: 3,
    location: 'Mumbai Coast',
    date: '2023-06-13T16:45:00Z',
    concentration: 15.7,
    status: 'high',
    type: 'Polystyrene',
  },
  {
    id: 4,
    location: 'Chennai Beach',
    date: '2023-06-12T09:20:00Z',
    concentration: 5.1,
    status: 'low',
    type: 'Other',
  },
];

export function Analytics({ user }) {
  const [timeRange, setTimeRange] = useState('6m');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const filteredData = detectionData.slice(-parseInt(timeRange === 'all' ? '12' : timeRange));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize and analyze microplastics detection data
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Samples</CardDescription>
            <CardTitle className="text-3xl">1,247</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+12% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Concentration</CardDescription>
            <CardTitle className="text-3xl">8.2 ppm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              <span className="text-red-500">+2.1%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High Risk Areas</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+2 in the last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+4 from last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Detection Trends</CardTitle>
                <CardDescription>Monthly microplastics detection rate</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">Last 3 months</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
              <LineChart className="h-12 w-12 text-muted-foreground" />
              <div className="ml-4">
                <h3 className="font-medium">Detection Trend Chart</h3>
                <p className="text-sm text-muted-foreground">
                  Line chart showing detection trends over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plastic Type Distribution</CardTitle>
            <CardDescription>Breakdown of detected microplastic types</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
              <PieChart className="h-12 w-12 text-muted-foreground" />
              <div className="ml-4">
                <h3 className="font-medium">Plastic Type Distribution</h3>
                <p className="text-sm text-muted-foreground">
                  Pie chart showing distribution of plastic types
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Location Analysis</CardTitle>
            <CardDescription>Microplastics concentration by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: location.color }}
                      />
                      <span>{location.name}</span>
                    </div>
                    <span className="font-medium">{location.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${location.value}%`,
                        backgroundColor: location.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Detections</CardTitle>
                <CardDescription>Latest microplastics detections</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDetections.map((detection) => (
                <div key={detection.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {detection.status === 'high' ? (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    ) : detection.status === 'medium' ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{detection.location}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(detection.date).toLocaleString()}
                      <span className="mx-2">•</span>
                      <span>{detection.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={detection.status === 'high' ? 'destructive' : 
                              detection.status === 'medium' ? 'warning' : 'default'}
                      className="text-xs"
                    >
                      {detection.concentration} ppm
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
