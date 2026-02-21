"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code,
  FileCheck,
  Award,
} from "lucide-react"

type Milestone = {
  id: string
  title: string
  description: string
  type: string
  durationWeeks: number
  sortOrder: number
}

type CourseRoadmapProps = {
  milestones: Milestone[]
  completedMilestoneIds?: string[]
  registrationId?: string
  isEnrolled?: boolean
}

const getMilestoneIcon = (type: string) => {
  switch (type) {
    case "lesson":
      return BookOpen
    case "project":
      return Code
    case "assessment":
      return FileCheck
    case "certificate":
      return Award
    default:
      return Circle
  }
}

const getMilestoneColor = (type: string) => {
  switch (type) {
    case "lesson":
      return "text-blue-600 dark:text-blue-400"
    case "project":
      return "text-green-600 dark:text-green-400"
    case "assessment":
      return "text-yellow-600 dark:text-yellow-400"
    case "certificate":
      return "text-purple-600 dark:text-purple-400"
    default:
      return "text-gray-600 dark:text-gray-400"
  }
}

export default function CourseRoadmap({
  milestones,
  completedMilestoneIds = [],
  registrationId,
  isEnrolled = false,
}: CourseRoadmapProps) {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)

  const completedCount = completedMilestoneIds.length
  const totalCount = milestones.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  let cumulativeWeeks = 0

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Journey</span>
            {isEnrolled && (
              <span className="text-sm font-normal text-muted-foreground">
                {completedCount} of {totalCount} completed
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEnrolled ? (
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% complete
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              This course includes {totalCount} milestone{totalCount !== 1 ? "s" : ""} covering{" "}
              {milestones.reduce((sum, m) => sum + m.durationWeeks, 0)} weeks of learning
            </p>
          )}
        </CardContent>
      </Card>

      {/* Roadmap Timeline */}
      <div className="relative space-y-4">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {milestones.map((milestone, index) => {
          const Icon = getMilestoneIcon(milestone.type)
          const isCompleted = completedMilestoneIds.includes(milestone.id)
          const isExpanded = expandedMilestone === milestone.id
          const weekRange = `Week ${cumulativeWeeks + 1}${
            milestone.durationWeeks > 1
              ? `-${cumulativeWeeks + milestone.durationWeeks}`
              : ""
          }`
          cumulativeWeeks += milestone.durationWeeks

          return (
            <Card
              key={milestone.id}
              className={`ml-12 relative ${
                isCompleted ? "border-green-500" : ""
              } transition-all hover:shadow-md`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute -left-[38px] top-6 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 border-green-500"
                    : "bg-background border-border"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-3 h-3 text-muted-foreground" />
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon
                      className={`w-5 h-5 mt-1 flex-shrink-0 ${getMilestoneColor(
                        milestone.type
                      )}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {milestone.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {weekRange}
                        </span>
                        {isCompleted && (
                          <Badge
                            variant="default"
                            className="text-xs bg-green-500 hover:bg-green-600"
                          >
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mb-1">
                        {milestone.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {index < milestones.length - 1 && (
                <div className="h-4 border-l-2 border-dashed border-border absolute left-[-26px] bottom-[-16px]" />
              )}
            </Card>
          )
        })}
      </div>

      {/* Call to Action */}
      {!isEnrolled && milestones.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-6 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-muted-foreground mb-4">
              Enroll now to track your progress and unlock all course materials
            </p>
            <Button size="lg">Enroll in Course</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
