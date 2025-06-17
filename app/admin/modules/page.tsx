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
import { Plus, Edit, Trash2, Search, Download, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Module {
  id: string
  name: string
  description: string
  moduleCode: string
  programId: string
  programName: string
  videoId: string
  duration: number // in minutes
  order: number
  status: "active" | "inactive" | "draft"
  createdAt: string
}

export default function ModulesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterProgram, setFilterProgram] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      name: "Introduction to Color Theory",
      description: "Understanding color wheel and complementary colors for makeup",
      moduleCode: "MKP-001-01",
      programId: "1",
      programName: "Advanced Makeup Techniques",
      videoId: "dQw4w9WgXcQ",
      duration: 45,
      order: 1,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Foundation Application Techniques",
      description: "Professional foundation application for different skin types",
      moduleCode: "MKP-001-02",
      programId: "1",
      programName: "Advanced Makeup Techniques",
      videoId: "dQw4w9WgXcQ",
      duration: 60,
      order: 2,
      status: "active",
      createdAt: "2024-01-16",
    },
    {
      id: "3",
      name: "Basic Hair Cutting Techniques",
      description: "Fundamental hair cutting methods and tools",
      moduleCode: "HST-002-01",
      programId: "2",
      programName: "Hair Styling Fundamentals",
      videoId: "dQw4w9WgXcQ",
      duration: 90,
      order: 1,
      status: "active",
      createdAt: "2024-02-10",
    },
  ])

  const [newModule, setNewModule] = useState({
    name: "",
    description: "",
    moduleCode: "",
    programId: "",
    videoId: "",
    duration: 0,
    order: 1,
  })

  const programs = [
    { id: "1", name: "Advanced Makeup Techniques" },
    { id: "2", name: "Hair Styling Fundamentals" },
    { id: "3", name: "Skincare Specialist Certification" },
  ]

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.moduleCode.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProgram = filterProgram === "all" || module.programId === filterProgram
    const matchesStatus = filterStatus === "all" || module.status === filterStatus
    return matchesSearch && matchesProgram && matchesStatus
  })

  const handleCreateModule = () => {
    const programName = programs.find((p) => p.id === newModule.programId)?.name || ""
    const module: Module = {
      id: Date.now().toString(),
      ...newModule,
      programName,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setModules([...modules, module])
    setNewModule({
      name: "",
      description: "",
      moduleCode: "",
      programId: "",
      videoId: "",
      duration: 0,
      order: 1,
    })
    toast({
      title: "Module created",
      description: `${newModule.name} has been created successfully.`,
    })
  }

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter((module) => module.id !== moduleId))
    toast({
      title: "Module deleted",
      description: "Module has been deleted successfully.",
    })
  }

  const exportModules = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Code,Program,Duration,Order,Status,VideoID\n" +
      filteredModules
        .map(
          (m) =>
            `"${m.name}","${m.moduleCode}","${m.programName}",${m.duration},${m.order},"${m.status}","${m.videoId}"`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "modules.csv")
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const extractVideoId = (url: string) => {
    // Extract YouTube video ID from various URL formats
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : url
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modules Management</h1>
          <p className="text-gray-600">Manage learning modules with YouTube video integration</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportModules}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Module</DialogTitle>
                <DialogDescription>Add a new learning module with video content</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Module Name</label>
                    <Input
                      value={newModule.name}
                      onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                      placeholder="Enter module name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Module Code</label>
                    <Input
                      value={newModule.moduleCode}
                      onChange={(e) => setNewModule({ ...newModule, moduleCode: e.target.value })}
                      placeholder="e.g., MKP-001-01"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newModule.description}
                    onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                    placeholder="Enter module description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Training Program</label>
                  <Select
                    value={newModule.programId}
                    onValueChange={(value) => setNewModule({ ...newModule, programId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">YouTube Video URL/ID</label>
                  <Input
                    value={newModule.videoId}
                    onChange={(e) => setNewModule({ ...newModule, videoId: extractVideoId(e.target.value) })}
                    placeholder="Enter YouTube URL or Video ID"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Input
                      type="number"
                      value={newModule.duration}
                      onChange={(e) => setNewModule({ ...newModule, duration: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Order</label>
                    <Input
                      type="number"
                      value={newModule.order}
                      onChange={(e) => setNewModule({ ...newModule, order: Number(e.target.value) })}
                      placeholder="1"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateModule}>Create Module</Button>
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
            placeholder="Search modules..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterProgram} onValueChange={setFilterProgram}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {programs.map((program) => (
              <SelectItem key={program.id} value={program.id}>
                {program.name}
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

      {/* Modules Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Modules</CardTitle>
          <CardDescription>Complete list of learning modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Module</th>
                  <th className="text-left p-4">Code</th>
                  <th className="text-left p-4">Program</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Video</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredModules.map((module) => (
                  <tr key={module.id} className="border-b">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{module.name}</div>
                        <div className="text-sm text-gray-500">{module.description.substring(0, 50)}...</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm">{module.moduleCode}</td>
                    <td className="p-4">{module.programName}</td>
                    <td className="p-4">{formatDuration(module.duration)}</td>
                    <td className="p-4">#{module.order}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Play className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-mono">{module.videoId}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteModule(module.id)}>
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
