import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users, 
  Cpu, 
  Database, 
  Shield, 
  Activity,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Server,
  HardDrive,
  Wifi,
  WifiOff
} from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Mock data
  const systemStats = {
    totalUsers: 156,
    activeDevices: 24,
    totalSamples: 15420,
    systemUptime: 99.7,
    storageUsed: 65.2,
    monthlyGrowth: 12.5
  };

  const users = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@sih.gov.in',
      role: 'monitor',
      status: 'active',
      lastLogin: '2 hours ago',
      location: 'Kanpur Research Station'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@sih.gov.in',
      role: 'researcher',
      status: 'active',
      lastLogin: '5 minutes ago',
      location: 'TERI, New Delhi'
    },
    {
      id: 3,
      name: 'Dr. Meera Nair',
      email: 'meera.nair@sih.gov.in',
      role: 'admin',
      status: 'active',
      lastLogin: '1 hour ago',
      location: 'Ministry HQ, New Delhi'
    },
    {
      id: 4,
      name: 'Dr. Ankit Verma',
      email: 'ankit.verma@sih.gov.in',
      role: 'monitor',
      status: 'inactive',
      lastLogin: '3 days ago',
      location: 'Bhopal Research Station'
    }
  ];

  const devices = [
    {
      id: 'MP-001',
      name: 'Ganga Monitor Kanpur',
      location: 'Kanpur, UP',
      status: 'online',
      lastSync: '2 minutes ago',
      batteryLevel: 87,
      signalStrength: 'Strong'
    },
    {
      id: 'MP-002',
      name: 'Yamuna Monitor Delhi',
      location: 'Delhi',
      status: 'online',
      lastSync: '5 minutes ago',
      batteryLevel: 92,
      signalStrength: 'Strong'
    },
    {
      id: 'MP-003',
      name: 'Narmada Monitor Bhopal',
      location: 'Bhopal, MP',
      status: 'offline',
      lastSync: '2 hours ago',
      batteryLevel: 23,
      signalStrength: 'Weak'
    },
    {
      id: 'MP-004',
      name: 'Godavari Monitor Nashik',
      location: 'Nashik, MH',
      status: 'maintenance',
      lastSync: '1 day ago',
      batteryLevel: 0,
      signalStrength: 'None'
    }
  ];

  const systemUsageData = [
    { date: '2024-01-01', users: 120, samples: 450, storage: 55 },
    { date: '2024-01-02', users: 125, samples: 520, storage: 58 },
    { date: '2024-01-03', users: 132, samples: 480, storage: 60 },
    { date: '2024-01-04', users: 140, samples: 650, storage: 62 },
    { date: '2024-01-05', users: 148, samples: 720, storage: 64 },
    { date: '2024-01-06', users: 152, samples: 680, storage: 65 },
    { date: '2024-01-07', users: 156, samples: 750, storage: 65.2 }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'researcher': return 'bg-green-500';
      case 'monitor': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'online': return 'text-green-500';
      case 'inactive':
      case 'offline': return 'text-red-500';
      case 'maintenance': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>System Administration</h1>
          <p className="text-muted-foreground">Manage users, devices, and system configuration</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-xl">{systemStats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Cpu className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Devices</p>
                <p className="text-xl">{systemStats.activeDevices}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Samples</p>
                <p className="text-xl">{systemStats.totalSamples.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-xl">{systemStats.systemUptime}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="devices">Device Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={systemUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="samples"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Storage</span>
                    <span>{systemStats.storageUsed}% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${systemStats.storageUsed}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-muted-foreground">Total Space</div>
                    <div>500 GB</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-muted-foreground">Available</div>
                    <div>174 GB</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Security Status</p>
                    <p>All systems secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Server className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">API Requests</p>
                    <p>2.4M this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Backup Status</p>
                    <p>Last: 2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3>User Management</h3>
              <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
            </div>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monitor">Field Monitor</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddUserOpen(false)}>
                      Create User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getRoleColor(user.role)}`} />
                          <div>
                            <div>{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center space-x-1 ${getStatusColor(user.status)}`}>
                          {user.status === 'active' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="text-sm">{user.location}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3>Device Management</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage detection devices</p>
            </div>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Register Device
            </Button>
          </div>

          <div className="grid gap-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Cpu className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4>{device.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {device.id}</p>
                        <p className="text-sm text-muted-foreground">{device.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className={`flex items-center space-x-1 ${getStatusColor(device.status)}`}>
                          {device.status === 'online' ? (
                            <Wifi className="w-4 h-4" />
                          ) : (
                            <WifiOff className="w-4 h-4" />
                          )}
                          <span className="capitalize">{device.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last sync: {device.lastSync}</p>
                      </div>
                      <div className="text-center">
                        <p>Battery: {device.batteryLevel}%</p>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              device.batteryLevel > 50 ? 'bg-green-500' :
                              device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${device.batteryLevel}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm">Signal</p>
                        <Badge variant={device.signalStrength === 'Strong' ? 'default' : 
                                      device.signalStrength === 'Weak' ? 'secondary' : 'outline'}>
                          {device.signalStrength}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="w-5 h-5" />
                  <span>Server Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm">34%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '34%' }} />
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Database Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Connection Pool</span>
                    <Badge variant="default">Healthy</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Query Performance</span>
                    <span className="text-sm">12ms avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="text-sm">45/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge variant="default">Valid</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Firewall</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Last Security Scan</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={systemUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#0088FE" 
                      strokeWidth={2}
                      name="Active Users"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="samples" 
                      stroke="#00C49F" 
                      strokeWidth={2}
                      name="Daily Samples"
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
