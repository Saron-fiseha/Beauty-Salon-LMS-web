"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Training {
  id: string
  name: string
  description: string
  image: string
  courseCode: string
  categoryId: string
  categoryName: string
  price: number
  discount: number
  maxTrainees: number
  currentTrainees: number
  modules: number
  status: "active" | "inactive" | "draft"
  createdAt: string
}

export default function TrainingsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: "1",
      name: "Advanced Makeup Techniques",
      description: "Professional makeup artistry for special events and photography",
      image: "/placeholder.svg?height=200&width=300",
      courseCode: "MKP-ADV-001",
      categoryId: "1",
      categoryName: "Makeup Artistry",
      price: 299,
      discount: 10,
      maxTrainees: 20,
      currentTrainees: 15,
      modules: 8,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Hair Styling Fundamentals",
      description: "Basic to intermediate hair styling and cutting techniques",
      image: "/placeholder.svg?height=200&width=300",
      courseCode: "HST-FND-002",
      categoryId: "2",
      categoryName: "Hair Styling",
      price: 249,
      discount: 15,
      maxTrainees: 25,
      currentTrainees: 18,
      modules: 6,
      status: "active",
      createdAt: "2024-02-10",
    },
    {
      id: "3",
      name: "Skincare Specialist Certification",
      description: "Comprehensive skincare treatments and facial procedures",
      image: "/placeholder.svg?height=200&width=300",
      courseCode: "SKN-CRT-003",
      categoryId: "3",
      categoryName: "Skincare & Facial",
      price: 399,
      discount: 0,
      maxTrainees: 15,
      currentTrainees: 8,
      modules: 10,
      status: "draft",
      createdAt: "2024-03-05",
    },
  ])

  const [newTraining, setNewTraining] = useState({
    name: "",
    description: "",
    image: "",
    courseCode: "",
    categoryId: "",
    price: 0,
    discount: 0,
    maxTrainees: 0,
  })

  const categories = [
    { id: "1", name: "Makeup Artistry" },
    { id: "2", name: "Hair Styling" },
    { id: "3", name: "Skincare & Facial" },
    { id: "4", name: "Nail Care" },
  ]

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      training.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || training.categoryId === filterCategory
    const matchesStatus = filterStatus === "all" || training.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleCreateTraining = () => {
    const categoryName = categories.find((c) => c.id === newTraining.categoryId)?.name || ""
    const training: Training = {
      id: Date.now().toString(),
      ...newTraining,
      categoryName,
      currentTrainees: 0,
      modules: 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTrainings([...trainings, training])
    setNewTraining({
      name: "",
      description: "",
      image: "",
      courseCode: "",
      categoryId: "",
      price: 0,
      discount: 0,
      maxTrainees: 0,
    })
    toast({
      title: "Training created",
      description: `${newTraining.name} has been created successfully.`,
    })
  }

  const handleDeleteTraining = (trainingId: string) => {
    setTrainings(trainings.filter((training) => training.id !== trainingId))
    toast({
      title: "Training deleted",
      description: "Training has been deleted successfully.",
    })
  }

  const exportTrainings = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Code,Category,Price,Discount,Trainees,Modules,Status\n" +
      filteredTrainings
        .map(
          (t) =>
            `"${t.name}","${t.courseCode}","${t.categoryName}",${t.price},${t.discount},${t.currentTrainees}/${t.maxTrainees},${t.modules},"${t.status}"`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "trainings.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trainings Management</h1>
          <p className="text-gray-600">Manage specific training courses and modules</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportTrainings}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Training
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Training</DialogTitle>
                <DialogDescription>Add a new training course</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Training Name</label>
                    <Input
                      value={newTraining.name}
                      onChange={(e) => setNewTraining({ ...newTraining, name: e.target.value })}
                      placeholder="Enter training name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Course Code</label>
                    <Input
                      value={newTraining.courseCode}
                      onChange={(e) => setNewTraining({ ...newTraining, courseCode: e.target.value })}
                      placeholder="e.g., MKP-ADV-001"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newTraining.description}
                    onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
                    placeholder="Enter training description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={newTraining.image}
                    onChange={(e) => setNewTraining({ ...newTraining, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={newTraining.categoryId}
                    onValueChange={(value) => setNewTraining({ ...newTraining, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Price ($)</label>
                    <Input
                      type="number"
                      value={newTraining.price}
                      onChange={(e) => setNewTraining({ ...newTraining, price: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Discount (%)</label>
                    <Input
                      type="number"
                      value={newTraining.discount}
                      onChange={(e) => setNewTraining({ ...newTraining, discount: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max Trainees</label>
                    <Input
                      type="number"
                      value={newTraining.maxTrainees}
                      onChange={(e) => setNewTraining({ ...newTraining, maxTrainees: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateTraining}>Create Training</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trainings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trainings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Trainings</CardTitle>
          <CardDescription>Complete list of training courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Training</th>
                  <th className="text-left p-4">Code</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Trainees</th>
                  <th className="text-left p-4">Modules</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainings.map((training) => (
                  <tr key={training.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12">
                          <Image
                            src={training.image || "/placeholder.svg"}
                            alt={training.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{training.name}</div>
                          <div className="text-sm text-gray-500">{training.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm">{training.courseCode}</td>
                    <td className="p-4">{training.categoryName}</td>
                    <td className="p-4">
                      <div>
                        ${training.price}
                        {training.discount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            -{training.discount}%
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {training.currentTrainees}/{training.maxTrainees}
                    </td>
                    <td className="p-4">{training.modules}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(training.status)}>{training.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteTraining(training.id)}>
                          <Trash2 className="h-4 w-4" />
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
    </div>
  )
}
