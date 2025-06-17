"use client"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock } from "lucide-react"

export default function StudentCoursesPage() {
  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: "1",
      title: "Advanced Hair Styling Techniques",
      progress: 65,
      nextLesson: "Creative Updos for Special Events",
      instructor: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=200",
      lastAccessed: "2 days ago",
      totalLessons: 12,
      completedLessons: 8,
    },
    {
      id: "2",
      title: "Professional Makeup Artistry",
      progress: 30,
      nextLesson: "Color Theory and Skin Tone Matching",
      instructor: "Michael Chen",
      image: "/placeholder.svg?height=100&width=200",
      lastAccessed: "1 week ago",
      totalLessons: 10,
      completedLessons: 3,
    },
    {
      id: "3",
      title: "Nail Art & Technology",
      progress: 100,
      nextLesson: "Course Completed",
      instructor: "Emily Rodriguez",
      image: "/placeholder.svg?height=100&width=200",
      lastAccessed: "3 weeks ago",
      totalLessons: 8,
      completedLessons: 8,
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeader heading="My Courses" text="Track your progress and continue learning." />

      <div className="grid gap-6">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 lg:w-3/4 p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Instructor: {course.instructor}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm">Next Lesson:</p>
                        <p className="text-sm font-medium">{course.nextLesson}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last accessed {course.lastAccessed}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {course.progress < 100 ? (
                      <Button asChild>
                        <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                      </Button>
                    ) : (
                      <Button asChild variant="outline">
                        <Link href={`/dashboard/certificates?course=${course.id}`}>View Certificate</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href="/courses">Browse More Courses</Link>
        </Button>
      </div>
    </div>
  )
}
