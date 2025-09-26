import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { 
  Upload, 
  MapPin, 
  Calendar, 
  TestTube, 
  Microscope,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react'

export function SampleTesting() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [testResults, setTestResults] = useState<any>(null)

  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Simulate test results after upload
          setTimeout(() => {
            setTestResults({
              sampleId: 'SP-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
              particleCount: Math.floor(Math.random() * 50) + 10,
              concentration: (Math.random() * 3 + 0.5).toFixed(2),
              dominantType: ['PET', 'PE', 'PP', 'PS'][Math.floor(Math.random() * 4)],
              riskLevel: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)]
            })
          }, 2000)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Sensor Testing & Calibration</h1>
        <p className="text-muted-foreground">
          Configure optical sensor parameters and test detection capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sample Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Sensor Configuration
            </CardTitle>
            <CardDescription>
              Configure portable sensor and initiate water sample analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sample-id">Sample ID</Label>
              <Input 
                id="sample-id" 
                placeholder="e.g., SP-001"
                defaultValue="SP-007"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Deployment Location</Label>
              <Input 
                id="location" 
                placeholder="e.g., Ganga River, Varanasi"
                defaultValue="Yamuna River, Delhi"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sample-date">Collection Date</Label>
                <Input 
                  id="sample-date" 
                  type="date" 
                  defaultValue="2024-01-15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="water-type">Water Type</Label>
                <Select defaultValue="marine">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marine">Marine Water</SelectItem>
                    <SelectItem value="freshwater">Freshwater</SelectItem>
                    <SelectItem value="groundwater">Groundwater</SelectItem>
                    <SelectItem value="wastewater">Wastewater</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Sample conditions, weather, etc."
                defaultValue="Clear water sample collected during low tide conditions."
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {!isUploading && !testResults ? (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="font-medium">Initialize Sensor Analysis</p>
                    <p className="text-muted-foreground">
                      Start optical detection and ML processing
                    </p>
                  </div>
                  <Button onClick={handleFileUpload} className="gap-2">
                    <TestTube className="h-4 w-4" />
                    Start Sensor
                  </Button>
                </div>
              ) : isUploading ? (
                <div className="space-y-4">
                  <TestTube className="h-12 w-12 text-primary mx-auto animate-pulse" />
                  <div>
                    <p className="font-medium">Processing Sample...</p>
                    <Progress value={uploadProgress} className="w-full mt-2" />
                    <p className="text-muted-foreground mt-2">
                      {uploadProgress < 30 ? 'Initializing sensor...' :
                       uploadProgress < 70 ? 'Optical detection in progress...' :
                       'ML processing results...'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <div>
                    <p className="font-medium">Analysis Complete</p>
                    <p className="text-muted-foreground">
                      Results are ready for review
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detection Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Detection Parameters
            </CardTitle>
            <CardDescription>
              Configure analysis settings and sensitivity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="detection-method">Optical Detection Method</Label>
              <Select defaultValue="optical-ml">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="optical-ml">Optical + ML Pattern Recognition</SelectItem>
                  <SelectItem value="light-scattering">Light Scattering Analysis</SelectItem>
                  <SelectItem value="fluorescence">Fluorescence Detection</SelectItem>
                  <SelectItem value="absorbance">Absorbance Spectroscopy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size-range">Sensor Detection Range (μm)</Label>
              <Select defaultValue="10-100">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-100">10 - 100 μm (Target Range)</SelectItem>
                  <SelectItem value="50-200">50 - 200 μm (Extended Range)</SelectItem>
                  <SelectItem value="10-50">10 - 50 μm (Fine Particles)</SelectItem>
                  <SelectItem value="5-500">5 - 500 μm (Full Spectrum)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sensitivity">ML Model Sensitivity</Label>
              <Select defaultValue="high">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Fast Processing)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Accurate)</SelectItem>
                  <SelectItem value="research">Research Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Polymer Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Polyethylene', 'Polypropylene', 'PET', 'Polystyrene', 'PVC', 'Nylon'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <ImageWithFallback
              src="https://images.unsplash.com/photo-1603016129004-c7539f86b53f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHBvbGx1dGlvbiUyMG1pY3JvcGxhc3RpY3N8ZW58MXx8fHwxNzU3OTEzOTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Water sample analysis"
              className="w-full h-32 object-cover rounded-lg"
            />

            <Button className="w-full gap-2">
              <Microscope className="h-4 w-4" />
              Calibrate Sensor
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Test Results */}
      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Analysis Results - {testResults.sampleId}
            </CardTitle>
            <CardDescription>
              Microplastic detection results and contamination assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{testResults.particleCount}</div>
                <div className="text-muted-foreground">Particles/Liter</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{testResults.concentration}</div>
                <div className="text-muted-foreground">μg/L Concentration</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{testResults.dominantType}</div>
                <div className="text-muted-foreground">Dominant Type</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge 
                  variant={
                    testResults.riskLevel === 'High' ? 'destructive' : 
                    testResults.riskLevel === 'Moderate' ? 'default' : 
                    'secondary'
                  }
                  className="text-lg px-4 py-2"
                >
                  {testResults.riskLevel} Risk
                </Badge>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Download Report
              </Button>
              <Button variant="outline" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Set Alert Threshold
              </Button>
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Schedule Re-test
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
