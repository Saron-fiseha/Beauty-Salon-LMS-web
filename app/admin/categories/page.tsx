"use client"

import { useState } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Search, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Category {
  id: string
  name: string
  description: string
  image: string
  level: "beginner" | "intermediate" | "advanced"
  trainingsCount: number
  status: "active" | "inactive"
  createdAt: string
}

export default function TrainingCategoriesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Makeup Artistry",
      description: "Professional makeup techniques and application",
      image: "/placeholder.svg?height=200&width=300",
      level: "intermediate",
      trainingsCount: 8,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Hair Styling",
      description: "Hair cutting, styling, and treatment techniques",
      image: "/placeholder.svg?height=200&width=300",
      level: "beginner",
      trainingsCount: 6,
      status: "active",
      createdAt: "2024-02-10",
    },
    {
      id: "3",
      name: "Skincare & Facial",
      description: "Advanced skincare treatments and facial procedures",
      image: "/placeholder.svg?height=200&width=300",
      level: "advanced",
      trainingsCount: 4,
      status: "active",
      createdAt: "2024-03-05",
    },
  ])

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
  })

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = filterLevel === "all" || category.level === filterLevel
    return matchesSearch && matchesLevel
  })

  const handleCreateCategory = () => {
    const category: Category = {
      id: Date.now().toString(),
      ...newCategory,
      trainingsCount: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setCategories([...categories, category])
    setNewCategory({
      name: "",
      description: "",
      image: "",
      level: "beginner",
    })
    toast({
      title: "Category created",
      description: `${newCategory.name} category has been created successfully.`,
    })
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId))
    toast({
      title: "Category deleted",
      description: "Category has been deleted successfully.",
    })
  }

  const exportCategories = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Description,Level,Trainings,Status,Created\n" +
      filteredCategories
        .map((c) => `"${c.name}","${c.description}","${c.level}",${c.trainingsCount},"${c.status}","${c.createdAt}"`)
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "categories.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-mustard/20 text-mustard border-mustard/30"
      case "advanced":
        return "bg-deep-purple/20 text-deep-purple border-deep-purple/30"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Training Categories</h1>
          <p className="text-deep-purple">Manage beauty salon training categories</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={exportCategories}
            className="border-mustard text-mustard hover:bg-mustard hover:text-ivory"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-mustard hover:bg-mustard/90 text-ivory">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-ivory border-mustard/20">
              <DialogHeader>
                <DialogTitle className="text-charcoal">Create New Category</DialogTitle>
                <DialogDescription className="text-deep-purple">Add a new training category</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-charcoal">Category Name</label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Enter category name"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Description</label>
                  <Textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Enter category description"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Image URL</label>
                  <Input
                    value={newCategory.image}
                    onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                    placeholder="Enter image URL"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Trainer Level</label>
                  <Select
                    value={newCategory.level}
                    onValueChange={(value: "beginner" | "intermediate" | "advanced") =>
                      setNewCategory({ ...newCategory, level: value })
                    }
                  >
                    <SelectTrigger className="border-mustard/20 focus:border-mustard">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-ivory border-mustard/20">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateCategory} className="bg-mustard hover:bg-mustard/90 text-ivory">
                  Create Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-deep-purple" />
          <Input
            placeholder="Search categories..."
            className="pl-8 border-mustard/20 focus:border-mustard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-[180px] border-mustard/20 focus:border-mustard">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent className="bg-ivory border-mustard/20">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories Table */}
      <div className="bg-ivory border border-mustard/20 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-mustard/20">
              <TableHead className="text-charcoal font-semibold">Image</TableHead>
              <TableHead className="text-charcoal font-semibold">Name</TableHead>
              <TableHead className="text-charcoal font-semibold">Description</TableHead>
              <TableHead className="text-charcoal font-semibold">Level</TableHead>
              <TableHead className="text-charcoal font-semibold">Trainings</TableHead>
              <TableHead className="text-charcoal font-semibold">Status</TableHead>
              <TableHead className="text-charcoal font-semibold">Created</TableHead>
              <TableHead className="text-charcoal font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id} className="border-mustard/10 hover:bg-mustard/5">
                <TableCell>
                  <div className="relative h-12 w-12">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-charcoal">{category.name}</TableCell>
                <TableCell className="text-deep-purple max-w-xs truncate">{category.description}</TableCell>
                <TableCell>
                  <Badge className={getLevelColor(category.level)}>{category.level}</Badge>
                </TableCell>
                <TableCell className="text-charcoal">{category.trainingsCount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-mustard text-mustard">
                    {category.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-deep-purple">{category.createdAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-mustard/20 text-mustard hover:bg-mustard hover:text-ivory"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
