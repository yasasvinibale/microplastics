import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { LineChart, BarChart, PieChart } from 'lucide-react';

export function AnalystDashboard({ user }) {
  // Mock data for charts
  const detectionData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 59 },
    { name: 'Mar', value: 80 },
    { name: 'Apr', value: 81 },
    { name: 'May', value: 56 },
    { name: 'Jun', value: 55 },
  ];

  const plasticTypes = [
    { name: 'Polyethylene', value: 45 },
    { name: 'Polypropylene', value: 25 },
    { name: 'Polystyrene', value: 15 },
    { name: 'Other', value: 15 },
  ];

  const locations = [
    { name: 'River Ganga', value: 40 },
    { name: 'Yamuna River', value: 30 },
    { name: 'Coastal Areas', value: 20 },
    { name: 'Other', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze trends and insights from microplastics detection data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <LineChart className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="gap-2">
            <BarChart className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Concentration</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2 ppm</div>
            <p className="text-xs text-muted-foreground">-0.5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Detection Trends</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly microplastics detection rate over the past 6 months
            </p>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center p-4 max-w-sm">
                <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium">Detection Trend Chart</h3>
                <p className="text-sm text-muted-foreground">
                  Line chart showing monthly detection rates will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Plastic Type Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Breakdown of detected microplastic types
            </p>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-medium">Plastic Types</h3>
              <p className="text-sm text-muted-foreground">
                Pie chart showing distribution will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
            <p className="text-sm text-muted-foreground">
              Locations with highest microplastics concentration
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{location.name}</span>
                    <span className="text-sm font-medium">{location.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${location.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <p className="text-sm text-muted-foreground">
              Recent high concentration detections
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((alert) => (
                <div key={alert} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {alert === 1 
                        ? 'High concentration detected in Ganga River' 
                        : alert === 2 
                        ? 'Unusual spike in microplastics near Mumbai coast'
                        : 'New source of contamination identified in Yamuna'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert} {alert === 1 ? 'day' : 'days'} ago · {['Critical', 'High', 'Medium'][alert - 1]} priority
                    </p>
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
