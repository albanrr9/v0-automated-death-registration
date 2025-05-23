"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, CheckCircle, FileText, LogOut, User, Calendar, Clock, FileCheck } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function PensionerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [verificationOpen, setVerificationOpen] = useState(false)
  const [verificationStep, setVerificationStep] = useState(1)
  const [verificationStatus, setVerificationStatus] = useState("")
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [verificationId, setVerificationId] = useState("")
  const [cameraActive, setCameraActive] = useState(false)
  const [imageCaptured, setImageCaptured] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const pensionerInfo = {
    name: "Fatmir Berisha",
    personalId: "1234567890",
    dateOfBirth: "1955-05-15",
    pensionType: "Age Pension",
    pensionAmount: "€180/month",
    lastVerification: "2023-11-10",
    nextVerification: "2024-05-10",
    address: "Rr. Agim Ramadani 23, Prishtinë",
    phone: "044-123-456",
  }

  const recentPayments = [
    { id: "P-2024-001", date: "2024-04-01", amount: "€180.00", status: "Paid" },
    { id: "P-2024-002", date: "2024-03-01", amount: "€180.00", status: "Paid" },
    { id: "P-2024-003", date: "2024-02-01", amount: "€180.00", status: "Paid" },
  ]

  const verificationHistory = [
    { id: "V-2023-001", date: "2023-11-10", method: "In-person", status: "Verified" },
    { id: "V-2023-002", date: "2023-05-12", method: "In-person", status: "Verified" },
    { id: "V-2022-003", date: "2022-11-08", method: "In-person", status: "Verified" },
  ]

  // Start camera
  const startCamera = async () => {
    try {
      if (!videoRef.current) return

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })

      videoRef.current.srcObject = stream
      videoRef.current.style.transform = "scaleX(-1)"
      setCameraActive(true)
      setVerificationStatus("Position your face within the circle and ensure good lighting.")
      setVerificationProgress(25)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setVerificationStatus("Failed to access camera. Please ensure camera permissions are granted.")
    }
  }

  // Capture image
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext("2d")
    if (!context) return

    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight

    context.scale(-1, 1)
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

    setImageCaptured(true)
    setVerificationStep(2)
    setVerificationStatus("Image captured. Proceeding with verification...")
    setVerificationProgress(50)

    // Simulate ZKP verification process
    setTimeout(() => {
      setVerificationStep(3)
      setVerificationStatus("Generating Zero-Knowledge Proof...")
      setVerificationProgress(75)

      setTimeout(() => {
        setVerificationStep(4)
        setVerificationSuccess(true)
        setVerificationId("VER-" + Math.random().toString(36).substr(2, 9).toUpperCase())
        setVerificationStatus("Verification successful! Your identity has been confirmed.")
        setVerificationProgress(100)

        // Stop camera
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream
          stream.getTracks().forEach((track) => track.stop())
        }
      }, 2000)
    }, 2000)
  }

  // Reset verification
  const resetVerification = () => {
    setVerificationStep(1)
    setVerificationStatus("")
    setVerificationProgress(0)
    setVerificationSuccess(false)
    setVerificationId("")
    setCameraActive(false)
    setImageCaptured(false)

    // Stop camera if active
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  // Close verification dialog
  const closeVerification = () => {
    resetVerification()
    setVerificationOpen(false)
  }

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Pensioner Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">{pensionerInfo.name}</span>
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
            <h2 className="text-2xl font-bold text-gray-900">Pension Management</h2>
            <p className="text-gray-600">Welcome back, {pensionerInfo.name}</p>
          </div>
          <Button onClick={() => setVerificationOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Camera className="h-4 w-4 mr-2" />
            Verify Identity
          </Button>
        </div>

        {/* Verification Status Card */}
        <Card className="mb-8 border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="font-bold text-lg mb-1">Verification Status</h3>
              <p className="text-gray-600">
                Your next verification is due on <span className="font-semibold">{pensionerInfo.nextVerification}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-amber-700 font-medium">
                {Math.floor(
                  (new Date(pensionerInfo.nextVerification).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )}{" "}
                days remaining
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pension Information</CardTitle>
              <CardDescription>Current pension details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{pensionerInfo.pensionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">{pensionerInfo.pensionAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Date:</span>
                  <span className="font-medium">1st of each month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next Verification</CardTitle>
              <CardDescription>Upcoming verification date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-bold">{pensionerInfo.nextVerification}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                You can verify your identity online using facial recognition or visit a civil registry office in person.
              </p>
              <Button variant="outline" size="sm" onClick={() => setVerificationOpen(true)}>
                Verify Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Your registered details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Personal ID:</span>
                  <span className="font-medium">{pensionerInfo.personalId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date of Birth:</span>
                  <span className="font-medium">{pensionerInfo.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address:</span>
                  <span className="font-medium">{pensionerInfo.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{pensionerInfo.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="payments" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="payments">Recent Payments</TabsTrigger>
            <TabsTrigger value="verifications">Verification History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Pension Payments
                </CardTitle>
                <CardDescription>History of your recent pension payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  View All Payments
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="verifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" />
                  Verification History
                </CardTitle>
                <CardDescription>Record of your previous identity verifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Verification ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verificationHistory.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell className="font-medium">{verification.id}</TableCell>
                        <TableCell>{verification.date}</TableCell>
                        <TableCell>{verification.method}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {verification.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => setVerificationOpen(true)}>
                  Verify Now
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Documents</CardTitle>
                <CardDescription>Access and download your pension-related documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">Pension Certificate</p>
                        <p className="text-sm text-gray-500">Issued: January 15, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">Annual Pension Statement</p>
                        <p className="text-sm text-gray-500">Issued: December 31, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">Tax Statement</p>
                        <p className="text-sm text-gray-500">Issued: January 31, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Facial Recognition Verification Dialog */}
      <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => {
            // Prevent closing during active verification
            if (cameraActive && !verificationSuccess) {
              e.preventDefault()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Identity Verification</DialogTitle>
            <DialogDescription>
              Verify your identity using facial recognition with Zero-Knowledge Proofs
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{verificationProgress}%</span>
              </div>
              <Progress value={verificationProgress} className="h-2" />
            </div>

            {/* Steps indicator */}
            <div className="flex justify-between text-sm mb-4">
              <div
                className={`flex flex-col items-center ${verificationStep >= 1 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    verificationStep >= 1 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  1
                </div>
                <span>Prepare</span>
              </div>
              <div
                className={`flex flex-col items-center ${verificationStep >= 2 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    verificationStep >= 2 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  2
                </div>
                <span>Capture</span>
              </div>
              <div
                className={`flex flex-col items-center ${verificationStep >= 3 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    verificationStep >= 3 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  3
                </div>
                <span>Verify</span>
              </div>
              <div
                className={`flex flex-col items-center ${verificationStep >= 4 ? "text-blue-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    verificationStep >= 4 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  4
                </div>
                <span>Confirm</span>
              </div>
            </div>

            {/* Camera view */}
            <div className="relative w-full h-64 bg-black rounded-md overflow-hidden">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                autoPlay 
                playsInline 
                muted 
                style={{ transform: 'scaleX(-1)' }} // Add this line
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Face overlay */}
              {cameraActive && !imageCaptured && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-dashed border-white rounded-full"></div>
              )}

              {/* Success overlay */}
              {verificationSuccess && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-2" />
                    <p className="text-white font-bold text-lg">Verification Successful</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status message */}
            {verificationStatus && (
              <div
                className={`p-3 rounded-md text-center ${
                  verificationSuccess
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}
              >
                {verificationStatus}
              </div>
            )}

            {/* Verification details */}
            {verificationSuccess && (
              <div className="bg-gray-50 p-4 rounded-md border">
                <h4 className="font-medium mb-2">Verification Details:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Verification ID:</span>
                    <span className="font-medium">{verificationId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method:</span>
                    <span className="font-medium">ZKP Facial Recognition</span>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy notice */}
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
              <p>
                <strong>Privacy Protection:</strong> Your facial data never leaves your device. We use Zero-Knowledge
                Proofs to verify your identity without storing or transmitting your actual biometric data.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-2">
              {!cameraActive && !verificationSuccess && <Button onClick={startCamera}>Start Camera</Button>}

              {cameraActive && !imageCaptured && <Button onClick={captureImage}>Capture Image</Button>}

              {verificationSuccess ? (
                <Button onClick={closeVerification}>Close</Button>
              ) : (
                <Button variant="outline" onClick={closeVerification} disabled={cameraActive && !verificationSuccess}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
