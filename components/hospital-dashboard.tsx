"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  CheckCircle,
  ClipboardList,
  FileText,
  LogOut,
  Plus,
  Search,
  Stethoscope,
  User,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import DeathRegistrationForm from "./death-registration-form"

// Sample data
const recentDeaths = [
  {
    id: "D-2023-001",
    name: "Arben Krasniqi",
    personalId: "1234567890",
    dateOfDeath: "2023-05-15",
    cause: "Natural causes",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality"],
  },
  {
    id: "D-2023-002",
    name: "Fatmire Berisha",
    personalId: "0987654321",
    dateOfDeath: "2023-05-10",
    cause: "Heart failure",
    status: "Pending",
    confirmedBy: ["Hospital"],
  },
  {
    id: "D-2023-003",
    name: "Burim Gashi",
    personalId: "5678901234",
    dateOfDeath: "2023-05-08",
    cause: "Respiratory failure",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality", "Religious"],
  },
  {
    id: "D-2023-004",
    name: "Vjosa Hoxha",
    personalId: "3456789012",
    dateOfDeath: "2023-05-05",
    cause: "Cancer",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Religious"],
  },
  {
    id: "D-2023-005",
    name: "Driton Shala",
    personalId: "9012345678",
    dateOfDeath: "2023-05-01",
    cause: "Stroke",
    status: "Pending",
    confirmedBy: ["Hospital"],
  },
]

export default function HospitalDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  const filteredDeaths = recentDeaths.filter(
    (death) =>
      death.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      death.personalId.includes(searchTerm) ||
      death.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Hospital Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Dr. Arian Krasniqi</span>
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
        {showRegistrationForm ? (
          <div>
            <Button variant="outline" onClick={() => setShowRegistrationForm(false)} className="mb-6">
              Back to Dashboard
            </Button>
            <DeathRegistrationForm onComplete={() => setShowRegistrationForm(false)} />
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hospital Death Registration</h2>
                <p className="text-gray-600">Pristina Regional Hospital</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or ID..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={() => setShowRegistrationForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Register Death
                </Button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Registrations</CardTitle>
                  <CardDescription>This month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    All confirmed
                  </span>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending Confirmations</CardTitle>
                  <CardDescription>Awaiting other entities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7</div>
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

            {/* Recent Registrations */}
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="recent">Recent Registrations</TabsTrigger>
                <TabsTrigger value="pending">Pending Confirmations</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="recent">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <ClipboardList className="h-5 w-5 mr-2" />
                      Recent Death Registrations
                    </CardTitle>
                    <CardDescription>Showing the most recent death registrations from your hospital</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Personal ID</TableHead>
                          <TableHead>Date of Death</TableHead>
                          <TableHead>Cause</TableHead>
                          <TableHead>Status</TableHead>
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
                              <TableCell>{death.cause}</TableCell>
                              <TableCell>
                                <Badge variant={death.status === "Confirmed" ? "success" : "outline"}>
                                  {death.status}
                                </Badge>
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
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                              No records found matching your search.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Pending Confirmations
                    </CardTitle>
                    <CardDescription>Death registrations awaiting confirmation from other entities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Date of Death</TableHead>
                          <TableHead>Confirmed By</TableHead>
                          <TableHead>Pending</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeaths
                          .filter((death) => death.status === "Pending")
                          .map((death) => (
                            <TableRow key={death.id}>
                              <TableCell className="font-medium">{death.id}</TableCell>
                              <TableCell>{death.name}</TableCell>
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
                                <div className="flex flex-wrap gap-1">
                                  {!death.confirmedBy.includes("Municipality") && (
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                      Municipality
                                    </Badge>
                                  )}
                                  {!death.confirmedBy.includes("Religious") && (
                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                      Religious
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View details</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Reports</CardTitle>
                    <CardDescription>Generate and view statistical reports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Death by Age Group</CardTitle>
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
                          <CardTitle className="text-sm">Death by Cause</CardTitle>
                        </CardHeader>
                        <CardContent className="h-48 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                            Chart visualization would appear here
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline">Generate Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}
