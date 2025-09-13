import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User } from "lucide-react";

export interface AttendanceRecord {
  id: string;
  name: string;
  time: string;
  status: 'on-time' | 'late' | 'early';
  avatar?: string;
}

interface AttendanceLogProps {
  records: AttendanceRecord[];
}

export const AttendanceLog = ({ records }: AttendanceLogProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'bg-success text-success-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'early':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'On Time';
      case 'late':
        return 'Late';
      case 'early':
        return 'Early';
      default:
        return status;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-card/90 border-border/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Today's Attendance</h3>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {records.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No attendance records today</p>
          </div>
        ) : (
          records.map((record) => (
            <div 
              key={record.id} 
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50 hover:bg-background/70 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={record.avatar} alt={record.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {record.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{record.name}</p>
                  <p className="text-sm text-muted-foreground">{record.time}</p>
                </div>
              </div>
              
              <Badge className={getStatusColor(record.status)}>
                {getStatusLabel(record.status)}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};