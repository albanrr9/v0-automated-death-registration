"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Database, FileText, LogOut, Search, User, FileCheck, Camera } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data
const confirmedDeaths = [
  {
    id: "D-2023-001",
    name: "Arben Krasniqi",
    personalId: "1234567890",
    dateOfDeath: "2023-05-15",
    cause: "Natural causes",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality"],
    certificateIssued: true,
    pensionStopped: true,
  },
  {
    id: "D-2023-003",
    name: "Burim Gashi",
    personalId: "5678901234",
    dateOfDeath: "2023-05-08",
    cause: "Respiratory failure",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality", "Religious"],
    certificateIssued: true,
    pensionStopped: true,
  },
  {
    id: "D-2023-004",
    name: "Vjosa Hoxha",
    personalId: "3456789012",
    dateOfDeath: "2023-05-05",
    cause: "Cancer",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Religious"],
    certificateIssued: true,
    pensionStopped: true,
  },
  {
    id: "D-2023-008",
    name: "Agim Kelmendi",
    personalId: "2345678901",
    dateOfDeath: "2023-04-22",
    cause: "Heart attack",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality"],
    certificateIssued: false,
    pensionStopped: false,
  },
]

const pendingVerifications = [
  {
    id: "P-2023-001",
    name: "Shpresa Ahmeti",
    personalId: "7890123456",
    dateOfBirth: "1945-03-12",
    lastVerification: "2022-11-15",
    status: "Due for verification",
    pensionAmount: "€180/month",
  },
  {
    id: "P-2023-002",
    name: "Fadil Berisha",
    personalId: "8901234567",
    dateOfBirth: "1942-07-22",
    lastVerification: "2022-10-05",
    status: "Due for verification",
    pensionAmount: "€210/month",
  },
  {
    id: "P-2023-003",
    name: "Drita Krasniqi",
    personalId: "9012345678",
    dateOfBirth: "1950-01-30",
    lastVerification: "2022-12-10",
    status: "Due for verification",
    pensionAmount: "€165/month",
  },
]

export default function CivilRegistryDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFaceVerification, setShowFaceVerification] = useState(false)

  const filteredDeaths = confirmedDeaths.filter(
    (death) =>
      death.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      death.personalId.includes(searchTerm) ||
      death.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPensioners = pendingVerifications.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.personalId.includes(searchTerm) ||
      person.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleIssueCertificate = (id: string) => {
    alert(`Death certificate issued for ID: ${id}`)
  }

  const handleStopPension = (id: string) => {
    alert(`Pension payments stopped for ID: ${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-gray-600" />
            <h1 className="text-xl font-bold text-gray-900">Civil Registry Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Valbona Krasniqi</span>
            </div>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Civil Registry Administration</h2>
            <p className="text-gray-600">Ministry of Internal Affairs</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name or ID..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Death Certificates</CardTitle>
              <CardDescription>Issued this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">38</div>
            </CardContent>
            <CardFooter className="pt-0">
              <span className="text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                All processed
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Actions</CardTitle>
              <CardDescription>Certificates & pensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
            </CardContent>
            <CardFooter className="pt-0">
              <span className="text-sm text-amber-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Requires attention
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pension Verifications</CardTitle>
              <CardDescription>Due this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">27</div>
            </CardContent>
            <CardFooter className="pt-0">
              <span className="text-sm text-amber-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />3 completed
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Blockchain Status</CardTitle>
              <CardDescription>System health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Operational
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <span className="text-sm text-gray-500">Last sync: 5 minutes ago</span>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="deaths" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="deaths">Death Registrations</TabsTrigger>
            <TabsTrigger value="pensions">Pension Verifications</TabsTrigger>
            <TabsTrigger value="ai">AI Verification System</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="deaths">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" />
                  Death Registrations
                </CardTitle>
                <CardDescription>Manage death certificates and pension terminations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Personal ID</TableHead>
                      <TableHead>Date of Death</TableHead>
                      <TableHead>Confirmed By</TableHead>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Pension</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeaths.length > 0 ? (
                      filteredDeaths.map((death) => (
                        <TableRow key={death.id}>
                          <TableCell className="font-medium">{death.id}</TableCell>
                          <TableCell>{death.name}</TableCell>
                          <TableCell>{death.personalId}</TableCell>
                          <TableCell>{death.dateOfDeath}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {death.confirmedBy.map((entity) => (
                                <Badge
                                  key={entity}
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  {entity}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {death.certificateIssued ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Issued
                              </Badge>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-amber-600 border-amber-200 hover:bg-amber-50"
                                onClick={() => handleIssueCertificate(death.id)}
                              >
                                Issue
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            {death.pensionStopped ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Stopped
                              </Badge>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleStopPension(death.id)}
                              >
                                Stop
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                          No death registrations matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pensions">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Pension Verifications
                </CardTitle>
                <CardDescription>Pensioners due for verification of life status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Personal ID</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Last Verification</TableHead>
                      <TableHead>Pension Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPensioners.length > 0 ? (
                      filteredPensioners.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell className="font-medium">{person.id}</TableCell>
                          <TableCell>{person.name}</TableCell>
                          <TableCell>{person.personalId}</TableCell>
                          <TableCell>{person.dateOfBirth}</TableCell>
                          <TableCell>{person.lastVerification}</TableCell>
                          <TableCell>{person.pensionAmount}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                  >
                                    <Camera className="h-4 w-4 mr-1" />
                                    Verify
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Facial Recognition Verification</DialogTitle>
                                    <DialogDescription>
                                      Use AI facial recognition to verify the pensioner is alive
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                      <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                      <p className="text-sm text-gray-500 mb-4">
                                        Camera feed would appear here for facial verification
                                      </p>
                                      <Button>Start Verification</Button>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      <p>The AI system will:</p>
                                      <ul className="list-disc pl-5 space-y-1 mt-2">
                                        <li>Verify the person's identity against records</li>
                                        <li>Confirm they are alive (not a photo)</li>
                                        <li>Securely record the verification on blockchain</li>
                                      </ul>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                          No pension verifications matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Verification System</CardTitle>
                <CardDescription>
                  Manage the AI-powered facial recognition system for pension verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Facial Recognition API</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Online
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Blockchain Integration</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Connected
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">eKosova Platform</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Integrated
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Last System Check</span>
                          <span className="text-sm text-gray-500">Today, 09:45 AM</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Verification Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Verifications (This Month)</span>
                          <span className="font-bold">124</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Successful Verifications</span>
                          <span className="font-bold text-green-600">118</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Failed Verifications</span>
                          <span className="font-bold text-red-600">6</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Success Rate</span>
                          <span className="font-bold">95.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Remote Verification Portal</CardTitle>
                    <CardDescription>
                      Allow pensioners to verify themselves remotely using the eKosova platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-bold mb-2">eKosova Integration Status</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="border rounded-md p-4 text-center">
                          <p className="text-2xl font-bold text-blue-600">1,245</p>
                          <p className="text-sm text-gray-500">Registered Pensioners</p>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <p className="text-2xl font-bold text-green-600">876</p>
                          <p className="text-sm text-gray-500">Remote Verifications</p>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <p className="text-2xl font-bold text-purple-600">70.4%</p>
                          <p className="text-sm text-gray-500">Adoption Rate</p>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">View Portal</Button>
                        <Button>Generate Report</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Reports</CardTitle>
                <CardDescription>Generate and view statistical reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Death Registration Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        Chart visualization would appear here
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Pension Verification Compliance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        Chart visualization would appear here
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Export Data</Button>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
