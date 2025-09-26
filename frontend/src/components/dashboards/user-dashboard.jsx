import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, FileText, BarChart2, AlertCircle } from 'lucide-react';

export function UserDashboard({ user }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}</h1>
          <p className="text-muted-foreground">
            Analyze water samples and track microplastics detection
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Sample
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Samples Tested</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
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
            <div className="text-2xl font-bold">12 min ago</div>
            <p className="text-xs text-muted-foreground">Last sample analyzed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Samples</CardTitle>
            <CardDescription>Your most recent water samples analyzed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Sample #{1000 + i}</p>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? 'High microplastics detected' : 'Normal levels'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {i === 1 ? '⚠️ 12.4 ppm' : '2.' + i + ' ppm'}
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Sample
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View All Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                Report an Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
