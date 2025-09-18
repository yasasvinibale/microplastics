import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, FileText } from 'lucide-react';

export function Reports() {
  const sampleReports = [
    { id: 'RPT-2025-001', title: 'Monthly Summary - August', date: '2025-08-31', size: '1.2 MB' },
    { id: 'RPT-2025-002', title: 'High-Risk Areas Overview', date: '2025-09-10', size: '850 KB' },
    { id: 'RPT-2025-003', title: 'Device Health Audit', date: '2025-09-12', size: '620 KB' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and download analysis reports.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleReports.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-muted-foreground">{r.id} · {new Date(r.date).toLocaleDateString()} · {r.size}</div>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
