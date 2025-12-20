"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { updateCommunityMemberStatus, deleteCommunityMember } from "@/app/actions/admin-actions"
import { Loader2, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type CommunityMember = {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string | null
  profession: string
  linkedinProfile: string | null
  areasOfInterest: string[]
  supportSeeking: string[]
  preferredEvents: string
  willingToVolunteer: boolean
  areasToSupport: string[]
  howDidYouHear: string | null
  status: string
  createdAt: Date
}

export default function CommunityMembersTable({ members }: { members: CommunityMember[] }) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null)

  const handleStatusChange = async (memberId: string, status: string) => {
    setIsUpdating(memberId)
    const result = await updateCommunityMemberStatus(memberId, status)
    if (result.success) {
      router.refresh()
    }
    setIsUpdating(null)
  }

  const handleDelete = async (memberId: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return
    setIsUpdating(memberId)
    const result = await deleteCommunityMember(memberId)
    if (result.success) {
      router.refresh()
    }
    setIsUpdating(null)
  }

  if (members.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No community members yet</p>
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
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Profession
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
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
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{member.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {member.profession}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={member.status}
                        onValueChange={(value) => handleStatusChange(member.id, value)}
                        disabled={isUpdating === member.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {format(new Date(member.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMember(member)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Member Details</DialogTitle>
                              <DialogDescription>
                                Full information about {member.fullName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedMember && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Full Name
                                    </p>
                                    <p className="text-sm">{selectedMember.fullName}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Email
                                    </p>
                                    <p className="text-sm">{selectedMember.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Phone
                                    </p>
                                    <p className="text-sm">{selectedMember.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Date of Birth
                                    </p>
                                    <p className="text-sm">{selectedMember.dateOfBirth}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Gender
                                    </p>
                                    <p className="text-sm">{selectedMember.gender || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Profession
                                    </p>
                                    <p className="text-sm">{selectedMember.profession}</p>
                                  </div>
                                </div>
                                {selectedMember.linkedinProfile && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-1">
                                      LinkedIn Profile
                                    </p>
                                    <a
                                      href={selectedMember.linkedinProfile}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary hover:underline"
                                    >
                                      {selectedMember.linkedinProfile}
                                    </a>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">
                                    Areas of Interest
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedMember.areasOfInterest.map((area) => (
                                      <Badge key={area} variant="secondary">
                                        {area}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">
                                    Support Seeking
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedMember.supportSeeking.map((support) => (
                                      <Badge key={support} variant="secondary">
                                        {support}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Preferred Events
                                  </p>
                                  <p className="text-sm">{selectedMember.preferredEvents}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Willing to Volunteer
                                  </p>
                                  <p className="text-sm">
                                    {selectedMember.willingToVolunteer ? "Yes" : "No"}
                                  </p>
                                </div>
                                {selectedMember.areasToSupport.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                      Areas to Support
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedMember.areasToSupport.map((area) => (
                                        <Badge key={area} variant="secondary">
                                          {area}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {selectedMember.howDidYouHear && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      How did you hear about us
                                    </p>
                                    <p className="text-sm">{selectedMember.howDidYouHear}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          disabled={isUpdating === member.id}
                        >
                          {isUpdating === member.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-600" />
                          )}
                        </Button>
                      </div>
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
