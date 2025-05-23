import { Stethoscope } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Stethoscope className="h-16 w-16 text-blue-600 animate-pulse mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">Loading Hospital Dashboard</h2>
      <p className="text-gray-500 mt-2">Please wait while we prepare your dashboard</p>
    </div>
  )
}
