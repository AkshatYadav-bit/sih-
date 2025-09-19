import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "success" | "gradient";
  clickable?: boolean;
  onClick?: () => void;
}

export function DashboardCard({ 
  title, 
  children, 
  className, 
  variant = "default",
  clickable = false,
  onClick 
}: DashboardCardProps) {
  const variantStyles = {
    default: "bg-card hover:bg-card-hover",
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-gradient-success text-success-foreground",
    gradient: "bg-gradient-card"
  };

  return (
    <Card 
      className={cn(
        "p-4 border shadow-card transition-all duration-200",
        variantStyles[variant],
        clickable && "cursor-pointer hover:shadow-button hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      {title && (
        <h3 className="font-semibold mb-3 text-sm text-current opacity-90">
          {title}
        </h3>
      )}
      {children}
    </Card>
  );
}