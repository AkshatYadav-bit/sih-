import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface LevelBadgeProps {
  level: number;
  className?: string;
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <div className={cn(
      "flex items-center gap-1 px-3 py-1 rounded-full bg-level text-accent-foreground font-bold text-sm shadow-button",
      className
    )}>
      <Star size={14} className="fill-current" />
      <span>{level}</span>
    </div>
  );
}