import { Card } from "@/components/ui/card";
import { Users, Clock, CheckCircle, Calendar } from "lucide-react";

interface AttendanceStatsProps {
  totalEmployees: number;
  presentToday: number;
  lateArrivals: number;
  onTimeArrivals: number;
}

export const AttendanceStats = ({ 
  totalEmployees, 
  presentToday, 
  lateArrivals, 
  onTimeArrivals 
}: AttendanceStatsProps) => {
  const attendanceRate = totalEmployees > 0 ? (presentToday / totalEmployees) * 100 : 0;
  
  const stats = [
    {
      label: "Total Present",
      value: presentToday,
      total: totalEmployees,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "On Time",
      value: onTimeArrivals,
      total: presentToday,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      label: "Late Arrivals",
      value: lateArrivals,
      total: presentToday,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      label: "Attendance Rate",
      value: `${attendanceRate.toFixed(1)}%`,
      total: null,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-gradient-to-br from-card via-card to-card/90 border-border/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                {stat.total !== null && (
                  <p className="text-sm text-muted-foreground">
                    / {stat.total}
                  </p>
                )}
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};