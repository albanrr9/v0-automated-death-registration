import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, FileCheck, Shield, Users, Camera } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Kosovo Death Registration System</h1>
          </div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Modernizing Death Registration & Pension Security
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              An integrated, AI-supported and blockchain-secured system to streamline death verification and prevent
              pension fraud in Kosovo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Access Portal
                </Button>
              </Link>
              <Link href="#learn-more">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-100 rounded-full opacity-70"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-2 border-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Hospitals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Users className="h-12 w-12 text-blue-500 mx-auto" />
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-green-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Municipalities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FileCheck className="h-12 w-12 text-green-500 mx-auto" />
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-purple-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Religious Orgs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CheckCircle className="h-12 w-12 text-purple-500 mx-auto" />
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-gray-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Civil Registry</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Database className="h-12 w-12 text-gray-500 mx-auto" />
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">Blockchain-secured verification system</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Security</CardTitle>
                <CardDescription>Tamper-proof verification system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  All death verification data is stored on a decentralized blockchain ledger to ensure transparency,
                  traceability, and tamper-proof security.
                </p>
              </CardContent>
              <CardFooter>
                <Shield className="h-6 w-6 text-blue-500" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Multi-Entity Verification</CardTitle>
                <CardDescription>Requires confirmation from multiple sources</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  The system requires at least two out of three authorized entities to confirm a death, ensuring
                  accuracy and preventing fraudulent reports.
                </p>
              </CardContent>
              <CardFooter>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Integration</CardTitle>
                <CardDescription>Facial recognition for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  AI-powered facial recognition allows pensioners to verify they are alive remotely, eliminating the
                  need for in-person verification at civil registry offices.
                </p>
              </CardContent>
              <CardFooter>
                <Camera className="h-6 w-6 text-purple-500" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* New Section: Pensioner Verification */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pensioner Self-Verification</h2>
            <p className="text-xl text-gray-600">
              Verify your identity remotely using secure facial recognition with Zero-Knowledge Proofs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">How It Works</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Log in to your account</h4>
                    <p className="text-gray-600 text-sm">Access your pensioner dashboard using your credentials</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Start facial verification</h4>
                    <p className="text-gray-600 text-sm">Use your device's camera to capture your face</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Secure ZKP verification</h4>
                    <p className="text-gray-600 text-sm">Your identity is verified without sharing biometric data</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">Verification complete</h4>
                    <p className="text-gray-600 text-sm">Your pension payments continue without interruption</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Privacy Protection
                </h3>
                <p className="text-gray-700">
                  Your facial data never leaves your device. Zero-Knowledge Proofs allow us to verify your identity
                  without storing or transmitting your actual biometric data.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Benefits
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• No need to visit government offices in person</li>
                  <li>• Verify from the comfort of your home</li>
                  <li>• Secure and tamper-proof verification</li>
                  <li>• Immediate confirmation of identity</li>
                </ul>
              </div>

              <div className="text-center">
                <Link href="/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Try Facial Verification
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                  <h3 className="text-xl font-bold mb-2">Death Occurrence</h3>
                  <p className="text-gray-600">When a death occurs, it is recorded by the hospital in the system.</p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white order-1 md:order-2 mb-4 md:mb-0">
                  1
                </div>
                <div className="flex-1 md:pl-8 order-3"></div>
              </div>

              <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white order-1 md:order-2 mb-4 md:mb-0">
                  2
                </div>
                <div className="flex-1 md:pl-8 order-3">
                  <h3 className="text-xl font-bold mb-2">Multi-Entity Verification</h3>
                  <p className="text-gray-600">
                    Municipality and religious organizations confirm the death in the system.
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                  <h3 className="text-xl font-bold mb-2">Blockchain Confirmation</h3>
                  <p className="text-gray-600">
                    Once at least two entities confirm, the death is recorded on the blockchain.
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white order-1 md:order-2 mb-4 md:mb-0">
                  3
                </div>
                <div className="flex-1 md:pl-8 order-3"></div>
              </div>

              <div className="relative flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white order-1 md:order-2 mb-4 md:mb-0">
                  4
                </div>
                <div className="flex-1 md:pl-8 order-3">
                  <h3 className="text-xl font-bold mb-2">Automatic Notifications</h3>
                  <p className="text-gray-600">
                    Civil registry is notified and pension payments are automatically stopped.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kosovo Death Registration System</h3>
              <p className="text-gray-400">A modern solution for death registration and pension security.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#learn-more" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                Ministry of Internal Affairs
                <br />
                Pristina, Kosovo
                <br />
                support@civilregistry.gov.ks
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kosovo Civil Registry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
