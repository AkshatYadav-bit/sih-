import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Clock, Users, Zap, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardCard } from "@/components/DashboardCard";
import { cn } from "@/lib/utils";

interface Quest {
  id: string;
  title: string;
  description: string;
  story: string;
  difficulty: "easy" | "medium" | "hard";
  progress: number;
  total: number;
  reward: string;
  xpReward: number;
  timeEstimate: string;
  category: "solo" | "team" | "community";
  status: "available" | "in_progress" | "completed";
  requirements: string[];
}

const mockQuests: Quest[] = [
  {
    id: "1",
    title: "Repair the Solar Car",
    description: "Help Maya fix her solar-powered car by solving motion and force problems",
    story: "Maya's solar car broke down during the school science fair. She needs your help to understand the physics behind motion to get it running again!",
    difficulty: "medium",
    progress: 1,
    total: 3,
    reward: "Physics Badge + Solar Car Avatar",
    xpReward: 150,
    timeEstimate: "15-20 min",
    category: "solo",
    status: "in_progress",
    requirements: ["Complete Forces: Lesson 1", "Solve 3 motion problems"]
  },
  {
    id: "2",
    title: "Master Fractions",
    description: "Complete all fraction lessons to unlock the Math Wizard badge",
    story: "The kingdom of Numbers is in chaos! Fractions are scattered everywhere. Only a true Math Wizard can restore order by mastering all fraction operations.",
    difficulty: "easy",
    progress: 4,
    total: 6,
    reward: "Math Wizard Badge + Special Crown",
    xpReward: 200,
    timeEstimate: "25-30 min",
    category: "solo",
    status: "in_progress",
    requirements: ["Complete all 6 fraction lessons", "Score 90%+ on final quiz"]
  },
  {
    id: "3",
    title: "Code the Robot Helper",
    description: "Work with your team to program a virtual robot using basic algorithms",
    story: "The school cafeteria robot is malfunctioning! Team up with classmates to write simple algorithms that will help it serve lunch properly.",
    difficulty: "hard", 
    progress: 0,
    total: 5,
    reward: "Coding Champion Badge + Robot Pet",
    xpReward: 300,
    timeEstimate: "45-60 min",
    category: "team",
    status: "available",
    requirements: ["Form a team of 3-4 students", "Complete Algorithm Basics", "Pass teamwork challenge"]
  },
  {
    id: "4",
    title: "Energy Detective",
    description: "Investigate energy usage around your school and home",
    story: "Strange things are happening with the school's electricity! Put on your detective hat and investigate different forms of energy to solve the mystery.",
    difficulty: "medium",
    progress: 0,
    total: 4,
    reward: "Energy Expert Badge + Detective Hat",
    xpReward: 180,
    timeEstimate: "30-35 min",
    category: "community",
    status: "available", 
    requirements: ["Complete Energy: Lessons 1-2", "Submit real-world observations", "Help 2 classmates"]
  },
  {
    id: "5",
    title: "Chemistry Lab Adventure",
    description: "Conduct virtual experiments to understand chemical reactions",
    story: "Welcome to Professor Smith's virtual chemistry lab! Mix compounds, observe reactions, and discover the magic of chemistry through safe virtual experiments.",
    difficulty: "medium",
    progress: 0,
    total: 6,
    reward: "Chemistry Explorer Badge + Lab Coat",
    xpReward: 220,
    timeEstimate: "40-50 min",
    category: "solo",
    status: "available",
    requirements: ["Complete Basic Chemistry unit", "Conduct 6 virtual experiments", "Score 85%+ on safety quiz"]
  }
];

