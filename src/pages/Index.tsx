import { useState, useEffect } from "react";
import { CameraView } from "@/components/CameraView";
import { AttendanceStats } from "@/components/AttendanceStats";
import { AttendanceLog, AttendanceRecord } from "@/components/AttendanceLog";
import { UserManagement, Employee } from "@/components/UserManagement";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, BarChart3, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      status: 'active'
    }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      name: 'John Doe',
      time: '09:15 AM',
      status: 'on-time'
    }
  ]);

  const [isRecognizing, setIsRecognizing] = useState(false);

  const handleImageCapture = async (imageData: string) => {
    setIsRecognizing(true);
    
    // Simulate face recognition processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate recognition success
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        name: 'Recognized User',
        time: timeString,
        status: now.getHours() <= 9 ? 'on-time' : 'late'
      };
      
      setAttendanceRecords(prev => [newRecord, ...prev]);
      
      toast({
        title: "Attendance Marked",
        description: `Welcome, ${newRecord.name}! Marked as ${newRecord.status}.`,
      });
      
    } catch (error) {
      toast({
        title: "Recognition Failed",
        description: "Could not recognize face. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleAddEmployee = (employeeData: Omit<Employee, 'id' | 'status'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
      status: 'active'
    };
    setEmployees(prev => [...prev, newEmployee]);
    
    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been added to the system.`,
    });
  };

  const handleDeleteEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    
    toast({
      title: "Employee Removed",
      description: `${employee?.name} has been removed from the system.`,
    });
  };

  const stats = {
    totalEmployees: employees.length,
    presentToday: attendanceRecords.length,
    lateArrivals: attendanceRecords.filter(r => r.status === 'late').length,
    onTimeArrivals: attendanceRecords.filter(r => r.status === 'on-time').length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-glow rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  FaceAttend Pro
                </h1>
                <p className="text-sm text-muted-foreground">Privacy-First Attendance System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Offline Mode - Secure & Private
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceStats {...stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CameraView 
                onCapture={handleImageCapture}
                isRecognizing={isRecognizing}
              />
              <AttendanceLog records={attendanceRecords} />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AttendanceStats {...stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttendanceLog records={attendanceRecords} />
              <div className="text-center py-20 text-muted-foreground">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Detailed analytics coming soon...</p>
                <p className="text-sm">Track patterns, generate reports, and analyze attendance trends.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement 
              employees={employees}
              onAddEmployee={handleAddEmployee}
              onDeleteEmployee={handleDeleteEmployee}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
