
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
}: StatCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
