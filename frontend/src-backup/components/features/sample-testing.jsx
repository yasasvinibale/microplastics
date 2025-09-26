import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Upload, 
  Camera, 
  AlertCircle,
  Download,
  BarChart2,
  MapPin,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

export function SampleTesting({ user }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  // Mock function to simulate file processing
  const processFile = (file) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Add mock result
      const newResult = {
        id: `result-${Date.now()}`,
        image: URL.createObjectURL(file),
        timestamp: new Date().toISOString(),
        location: 'New Delhi, India',
        concentration: 12.5,
        confidence: 87.3,
        status: 'completed',
        particles: [
          { type: 'Polyethylene', count: 45, size: '0.5-1mm' },
          { type: 'Polypropylene', count: 32, size: '0.1-0.5mm' },
          { type: 'Polystyrene', count: 18, size: '1-5mm' },
        ]
      };
      
      setResults(prev => [newResult, ...prev]);
      setIsProcessing(false);
    }, 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      processFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const captureImage = () => {
    // This would use the device camera in a real app
    alert('Camera functionality would be implemented here');
  };

  const downloadReport = (result) => {
    // Mock download functionality
    const element = document.createElement('a');
    const file = new Blob([`Microplastics Detection Report\n\n` +
      `Date: ${new Date(result.timestamp).toLocaleDateString()}\n` +
      `Time: ${new Date(result.timestamp).toLocaleTimeString()}\n` +
      `Location: ${result.location}\n` +
      `Concentration: ${result.concentration} ppm\n` +
      `Confidence: ${result.confidence}%\n\n` +
      `Particle Analysis:\n` +
      result.particles.map(p => `- ${p.type}: ${p.count} particles (${p.size})`).join('\n')
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `microplastics-report-${result.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sample Testing</h1>
          <p className="text-muted-foreground">
            Upload or capture images to detect microplastics in water samples
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </TabsTrigger>
          <TabsTrigger value="camera" disabled>
            <Camera className="h-4 w-4 mr-2" />
            Capture Live
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-border hover:border-primary/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {isDragging ? 'Drop the file here' : 'Drag and drop your sample image here'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files (JPG, PNG, or TIFF)
                    </p>
                  </div>
                </div>
                <Input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  disabled={isProcessing}
                />
              </div>

              {isProcessing && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing sample...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Analyzing microplastics in the sample. This may take a moment...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="camera" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Capture Live Sample</CardTitle>
              <CardDescription>
                Use your device camera to capture a water sample in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg">
              <div className="w-full h-64 bg-black/10 rounded-lg flex items-center justify-center mb-4">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
              <Button onClick={captureImage} disabled>
                <Camera className="h-4 w-4 mr-2" />
                Capture Image
              </Button>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Camera access is required for live capture. Please ensure your device has a camera.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-4 border-r">
                      <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
                        <img 
                          src={result.image} 
                          alt="Sample analysis" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">Analysis Result</h3>
                            <Badge 
                              variant={result.concentration > 10 ? 'destructive' : 'default'}
                              className="flex items-center"
                            >
                              {result.concentration > 10 ? 'High' : 'Normal'} Concentration
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                Date
                              </p>
                              <p>{new Date(result.timestamp).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                Time
                              </p>
                              <p>{new Date(result.timestamp).toLocaleTimeString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                Location
                              </p>
                              <p>{result.location}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center">
                                <BarChart2 className="h-4 w-4 mr-2" />
                                Concentration
                              </p>
                              <p>{result.concentration} ppm</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                Analyzed By
                              </p>
                              <p>{user?.name || 'System'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Confidence</p>
                              <p>{result.confidence}%</p>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadReport(result)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Particle Analysis</h4>
                        <div className="space-y-2">
                          {result.particles.map((particle, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{particle.type}</p>
                                <p className="text-sm text-muted-foreground">{particle.size}</p>
                              </div>
                              <div className="w-24">
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${(particle.count / 100) * 100}%` }}
                                  />
                                </div>
                                <p className="text-sm text-right mt-1">{particle.count} particles</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
