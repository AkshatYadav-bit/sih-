import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Star, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  subject: "math" | "science" | "computer" | "physics";
  status: "locked" | "available" | "completed" | "mastered";
  progress: number;
}

const mockSkills: Skill[] = [
  { id: "1", name: "Basic Math", subject: "math", status: "mastered", progress: 100 },
  { id: "2", name: "Fractions", subject: "math", status: "completed", progress: 100 },
  { id: "3", name: "Forces", subject: "physics", status: "available", progress: 65 },
  { id: "4", name: "Energy", subject: "physics", status: "locked", progress: 0 },
  { id: "5", name: "Algorithms", subject: "computer", status: "locked", progress: 0 },
];

export function SkillTreePreview() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getSubjectColor = (subject: Skill["subject"]) => {
    const colors = {
      math: "bg-math",
      science: "bg-science", 
      computer: "bg-computer",
      physics: "bg-physics"
    };
    return colors[subject];
  };

  const getStatusIcon = (status: Skill["status"]) => {
    switch (status) {
      case "mastered":
        return <Star className="fill-current text-level" size={16} />;
      case "completed":
        return <CheckCircle className="text-success" size={16} />;
      case "available":
        return <Circle className="text-primary" size={16} />;
      case "locked":
        return <Lock className="text-muted-foreground" size={16} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Learning Path</h3>
        <button 
          className="text-sm text-primary hover:underline"
          onClick={() => navigate("/skills")}
        >
          View All
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {mockSkills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              "flex-shrink-0 w-20 h-20 rounded-full border-4 cursor-pointer transition-all duration-200",
              "flex flex-col items-center justify-center text-xs font-medium",
              skill.status === "locked" 
                ? "border-muted bg-muted text-muted-foreground" 
                : "border-white shadow-card hover:shadow-button hover:scale-105",
              getSubjectColor(skill.subject),
              skill.status !== "locked" && "text-white",
              selectedSkill === skill.id && "ring-4 ring-primary/30"
            )}
            onClick={() => {
              setSelectedSkill(skill.id);
              if (skill.status === "available") {
                navigate("/lesson/1");
              }
            }}
          >
            <div className="mb-1">
              {getStatusIcon(skill.status)}
            </div>
            <span className="text-center leading-tight px-1">
              {skill.name}
            </span>
            {skill.status === "available" && skill.progress > 0 && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}