"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateRegistrationStatus, updatePaymentStatus } from "@/app/actions/admin-actions"
import { Loader2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Registration = {
  id: string
  fullName: string
  email: string
  phone: string
  location: string
  availability: string
  experienceLevel: string
  courseId: string
  createdAt: Date
  status: string
  courseProgress: number
  paymentStatus: string
  course: {
    title: string
  }
}

export default function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)

  const handleStatusChange = async (registrationId: string, status: string) => {
    setIsUpdating(registrationId)
    await updateRegistrationStatus(registrationId, status)
    setIsUpdating(null)
  }

  const handlePaymentStatusChange = async (registrationId: string, paymentStatus: string) => {
    setIsUpdating(registrationId)
    await updatePaymentStatus(registrationId, paymentStatus)
    setIsUpdating(null)
  }

  if (registrations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No course registrations yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {registrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{registration.fullName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate">
                        {registration.course.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {registration.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={registration.status}
                        onValueChange={(value) => handleStatusChange(registration.id, value)}
                        disabled={isUpdating === registration.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={registration.paymentStatus}
                        onValueChange={(value) => handlePaymentStatusChange(registration.id, value)}
                        disabled={isUpdating === registration.id}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Unpaid">Unpaid</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Partial">Partial</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {registration.courseProgress}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {format(new Date(registration.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRegistration(registration)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Registration Details</DialogTitle>
                            <DialogDescription>
                              Full information about {registration.fullName}'s registration
                            </DialogDescription>
                          </DialogHeader>
                          {selectedRegistration && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Full Name
                                  </p>
                                  <p className="text-sm">{selectedRegistration.fullName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Email
                                  </p>
                                  <p className="text-sm">{selectedRegistration.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Phone
                                  </p>
                                  <p className="text-sm">{selectedRegistration.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Location
                                  </p>
                                  <p className="text-sm">{selectedRegistration.location}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Availability
                                  </p>
                                  <p className="text-sm">{selectedRegistration.availability}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Experience Level
                                  </p>
                                  <p className="text-sm">{selectedRegistration.experienceLevel}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Course
                                  </p>
                                  <p className="text-sm">{selectedRegistration.course.title}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Status
                                  </p>
                                  <p className="text-sm">{selectedRegistration.status}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Payment Status
                                  </p>
                                  <p className="text-sm">{selectedRegistration.paymentStatus}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Course Progress
                                  </p>
                                  <p className="text-sm">{selectedRegistration.courseProgress}%</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Registered On
                                  </p>
                                  <p className="text-sm">
                                    {format(new Date(selectedRegistration.createdAt), "PPP")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
