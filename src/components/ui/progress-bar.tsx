import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "w-full bg-muted rounded-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
      },
      variant: {
        default: "",
        xp: "",
        success: "",
        warning: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const progressFillVariants = cva(
  "h-full transition-all duration-500 ease-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary",
        xp: "bg-gradient-xp",
        success: "bg-gradient-success",
        warning: "bg-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ProgressBarProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  size, 
  variant, 
  showLabel = false, 
  label,
  className,
  ...props 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="space-y-1">
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{value}/{max}</span>
        </div>
      )}
      <div className={cn(progressVariants({ size, variant }), className)} {...props}>
        <div 
          className={cn(progressFillVariants({ variant }))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}