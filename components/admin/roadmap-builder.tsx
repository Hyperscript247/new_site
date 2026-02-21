"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  createRoadmap,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  reorderMilestones,
} from "@/app/actions/roadmap-actions"
import { Loader2, Plus, Edit, Trash2, GripVertical, Map } from "lucide-react"

type Milestone = {
  id: string
  title: string
  description: string
  type: string
  durationWeeks: number
  sortOrder: number
  prerequisiteIds: string[]
  createdAt: Date
  updatedAt: Date
}

type CourseRoadmap = {
  id: string
  courseId: string
  description?: string | null
  milestones: Milestone[]
}

type RoadmapBuilderProps = {
  courseId: string
  courseName: string
  roadmap?: CourseRoadmap | null
}

const MILESTONE_TYPES = [
  { value: "lesson", label: "Lesson" },
  { value: "project", label: "Project" },
  { value: "assessment", label: "Assessment" },
  { value: "certificate", label: "Certificate" },
]

export default function RoadmapBuilder({
  courseId,
  courseName,
  roadmap,
}: RoadmapBuilderProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateMilestoneOpen, setIsCreateMilestoneOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
  const [error, setError] = useState("")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleCreateRoadmap = async () => {
    setIsLoading(true)
    setError("")
    try {
      const result = await createRoadmap(courseId)
      if (result.success) {
        router.refresh()
      } else {
        console.error("Roadmap creation error:", result.error)
        setError(result.error || "Failed to create roadmap")
      }
    } catch (err) {
      console.error("Unexpected error creating roadmap:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!roadmap) return

    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      roadmapId: roadmap.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      durationWeeks: parseInt(formData.get("durationWeeks") as string),
      sortOrder: roadmap.milestones.length,
    }

    const result = await createMilestone(data)

    if (result.success) {
      setIsCreateMilestoneOpen(false)
      e.currentTarget.reset()
      router.refresh()
    } else {
      setError(result.error || "Failed to create milestone")
    }
    setIsLoading(false)
  }

  const handleUpdateMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingMilestone) return

    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      durationWeeks: parseInt(formData.get("durationWeeks") as string),
    }

    const result = await updateMilestone(editingMilestone.id, data)

    if (result.success) {
      setEditingMilestone(null)
      router.refresh()
    } else {
      setError(result.error || "Failed to update milestone")
    }
    setIsLoading(false)
  }

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return

    setIsLoading(true)
    const result = await deleteMilestone(milestoneId)
    if (result.success) {
      router.refresh()
    }
    setIsLoading(false)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || !roadmap) return

    const milestones = [...roadmap.milestones]
    const [removed] = milestones.splice(draggedIndex, 1)
    milestones.splice(dropIndex, 0, removed)

    const updates = milestones.map((m, index) => ({
      id: m.id,
      sortOrder: index,
    }))

    setIsLoading(true)
    const result = await reorderMilestones(updates)
    if (result.success) {
      router.refresh()
    }
    setIsLoading(false)
    setDraggedIndex(null)
  }

  const getMilestoneTypeColor = (type: string) => {
    switch (type) {
      case "lesson":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "project":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "assessment":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "certificate":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (!roadmap) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Map className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Roadmap Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create a roadmap to show students what they'll learn in this course.
          </p>
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 mb-4 max-w-md mx-auto">
              {error}
            </div>
          )}
          <Button onClick={handleCreateRoadmap} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Roadmap
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Course Roadmap</h2>
          <p className="text-muted-foreground">
            Manage milestones for {courseName}
          </p>
        </div>
        <Dialog open={isCreateMilestoneOpen} onOpenChange={setIsCreateMilestoneOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Milestone</DialogTitle>
              <DialogDescription>
                Add a new milestone to the course roadmap
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateMilestone}>
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 mb-4">
                  {error}
                </div>
              )}
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="milestone-title">Title</Label>
                  <Input
                    id="milestone-title"
                    name="title"
                    placeholder="e.g., HTML Basics"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="milestone-description">Description</Label>
                  <Textarea
                    id="milestone-description"
                    name="description"
                    placeholder="What will students learn?"
                    rows={3}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="milestone-type">Type</Label>
                    <Select name="type" required disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {MILESTONE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milestone-duration">Duration (weeks)</Label>
                    <Input
                      id="milestone-duration"
                      name="durationWeeks"
                      type="number"
                      min="1"
                      defaultValue="1"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateMilestoneOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Milestone"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Milestone Dialog */}
      <Dialog open={!!editingMilestone} onOpenChange={(open) => !open && setEditingMilestone(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
            <DialogDescription>Update milestone information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateMilestone}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 mb-4">
                {error}
              </div>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  defaultValue={editingMilestone?.title}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingMilestone?.description}
                  rows={3}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select
                    name="type"
                    defaultValue={editingMilestone?.type}
                    required
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MILESTONE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration (weeks)</Label>
                  <Input
                    id="edit-duration"
                    name="durationWeeks"
                    type="number"
                    min="1"
                    defaultValue={editingMilestone?.durationWeeks}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingMilestone(null)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Milestone"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Milestones List */}
      {roadmap.milestones.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No milestones yet. Add your first milestone to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {roadmap.milestones.map((milestone, index) => (
            <Card
              key={milestone.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className="cursor-move hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <GripVertical className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getMilestoneTypeColor(
                            milestone.type
                          )}`}
                        >
                          {milestone.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {milestone.durationWeeks} week{milestone.durationWeeks !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMilestone(milestone)}
                      disabled={isLoading}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMilestone(milestone.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-600" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
