"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DeathRegistrationFormProps {
  onComplete: () => void
}

export default function DeathRegistrationForm({ onComplete }: DeathRegistrationFormProps) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    personalId: "",
    dateOfBirth: "",
    dateOfDeath: "",
    timeOfDeath: "",
    placeOfDeath: "hospital",
    causeOfDeath: "",
    doctorName: "",
    doctorId: "",
    additionalNotes: "",
    confirmInformation: false,
  })

  const [formStep, setFormStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateStep1 = () => {
    if (!formState.firstName || !formState.lastName || !formState.personalId) {
      setError("Please fill in all required fields")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (!formState.dateOfDeath || !formState.timeOfDeath || !formState.causeOfDeath) {
      setError("Please fill in all required fields")
      return false
    }
    setError("")
    return true
  }

  const validateStep3 = () => {
    if (!formState.doctorName || !formState.doctorId || !formState.confirmInformation) {
      setError("Please fill in all required fields and confirm the information")
      return false
    }
    setError("")
    return true
  }

  const handleNextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2)
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3)
    }
  }

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep3()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call to blockchain
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect back to dashboard after 2 seconds
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Death Registration Form</CardTitle>
          <CardDescription>Register a death in the blockchain-based death verification system</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Registration Successful</h3>
              <p className="text-gray-500 mb-6">The death has been registered successfully in the blockchain system.</p>
              <Button onClick={onComplete}>Return to Dashboard</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <div className="text-sm font-medium">
                    Step {formStep} of 3:{" "}
                    {formStep === 1 ? "Personal Information" : formStep === 2 ? "Death Details" : "Certification"}
                  </div>
                  <div className="text-sm text-gray-500">{Math.round((formStep / 3) * 100)}% Complete</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(formStep / 3) * 100}%` }}></div>
                </div>
              </div>

              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        value={formState.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        value={formState.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalId">
                      Personal ID Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="personalId"
                      value={formState.personalId}
                      onChange={(e) => handleChange("personalId", e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Enter the 10-digit personal identification number</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formState.dateOfBirth}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfDeath">
                        Date of Death <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dateOfDeath"
                        type="date"
                        value={formState.dateOfDeath}
                        onChange={(e) => handleChange("dateOfDeath", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeOfDeath">
                        Time of Death <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="timeOfDeath"
                        type="time"
                        value={formState.timeOfDeath}
                        onChange={(e) => handleChange("timeOfDeath", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placeOfDeath">
                      Place of Death <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formState.placeOfDeath}
                      onValueChange={(value) => handleChange("placeOfDeath", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select place of death" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="nursing-home">Nursing Home</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="causeOfDeath">
                      Cause of Death <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="causeOfDeath"
                      value={formState.causeOfDeath}
                      onChange={(e) => handleChange("causeOfDeath", e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorName">
                        Doctor's Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="doctorName"
                        value={formState.doctorName}
                        onChange={(e) => handleChange("doctorName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorId">
                        Doctor's ID <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="doctorId"
                        value={formState.doctorId}
                        onChange={(e) => handleChange("doctorId", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formState.additionalNotes}
                      onChange={(e) => handleChange("additionalNotes", e.target.value)}
                      placeholder="Any additional information about the death"
                    />
                  </div>

                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="pt-0.5">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Upload Medical Death Certificate</p>
                        <p className="text-xs text-gray-500 mb-2">
                          Upload a scanned copy of the medical death certificate (PDF or image)
                        </p>
                        <Button variant="outline" size="sm" type="button">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="confirmInformation"
                      checked={formState.confirmInformation as boolean}
                      onCheckedChange={(checked) => handleChange("confirmInformation", checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="confirmInformation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I confirm that all information provided is accurate <span className="text-red-500">*</span>
                      </Label>
                      <p className="text-xs text-gray-500">
                        By checking this box, you certify that the information provided is true and accurate to the best
                        of your knowledge.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}
        </CardContent>
        {!isSuccess && (
          <CardFooter className="flex justify-between">
            {formStep > 1 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Previous
              </Button>
            ) : (
              <Button variant="outline" onClick={onComplete}>
                Cancel
              </Button>
            )}

            {formStep < 3 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
