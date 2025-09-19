import { MessageCircle } from "lucide-react";
import mascotImage from "@/assets/ai-bot-mascot.png";

interface AiBotAvatarProps {
  greeting?: string;
  size?: "sm" | "md" | "lg";
  showMessage?: boolean;
  className?: string;
}

export function AiBotAvatar({ 
  greeting = "Hi there! Ready to learn?", 
  size = "md", 
  showMessage = true,
  className = "" 
}: AiBotAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative animate-bounce-gentle`}>
        <img 
          src={mascotImage} 
          alt="STEM-Lingo AI Bot" 
          className="w-full h-full object-contain rounded-full shadow-glow"
        />
        {showMessage && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <MessageCircle size={10} className="text-primary-foreground" />
          </div>
        )}
      </div>
      {showMessage && size !== "sm" && (
        <div className="flex-1 max-w-xs">
          <div className="bg-card-hover border border-border rounded-lg px-3 py-2 shadow-card">
            <p className="text-sm text-foreground">{greeting}</p>
          </div>
        </div>
      )}
    </div>
  );
}