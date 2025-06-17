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

interface Project {
  id: string
  name: string
  description: string
  image: string
  type: "free" | "paid"
  mentorName: string
  mentorAddress: string
  trainingsCount: number
  studentsCount: number
  status: "active" | "inactive"
  createdAt: string
}

export default function ProjectCreationPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Professional Makeup Mastery",
      description: "Complete professional makeup training program",
      image: "/placeholder.svg?height=200&width=300",
      type: "paid",
      mentorName: "Sarah Johnson",
      mentorAddress: "123 Beauty St, New York, NY",
      trainingsCount: 5,
      studentsCount: 45,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Basic Hair Styling",
      description: "Fundamental hair styling techniques for beginners",
      image: "/placeholder.svg?height=200&width=300",
      type: "free",
      mentorName: "Michael Chen",
      mentorAddress: "456 Style Ave, Los Angeles, CA",
      trainingsCount: 3,
      studentsCount: 78,
      status: "active",
      createdAt: "2024-02-10",
    },
  ])

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: "",
    type: "free" as "free" | "paid",
    mentorName: "",
    mentorAddress: "",
  })

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.mentorName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || project.type === filterType
    return matchesSearch && matchesType
  })

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      trainingsCount: 0,
      studentsCount: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setProjects([...projects, project])
    setNewProject({
      name: "",
      description: "",
      image: "",
      type: "free",
      mentorName: "",
      mentorAddress: "",
    })
    toast({
      title: "Project created",
      description: `${newProject.name} has been created successfully.`,
    })
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId))
    toast({
      title: "Project deleted",
      description: "Project has been deleted successfully.",
    })
  }

  const exportProjects = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Description,Type,Mentor,Students,Trainings,Status\n" +
      filteredProjects
        .map(
          (p) =>
            `"${p.name}","${p.description}","${p.type}","${p.mentorName}",${p.studentsCount},${p.trainingsCount},"${p.status}"`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "projects.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Project Creation</h1>
          <p className="text-deep-purple">Manage training projects and programs</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={exportProjects}
            className="border-mustard text-mustard hover:bg-mustard hover:text-ivory"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-mustard hover:bg-mustard/90 text-ivory">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-ivory border-mustard/20">
              <DialogHeader>
                <DialogTitle className="text-charcoal">Create New Project</DialogTitle>
                <DialogDescription className="text-deep-purple">Set up a new training project</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-charcoal">Project Name</label>
                  <Input
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Enter project name"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Description</label>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Enter project description"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Image URL</label>
                  <Input
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    placeholder="Enter image URL"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Project Type</label>
                  <Select
                    value={newProject.type}
                    onValueChange={(value: "free" | "paid") => setNewProject({ ...newProject, type: value })}
                  >
                    <SelectTrigger className="border-mustard/20 focus:border-mustard">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-ivory border-mustard/20">
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Mentor Name</label>
                  <Input
                    value={newProject.mentorName}
                    onChange={(e) => setNewProject({ ...newProject, mentorName: e.target.value })}
                    placeholder="Enter mentor name"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal">Mentor Address</label>
                  <Textarea
                    value={newProject.mentorAddress}
                    onChange={(e) => setNewProject({ ...newProject, mentorAddress: e.target.value })}
                    placeholder="Enter mentor address"
                    className="border-mustard/20 focus:border-mustard"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateProject} className="bg-mustard hover:bg-mustard/90 text-ivory">
                  Create Project
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
            placeholder="Search projects..."
            className="pl-8 border-mustard/20 focus:border-mustard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] border-mustard/20 focus:border-mustard">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-ivory border-mustard/20">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Table */}
      <div className="bg-ivory border border-mustard/20 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-mustard/20">
              <TableHead className="text-charcoal font-semibold">Name</TableHead>
              <TableHead className="text-charcoal font-semibold">Description</TableHead>
              <TableHead className="text-charcoal font-semibold">Type</TableHead>
              <TableHead className="text-charcoal font-semibold">Mentor</TableHead>
              <TableHead className="text-charcoal font-semibold">Students</TableHead>
              <TableHead className="text-charcoal font-semibold">Trainings</TableHead>
              <TableHead className="text-charcoal font-semibold">Status</TableHead>
              <TableHead className="text-charcoal font-semibold">Created</TableHead>
              <TableHead className="text-charcoal font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} className="border-mustard/10 hover:bg-mustard/5">
                <TableCell className="font-medium text-charcoal">{project.name}</TableCell>
                <TableCell className="text-deep-purple max-w-xs truncate">{project.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={project.type === "paid" ? "default" : "secondary"}
                    className={project.type === "paid" ? "bg-mustard text-ivory" : "bg-deep-purple text-ivory"}
                  >
                    {project.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-deep-purple">{project.mentorName}</TableCell>
                <TableCell className="text-charcoal">{project.studentsCount}</TableCell>
                <TableCell className="text-charcoal">{project.trainingsCount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-mustard text-mustard">
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-deep-purple">{project.createdAt}</TableCell>
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
                      onClick={() => handleDeleteProject(project.id)}
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
