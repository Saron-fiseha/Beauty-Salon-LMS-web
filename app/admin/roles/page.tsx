"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  description: string
}

export default function RoleManagementPage() {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access",
      permissions: ["create", "read", "update", "delete", "manage_users", "manage_courses"],
      userCount: 2,
    },
    {
      id: "2",
      name: "Instructor",
      description: "Can manage courses and students",
      permissions: ["read", "update", "manage_courses", "view_students"],
      userCount: 8,
    },
    {
      id: "3",
      name: "Student",
      description: "Can access courses and profile",
      permissions: ["read", "update_profile"],
      userCount: 156,
    },
  ])

  const [permissions] = useState<Permission[]>([
    { id: "create", name: "Create", description: "Create new records" },
    { id: "read", name: "Read", description: "View records" },
    { id: "update", name: "Update", description: "Edit existing records" },
    { id: "delete", name: "Delete", description: "Remove records" },
    { id: "manage_users", name: "Manage Users", description: "User management" },
    { id: "manage_courses", name: "Manage Courses", description: "Course management" },
    { id: "view_students", name: "View Students", description: "Access student data" },
    { id: "update_profile", name: "Update Profile", description: "Edit own profile" },
  ])

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const handleCreateRole = () => {
    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
    }
    setRoles([...roles, role])
    setNewRole({ name: "", description: "", permissions: [] })
    toast({
      title: "Role created",
      description: `${newRole.name} role has been created successfully.`,
    })
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId))
    toast({
      title: "Role deleted",
      description: "Role has been deleted successfully.",
    })
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (editingRole) {
      const updatedPermissions = checked
        ? [...editingRole.permissions, permissionId]
        : editingRole.permissions.filter((p) => p !== permissionId)
      setEditingRole({ ...editingRole, permissions: updatedPermissions })
    } else {
      const updatedPermissions = checked
        ? [...newRole.permissions, permissionId]
        : newRole.permissions.filter((p) => p !== permissionId)
      setNewRole({ ...newRole, permissions: updatedPermissions })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600">Manage user roles and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role with specific permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Role Name</label>
                <Input
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Enter role description"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Permissions</label>
                <div className="grid grid-cols-2 gap-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={newRole.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                      />
                      <label htmlFor={permission.id} className="text-sm">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateRole}>Create Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {role.name}
                    <Badge variant="secondary">{role.userCount} users</Badge>
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteRole(role.id)}
                    disabled={role.name === "Admin"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-medium mb-2">Permissions:</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permissionId) => {
                    const permission = permissions.find((p) => p.id === permissionId)
                    return (
                      <Badge key={permissionId} variant="outline">
                        {permission?.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
