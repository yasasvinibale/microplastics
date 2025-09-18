import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  AlertTriangle, 
  Bell, 
  Mail, 
  Smartphone, 
  Clock, 
  MapPin,
  Settings,
  Check,
  X
} from 'lucide-react';

const activeAlerts = [
  {
    id: 1,
    title: 'High Concentration Detected',
    location: 'Thames River, London',
    level: 'Critical',
    concentration: 3.2,
    threshold: 2.0,
    time: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    title: 'Unusual Plastic Type Pattern',
    location: 'Mediterranean Sea, Spain',
    level: 'Warning',
    concentration: 1.8,
    threshold: 1.5,
    time: '4 hours ago',
    status: 'investigating'
  },
  {
    id: 3,
    title: 'Particle Count Spike',
    location: 'Baltic Sea, Finland',
    level: 'Critical',
    concentration: 2.7,
    threshold: 2.0,
    time: '6 hours ago',
    status: 'acknowledged'
  }
];

const alertRules = [
  {
    id: 1,
    name: 'High Concentration Alert',
    type: 'Concentration Threshold',
    threshold: '2.0 μg/L',
    enabled: true,
    notifications: ['email', 'sms']
  },
  {
    id: 2,
    name: 'Particle Count Alert',
    type: 'Particle Count',
    threshold: '50 particles/L',
    enabled: true,
    notifications: ['email', 'push']
  },
  {
    id: 3,
    name: 'Trend Analysis Alert',
    type: 'Trend Detection',
    threshold: '20% increase over 24h',
    enabled: false,
    notifications: ['email']
  },
  {
    id: 4,
    name: 'Equipment Malfunction',
    type: 'System Health',
    threshold: 'Detection accuracy < 90%',
    enabled: true,
    notifications: ['email', 'sms', 'push']
  }
];

export function Alerts() {
  const [alertSettings, setAlertSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '07:00'
  });

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId}: ${action}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Contamination Alerts</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and alert management for microplastic detection
          </p>
        </div>
        <Button className="gap-2">
          <Settings className="h-4 w-4" />
          Configure Alerts
        </Button>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Active Alerts ({activeAlerts.length})
          </CardTitle>
          <CardDescription>
            Current contamination alerts requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{alert.title}</h3>
                      <Badge 
                        variant={alert.level === 'Critical' ? 'destructive' : 'default'}
                      >
                        {alert.level}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={
                          alert.status === 'active' ? 'border-red-500 text-red-600' :
                          alert.status === 'investigating' ? 'border-yellow-500 text-yellow-600' :
                          'border-green-500 text-green-600'
                        }
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Current: </span>
                        <span className="font-medium text-red-600">{alert.concentration} μg/L</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Threshold: </span>
                        <span className="font-medium">{alert.threshold} μg/L</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Excess: </span>
                        <span className="font-medium text-red-600">
                          {(((alert.concentration - alert.threshold) / alert.threshold) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Acknowledge
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAlertAction(alert.id, 'investigate')}
                    >
                      Investigate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAlertAction(alert.id, 'dismiss')}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alert Rules
            </CardTitle>
            <CardDescription>
              Configure automatic detection thresholds and triggers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{rule.name}</span>
                      <Badge variant="outline">{rule.type}</Badge>
                    </div>
                    <div className="text-muted-foreground">{rule.threshold}</div>
                    <div className="flex gap-1 mt-1">
                      {rule.notifications.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Switch checked={rule.enabled} />
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Add New Rule
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how you receive alert notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={alertSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <Switch 
                  id="sms-notifications"
                  checked={alertSettings.smsNotifications}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, smsNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <Switch 
                  id="push-notifications"
                  checked={alertSettings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <Switch 
                  id="quiet-hours"
                  checked={alertSettings.quietHours}
                  onCheckedChange={(checked) => 
                    setAlertSettings(prev => ({ ...prev, quietHours: checked }))
                  }
                />
              </div>
              
              {alertSettings.quietHours && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <Input 
                      id="quiet-start"
                      type="time" 
                      value={alertSettings.quietStart}
                      onChange={(e) => 
                        setAlertSettings(prev => ({ ...prev, quietStart: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">End Time</Label>
                    <Input 
                      id="quiet-end"
                      type="time" 
                      value={alertSettings.quietEnd}
                      onChange={(e) => 
                        setAlertSettings(prev => ({ ...prev, quietEnd: e.target.value }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="escalation">Escalation Policy</Label>
              <Select defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate Notification</SelectItem>
                  <SelectItem value="5min">5 Minutes Delay</SelectItem>
                  <SelectItem value="15min">15 Minutes Delay</SelectItem>
                  <SelectItem value="hourly">Hourly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert-frequency">Alert Frequency</Label>
              <Select defaultValue="every">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="every">Every Occurrence</SelectItem>
                  <SelectItem value="first">First Occurrence Only</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
