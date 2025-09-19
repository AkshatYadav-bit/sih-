import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Star, CheckCircle, Circle, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelBadge } from "@/components/ui/level-badge";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  description: string;
  subject: "math" | "science" | "computer" | "physics";
  status: "locked" | "available" | "completed" | "mastered";
  progress: number;
  lessons: number;
  completedLessons: number;
  xpReward: number;
  prerequisites: string[];
}

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "Basic Math",
    description: "Learn fundamental mathematical operations and number sense",
    subject: "math",
    status: "mastered",
    progress: 100,
    lessons: 8,
    completedLessons: 8,
    xpReward: 200,
    prerequisites: []
  },
  {
    id: "2",
    name: "Fractions",
    description: "Understanding parts of a whole and fraction operations",
    subject: "math",
    status: "completed",
    progress: 100,
    lessons: 12,
    completedLessons: 12,
    xpReward: 300,
    prerequisites: ["1"]
  },
  {
    id: "3",
    name: "Forces",
    description: "Explore push, pull, and the laws of motion",
    subject: "physics",
    status: "available",
    progress: 65,
    lessons: 10,
    completedLessons: 6,
    xpReward: 350,
    prerequisites: ["1"]
  },
  {
    id: "4",
    name: "Energy",
    description: "Discover kinetic, potential, and conservation of energy",
    subject: "physics",
    status: "locked",
    progress: 0,
    lessons: 15,
    completedLessons: 0,
    xpReward: 400,
    prerequisites: ["3"]
  },
  {
    id: "5",
    name: "Algorithms",
    description: "Learn step-by-step problem solving with computers",
    subject: "computer",
    status: "locked",
    progress: 0,
    lessons: 20,
    completedLessons: 0,
    xpReward: 500,
    prerequisites: ["2"]
  },
  {
    id: "6",
    name: "Geometry",
    description: "Shapes, angles, and spatial relationships",
    subject: "math",
    status: "available",
    progress: 25,
    lessons: 14,
    completedLessons: 3,
    xpReward: 350,
    prerequisites: ["2"]
  }
];

export default function Skills() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "math" | "science" | "computer" | "physics">("all");

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
        return <Star className="fill-current text-level" size={20} />;
      case "completed":
        return <CheckCircle className="text-success" size={20} />;
      case "available":
        return <Circle className="text-primary" size={20} />;
      case "locked":
        return <Lock className="text-muted-foreground" size={20} />;
    }
  };

  const getStatusText = (status: Skill["status"]) => {
    switch (status) {
      case "mastered":
        return "Mastered";
      case "completed":
        return "Completed";
      case "available":
        return "Available";
      case "locked":
        return "Locked";
    }
  };

  const filteredSkills = filter === "all" ? mockSkills : mockSkills.filter(skill => skill.subject === filter);

  const selectedSkillData = selectedSkill ? mockSkills.find(s => s.id === selectedSkill) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 shadow-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          
          <h1 className="text-xl font-bold">Learning Path</h1>
          
          <LevelBadge level={12} />
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: "all", label: "All Subjects", icon: "🎯" },
            { key: "math", label: "Mathematics", icon: "🔢" },
            { key: "physics", label: "Physics", icon: "⚡" },
            { key: "computer", label: "Computer Science", icon: "💻" },
            { key: "science", label: "Science", icon: "🔬" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors",
                filter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Skills ({filteredSkills.length})</h2>
            
            <div className="grid gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={cn(
                    "bg-card rounded-xl p-4 shadow-card cursor-pointer transition-all duration-200 border-2",
                    skill.status === "locked" 
                      ? "border-muted opacity-60" 
                      : "border-transparent hover:border-primary/20 hover:shadow-button",
                    selectedSkill === skill.id && "border-primary shadow-button"
                  )}
                  onClick={() => setSelectedSkill(skill.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-white",
                      skill.status === "locked" ? "bg-muted" : getSubjectColor(skill.subject)
                    )}>
                      {getStatusIcon(skill.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">
                          {getStatusText(skill.status)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {skill.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{skill.completedLessons}/{skill.lessons} lessons</span>
                        <span>{skill.xpReward} XP</span>
                      </div>
                      
                      {skill.status !== "locked" && skill.progress > 0 && (
                        <Progress value={skill.progress} className="h-2" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Detail Panel */}
          <div className="lg:sticky lg:top-4">
            {selectedSkillData ? (
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-start gap-4 mb-6">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center text-white",
                    selectedSkillData.status === "locked" ? "bg-muted" : getSubjectColor(selectedSkillData.subject)
                  )}>
                    {getStatusIcon(selectedSkillData.status)}
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{selectedSkillData.name}</h2>
                    <p className="text-muted-foreground mb-3">{selectedSkillData.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {selectedSkillData.lessons} lessons
                      </span>
                      <span>{selectedSkillData.xpReward} XP total</span>
                    </div>
                  </div>
                </div>

                {selectedSkillData.status !== "locked" && selectedSkillData.progress > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{selectedSkillData.progress}%</span>
                    </div>
                    <Progress value={selectedSkillData.progress} className="h-3" />
                  </div>
                )}

                {selectedSkillData.prerequisites.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Prerequisites:</h3>
                    <div className="space-y-1">
                      {selectedSkillData.prerequisites.map(prereqId => {
                        const prereq = mockSkills.find(s => s.id === prereqId);
                        return prereq ? (
                          <div key={prereqId} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-success" size={14} />
                            <span>{prereq.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {selectedSkillData.status === "available" ? (
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => navigate("/lesson/1")}
                    >
                      <Play className="mr-2" size={16} />
                      {selectedSkillData.progress > 0 ? "Continue Learning" : "Start Learning"}
                    </Button>
                  ) : selectedSkillData.status === "completed" || selectedSkillData.status === "mastered" ? (
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full"
                      onClick={() => navigate("/lesson/1")}
                    >
                      <Play className="mr-2" size={16} />
                      Practice Again
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full" disabled>
                      <Lock className="mr-2" size={16} />
                      Complete Prerequisites First
                    </Button>
                  )}
                  
                  {selectedSkillData.status !== "locked" && (
                    <Button variant="outline" size="lg" className="w-full">
                      View All Lessons
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl p-8 shadow-card text-center">
                <BookOpen className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-semibold mb-2">Select a Skill</h3>
                <p className="text-muted-foreground">
                  Choose a skill from the left to see details and start learning.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}