"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import Link from "next/link"

// Mock courses data - in a real app, this would come from an API
const allCourses = [
  {
    id: 1,
    title: "Advanced Hair Styling Techniques",
    description: "Master the latest hair styling techniques from industry experts.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Hair Styling",
    level: "Advanced",
    duration: "8 weeks",
    students: 324,
    rating: 4.8,
    instructor: "Sarah Johnson",
    price: 299,
  },
  {
    id: 2,
    title: "Professional Makeup Artistry",
    description: "Learn professional makeup application for all occasions and skin types.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Makeup",
    level: "Intermediate",
    duration: "6 weeks",
    students: 412,
    rating: 4.9,
    instructor: "Michael Chen",
    price: 349,
  },
  {
    id: 3,
    title: "Nail Art & Technology",
    description: "From basic manicures to advanced nail art and extensions.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Nail Care",
    level: "Beginner",
    duration: "4 weeks",
    students: 256,
    rating: 4.7,
    instructor: "Emily Rodriguez",
    price: 249,
  },
  {
    id: 4,
    title: "Skincare & Facial Treatments",
    description: "Comprehensive training on skincare analysis and facial treatments.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Skincare",
    level: "Intermediate",
    duration: "5 weeks",
    students: 189,
    rating: 4.6,
    instructor: "David Kim",
    price: 279,
  },
  {
    id: 5,
    title: "Bridal Hair & Makeup",
    description: "Specialized techniques for wedding day beauty services.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Bridal",
    level: "Advanced",
    duration: "6 weeks",
    students: 215,
    rating: 4.9,
    instructor: "Sarah Johnson",
    price: 399,
  },
  {
    id: 6,
    title: "Advanced Color Techniques",
    description: "Master hair coloring from balayage to creative color.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Hair Styling",
    level: "Advanced",
    duration: "7 weeks",
    students: 178,
    rating: 4.8,
    instructor: "Jessica Williams",
    price: 329,
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [courses, setCourses] = useState(allCourses)

  // Filter courses based on search term, category, and level
  useEffect(() => {
    let filteredCourses = allCourses

    // Filter by search term
    if (searchTerm) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filteredCourses = filteredCourses.filter(
        (course) => course.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filteredCourses = filteredCourses.filter((course) => course.level.toLowerCase() === selectedLevel.toLowerCase())
    }

    setCourses(filteredCourses)
  }, [searchTerm, selectedCategory, selectedLevel])

  // Get unique categories and levels for filters
  const categories = ["all", ...new Set(allCourses.map((course) => course.category.toLowerCase()))]
  const levels = ["all", ...new Set(allCourses.map((course) => course.level.toLowerCase()))]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-muted py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-6">Browse All Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search courses..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button onClick={() => setSearchTerm(searchTerm)}>Search</Button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No courses found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4">{course.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm">Instructor: {course.instructor}</div>
                      <div className="font-bold">${course.price}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
