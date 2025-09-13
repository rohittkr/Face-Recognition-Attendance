import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

interface UserManagementProps {
  employees: Employee[];
  onAddEmployee: (employee: Omit<Employee, 'id' | 'status'>) => void;
  onDeleteEmployee: (id: string) => void;
}

export const UserManagement = ({ employees, onAddEmployee, onDeleteEmployee }: UserManagementProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.department) {
      onAddEmployee(formData);
      setFormData({ name: '', email: '', department: '' });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-card/90 border-border/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Employee Management</h3>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter employee name"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Enter department"
                  className="bg-background border-border"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Add Employee</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {employees.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <UserPlus className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No employees registered</p>
          </div>
        ) : (
          employees.map((employee) => (
            <div 
              key={employee.id} 
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50 hover:bg-background/70 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.email}</p>
                  <p className="text-xs text-muted-foreground">{employee.department}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                  {employee.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEmployee(employee.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};