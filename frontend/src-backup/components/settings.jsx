import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTheme } from './theme-provider';
import { 
  Palette, 
  Monitor, 
  Sun, 
  Moon, 
  Waves, 
  TreePine,
  Settings as SettingsIcon,
  User,
  Shield,
  Database,
  Bell,
  Sliders
} from 'lucide-react';

export function Settings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, preview: 'bg-white border-gray-200' },
    { id: 'dark', name: 'Dark', icon: Moon, preview: 'bg-gray-900 border-gray-700' },
    { id: 'ocean', name: 'Ocean', icon: Waves, preview: 'bg-blue-50 border-blue-200' },
    { id: 'forest', name: 'Forest', icon: TreePine, preview: 'bg-green-50 border-green-200' },
    { id: 'laboratory', name: 'Laboratory', icon: Monitor, preview: 'bg-purple-50 border-purple-200' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Settings & Themes</h1>
        <p className="text-muted-foreground">
          Customize your microplastics detection interface and system preferences
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="detection">Detection</TabsTrigger>
          <TabsTrigger value="data">Data & Export</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Selection
              </CardTitle>
              <CardDescription>
                Choose your preferred interface theme for the detection system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <div
                      key={themeOption.id}
                      className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                        theme === themeOption.id 
                          ? 'border-primary shadow-md' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTheme(themeOption.id)}
                    >
                      <div className={`w-full h-20 rounded-md mb-3 ${themeOption.preview} border-2`} />
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{themeOption.name}</span>
                        {theme === themeOption.id && (
                          <Badge variant="default" className="ml-auto">Active</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>
                Customize how data and information is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="iso">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iso">YYYY-MM-DD</SelectItem>
                      <SelectItem value="us">MM/DD/YYYY</SelectItem>
                      <SelectItem value="eu">DD/MM/YYYY</SelectItem>
                      <SelectItem value="relative">Relative (2 days ago)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select defaultValue="metric">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (μg/L, μm)</SelectItem>
                      <SelectItem value="imperial">Imperial (mg/gal, mil)</SelectItem>
                      <SelectItem value="scientific">Scientific Notation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Enable Animations</Label>
                  <p className="text-muted-foreground">Smooth transitions and chart animations</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-muted-foreground">Improved visibility for accessibility</p>
                </div>
                <Switch id="high-contrast" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Detection Parameters
              </CardTitle>
              <CardDescription>
                Configure default analysis settings and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-method">Default Detection Method</Label>
                  <Select defaultValue="ftir">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ftir">FTIR Spectroscopy</SelectItem>
                      <SelectItem value="raman">Raman Spectroscopy</SelectItem>
                      <SelectItem value="sem">SEM Analysis</SelectItem>
                      <SelectItem value="optical">Optical Microscopy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sensitivity">Default Sensitivity</Label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Fast)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Accurate)</SelectItem>
                      <SelectItem value="ultra">Ultra High (Research)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="warning-threshold">Warning Threshold (μg/L)</Label>
                <Input id="warning-threshold" type="number" defaultValue="1.5" step="0.1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="critical-threshold">Critical Threshold (μg/L)</Label>
                <Input id="critical-threshold" type="number" defaultValue="2.0" step="0.1" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-analysis">Auto-Analysis</Label>
                  <p className="text-muted-foreground">Automatically start analysis on sample upload</p>
                </div>
                <Switch id="auto-analysis" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="quality-control">Quality Control Checks</Label>
                  <p className="text-muted-foreground">Validate sample quality before analysis</p>
                </div>
                <Switch id="quality-control" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Configure data retention and export preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retention-period">Data Retention Period</Label>
                <Select defaultValue="2years">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-format">Default Export Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-muted-foreground">Daily backup of analysis data</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cloud-sync">Cloud Synchronization</Label>
                  <p className="text-muted-foreground">Sync data across multiple devices</p>
                </div>
                <Switch id="cloud-sync" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-medium">Storage Usage</h4>
                    <p className="text-muted-foreground">12.4 GB of 50 GB used</p>
                  </div>
                  <Button variant="outline">Manage Storage</Button>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '24.8%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analysis-complete">Analysis Complete</Label>
                    <p className="text-muted-foreground">When sample analysis finishes</p>
                  </div>
                  <Switch id="analysis-complete" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="threshold-exceeded">Threshold Exceeded</Label>
                    <p className="text-muted-foreground">When contamination levels are high</p>
                  </div>
                  <Switch id="threshold-exceeded" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <p className="text-muted-foreground">Equipment status and maintenance</p>
                  </div>
                  <Switch id="system-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-summary">Weekly Summary</Label>
                    <p className="text-muted-foreground">Weekly analysis summary report</p>
                  </div>
                  <Switch id="weekly-summary" />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input 
                  id="notification-email" 
                  type="email" 
                  defaultValue="analyst@microdetect.com"
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Notification Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="Dr. Sarah Chen" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Marine Research Institute" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="s.chen@marineresearch.org" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="analyst">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analyst">Research Analyst</SelectItem>
                    <SelectItem value="supervisor">Lab Supervisor</SelectItem>
                    <SelectItem value="admin">System Administrator</SelectItem>
                    <SelectItem value="viewer">Data Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch id="two-factor" />
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Save Changes</Button>
                <Button variant="outline">Change Password</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-muted-foreground">Share anonymized data for research</p>
                </div>
                <Switch id="data-sharing" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-muted-foreground">Help improve the platform</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Data Download</h4>
                <p className="text-muted-foreground">
                  Download a copy of all your data and analysis results
                </p>
                <Button variant="outline">Request Data Export</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
