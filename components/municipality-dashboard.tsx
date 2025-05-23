"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Building2, CheckCircle, ClipboardList, FileText, LogOut, Search, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const pendingConfirmations = [
  {
    id: "D-2023-002",
    name: "Fatmire Berisha",
    personalId: "0987654321",
    dateOfDeath: "2023-05-10",
    hospital: "Pristina Regional Hospital",
    status: "Pending Municipality",
    confirmedBy: ["Hospital"],
  },
  {
    id: "D-2023-005",
    name: "Driton Shala",
    personalId: "9012345678",
    dateOfDeath: "2023-05-01",
    hospital: "Pristina Regional Hospital",
    status: "Pending Municipality",
    confirmedBy: ["Hospital"],
  },
  {
    id: "D-2023-006",
    name: "Lendita Krasniqi",
    personalId: "6789012345",
    dateOfDeath: "2023-04-28",
    hospital: "Gjakova General Hospital",
    status: "Pending Municipality",
    confirmedBy: ["Hospital"],
  },
  {
    id: "D-2023-007",
    name: "Besnik Hoxha",
    personalId: "4567890123",
    dateOfDeath: "2023-04-25",
    hospital: "Prizren Hospital",
    status: "Pending Municipality",
    confirmedBy: ["Hospital"],
  },
]

const recentConfirmations = [
  {
    id: "D-2023-001",
    name: "Arben Krasniqi",
    personalId: "1234567890",
    dateOfDeath: "2023-05-15",
    hospital: "Pristina Regional Hospital",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality"],
  },
  {
    id: "D-2023-003",
    name: "Burim Gashi",
    personalId: "5678901234",
    dateOfDeath: "2023-05-08",
    hospital: "Pristina Regional Hospital",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Municipality", "Religious"],
  },
  {
    id: "D-2023-004",
    name: "Vjosa Hoxha",
    personalId: "3456789012",
    dateOfDeath: "2023-05-05",
    hospital: "Gjakova General Hospital",
    status: "Confirmed",
    confirmedBy: ["Hospital", "Religious", "Municipality"],
  },
]

export default function MunicipalityDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPending = pendingConfirmations.filter(
    (death) =>
      death.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      death.personalId.includes(searchTerm) ||
      death.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredConfirmed = recentConfirmations.filter(
    (death) =>
      death.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      death.personalId.includes(searchTerm) ||
      death.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleConfirm = (id: string) => {
    // In a real application, this would send a confirmation to the blockchain
    alert(`Confirmation sent for ID: ${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-green-600" />
            <h1 className="text-xl font-bold text-gray-900">Municipality Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">Blerina Gashi</span>
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
            <h2 className="text-2xl font-bold text-gray-900">Municipality Death Verification</h2>
            <p className="text-gray-600">Pristina Municipality</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Confirmations</CardTitle>
              <CardDescription>Awaiting your verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingConfirmations.length}</div>
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
              <CardTitle className="text-lg">Confirmed This Month</CardTitle>
              <CardDescription>Successfully processed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recentConfirmations.length}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <span className="text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                All verified
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
              <span className="text-sm text-gray-500">Last sync: 10 minutes ago</span>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending Confirmations</TabsTrigger>
            <TabsTrigger value="confirmed">Recent Confirmations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Deaths Awaiting Municipality Confirmation
                </CardTitle>
                <CardDescription>
                  These deaths have been reported by hospitals and need your verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Personal ID</TableHead>
                      <TableHead>Date of Death</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPending.length > 0 ? (
                      filteredPending.map((death) => (
                        <TableRow key={death.id}>
                          <TableCell className="font-medium">{death.id}</TableCell>
                          <TableCell>{death.name}</TableCell>
                          <TableCell>{death.personalId}</TableCell>
                          <TableCell>{death.dateOfDeath}</TableCell>
                          <TableCell>{death.hospital}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              {death.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleConfirm(death.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
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
                          No pending confirmations matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmed">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Recently Confirmed Deaths
                </CardTitle>
                <CardDescription>Deaths that have been verified by your municipality</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Personal ID</TableHead>
                      <TableHead>Date of Death</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Confirmed By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConfirmed.length > 0 ? (
                      filteredConfirmed.map((death) => (
                        <TableRow key={death.id}>
                          <TableCell className="font-medium">{death.id}</TableCell>
                          <TableCell>{death.name}</TableCell>
                          <TableCell>{death.personalId}</TableCell>
                          <TableCell>{death.dateOfDeath}</TableCell>
                          <TableCell>{death.hospital}</TableCell>
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
                          No confirmed deaths matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Municipality Reports</CardTitle>
                <CardDescription>Generate and view statistical reports for your municipality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Monthly Death Statistics</CardTitle>
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
                      <CardTitle className="text-sm">Verification Timeline</CardTitle>
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
      </main>
    </div>
  )
}