export default function Quests() {
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "solo" | "team" | "community">("all");

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "easy": return "text-success bg-success/10";
      case "medium": return "text-accent bg-accent/10";
      case "hard": return "text-destructive bg-destructive/10";
    }
  };

  const getCategoryIcon = (category: Quest["category"]) => {
    switch (category) {
      case "solo": return "🎯";
      case "team": return "👥";
      case "community": return "🌟";
    }
  };

  const getStatusIcon = (status: Quest["status"]) => {
    switch (status) {
      case "available": return <Play className="text-primary" size={16} />;
      case "in_progress": return <Clock className="text-accent" size={16} />;
      case "completed": return <CheckCircle className="text-success" size={16} />;
    }
  };

  const filteredQuests = filter === "all" ? mockQuests : mockQuests.filter(quest => quest.category === filter);
  const selectedQuestData = selectedQuest ? mockQuests.find(q => q.id === selectedQuest) : null;

  const handleStartQuest = (questId: string) => {
    // For now, navigate to lesson page - in real app would navigate to quest-specific content
    navigate("/lesson/1");
  };

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
          
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Award className="text-accent" size={24} />
            Quests & Adventures
          </h1>
          
          <div className="text-sm text-muted-foreground">
            {mockQuests.filter(q => q.status === "completed").length} / {mockQuests.length} Complete
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <DashboardCard className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {mockQuests.filter(q => q.status === "in_progress").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Quests</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {mockQuests.filter(q => q.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {mockQuests.reduce((sum, q) => sum + q.xpReward, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total XP Available</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <div className="text-2xl font-bold text-level mb-1">
              {mockQuests.filter(q => q.category === "team").length}
            </div>
            <div className="text-sm text-muted-foreground">Team Challenges</div>
          </DashboardCard>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: "all", label: "All Quests", icon: "🎯" },
            { key: "solo", label: "Solo Adventures", icon: "🎯" },
            { key: "team", label: "Team Challenges", icon: "👥" },
            { key: "community", label: "Community Projects", icon: "🌟" }
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
          {/* Quests List */}
          <div className="space-y-4">
            {filteredQuests.map((quest) => (
              <DashboardCard
                key={quest.id}
                clickable
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  selectedQuest === quest.id && "ring-2 ring-primary/50"
                )}
                onClick={() => setSelectedQuest(quest.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{getCategoryIcon(quest.category)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold truncate">{quest.title}</h3>
                      {getStatusIcon(quest.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {quest.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className={cn("px-2 py-1 rounded-full", getDifficultyColor(quest.difficulty))}>
                        {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {quest.timeEstimate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap size={12} />
                        {quest.xpReward} XP
                      </span>
                    </div>
                    
                    {quest.status === "in_progress" && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{quest.progress}/{quest.total}</span>
                        </div>
                        <Progress value={(quest.progress / quest.total) * 100} className="h-2" />
                      </div>
                    )}
                    
                    {quest.status === "completed" && (
                      <div className="flex items-center gap-2 text-success text-sm">
                        <CheckCircle size={16} />
                        <span>Quest Completed!</span>
                      </div>
                    )}
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>

          {/* Quest Detail Panel */}
          <div className="lg:sticky lg:top-4">
            {selectedQuestData ? (
              <DashboardCard>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{getCategoryIcon(selectedQuestData.category)}</div>
                    <h2 className="text-xl font-bold mb-2">{selectedQuestData.title}</h2>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span className={cn("px-3 py-1 rounded-full", getDifficultyColor(selectedQuestData.difficulty))}>
                        {selectedQuestData.difficulty.charAt(0).toUpperCase() + selectedQuestData.difficulty.slice(1)}
                      </span>
                      <span>{selectedQuestData.timeEstimate}</span>
                      <span>{selectedQuestData.xpReward} XP</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Story</h3>
                    <p className="text-sm text-muted-foreground">{selectedQuestData.story}</p>
                  </div>

                  {selectedQuestData.status === "in_progress" && (
                    <div>
                      <h3 className="font-semibold mb-2">Progress</h3>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Steps completed</span>
                        <span>{selectedQuestData.progress}/{selectedQuestData.total}</span>
                      </div>
                      <Progress value={(selectedQuestData.progress / selectedQuestData.total) * 100} className="h-3" />
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <ul className="space-y-1">
                      {selectedQuestData.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary/50" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4">
                    <h3 className="font-semibold text-accent mb-2">Rewards</h3>
                    <p className="text-sm">{selectedQuestData.reward}</p>
                    <div className="flex items-center gap-1 mt-2 text-accent">
                      <Zap size={16} />
                      <span className="font-bold">{selectedQuestData.xpReward} XP</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {selectedQuestData.status === "available" && (
                      <Button 
                        size="lg" 
                        className="w-full"
                        onClick={() => handleStartQuest(selectedQuestData.id)}
                      >
                        <Play className="mr-2" size={16} />
                        Start Quest
                      </Button>
                    )}
                    
                    {selectedQuestData.status === "in_progress" && (
                      <Button 
                        size="lg" 
                        className="w-full"
                        onClick={() => handleStartQuest(selectedQuestData.id)}
                      >
                        Continue Quest
                      </Button>
                    )}
                    
                    {selectedQuestData.status === "completed" && (
                      <Button variant="outline" size="lg" className="w-full">
                        <Award className="mr-2" size={16} />
                        View Rewards
                      </Button>
                    )}
                    
                    {selectedQuestData.category === "team" && (
                      <Button variant="outline" size="lg" className="w-full">
                        <Users className="mr-2" size={16} />
                        Find Team Members
                      </Button>
                    )}
                  </div>
                </div>
              </DashboardCard>
            ) : (
              <DashboardCard className="text-center py-12">
                <Award className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-lg font-semibold mb-2">Select a Quest</h3>
                <p className="text-muted-foreground">
                  Choose a quest to see the full story and requirements.
                </p>
              </DashboardCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}