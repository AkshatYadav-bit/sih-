import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Target, Users, MessageSquare, Award, Zap } from "lucide-react";
import { AiBotAvatar } from "./AiBotAvatar";
import { ProgressBar } from "./ui/progress-bar";
import { LevelBadge } from "./ui/level-badge";
import { SkillTreePreview } from "./SkillTreePreview";
import { DashboardCard } from "./DashboardCard";
import { Button } from "./ui/button";

interface StudentData {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  dailyGoal: number;
  dailyProgress: number;
  streak: number;
  energy: number;
  lastLesson: {
    title: string;
    progress: number;
  };
}

// Mock student data
const studentData: StudentData = {
  name: "Anaya",
  level: 12,
  xp: 2350,
  xpToNext: 400,
  dailyGoal: 50,
  dailyProgress: 35,
  streak: 7,
  energy: 85,
  lastLesson: {
    title: "Net Force Basics",
    progress: 75
  }
};

const leaderboardData = [
  { name: "Rajat", xp: 2890, avatar: "👨" },
  { name: "Priya", xp: 2650, avatar: "👩" },
  { name: "Anaya", xp: 2350, avatar: "👧", isMe: true },
];

const quests = [
  {
    id: "1",
    title: "Repair the Solar Car",
    description: "Solve 3 motion puzzles",
    progress: 1,
    total: 3,
    reward: "50 XP + Physics Badge"
  },
  {
    id: "2", 
    title: "Master Fractions",
    description: "Complete all fraction lessons",
    progress: 4,
    total: 6,
    reward: "Math Wizard Badge"
  }
];

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("home");

  const xpProgress = (studentData.dailyProgress / studentData.dailyGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 shadow-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              STEM-Lingo
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <AiBotAvatar 
              greeting={`Hi ${studentData.name}! Ready to explore Forces today?`}
              size="sm"
              showMessage={false}
            />
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Daily Goal</div>
                <div className="text-sm font-medium">{studentData.dailyProgress}/{studentData.dailyGoal} XP</div>
              </div>
              <ProgressBar 
                value={studentData.dailyProgress} 
                max={studentData.dailyGoal}
                variant="xp"
                size="sm"
                className="w-20"
              />
            </div>
            
            <LevelBadge level={studentData.level} />
            
            <div className="flex items-center gap-1 text-streak font-bold">
              <Zap size={16} className="fill-current" />
              <span>{studentData.streak}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Continue Learning Card */}
        <DashboardCard variant="primary" clickable>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Continue Learning</h2>
              <p className="text-sm opacity-90 mb-2">{studentData.lastLesson.title}</p>
              <ProgressBar 
                value={studentData.lastLesson.progress} 
                variant="default"
                size="sm"
                className="w-48"
              />
            </div>
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              onClick={() => navigate("/lesson/1")}
            >
              <Play size={20} className="mr-2" />
              Continue
            </Button>
          </div>
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Goal */}
            <DashboardCard title="Today's Progress">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="text-primary" size={20} />
                  <span className="font-medium">Daily Goal: {studentData.dailyGoal} XP</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(xpProgress)}% complete
                </span>
              </div>
              <ProgressBar 
                value={studentData.dailyProgress} 
                max={studentData.dailyGoal}
                variant="xp"
              />
              <div className="mt-3 text-sm text-muted-foreground">
                {studentData.dailyGoal - studentData.dailyProgress} XP to go!
              </div>
            </DashboardCard>

            {/* Skill Tree */}
            <DashboardCard>
              <SkillTreePreview />
            </DashboardCard>

            {/* Quests */}
            <DashboardCard title="Active Quests">
              <div className="space-y-4">
                {quests.map((quest) => (
                  <div key={quest.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Award className="text-accent flex-shrink-0" size={20} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{quest.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
                      <ProgressBar 
                        value={quest.progress} 
                        max={quest.total}
                        size="sm"
                        variant="success"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        Reward: {quest.reward}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate("/quests")}
                    >
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <DashboardCard title="Top in Your School">
              <div className="space-y-3">
                {leaderboardData.map((student, index) => (
                  <div 
                    key={student.name}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      student.isMe ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-primary text-white text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-lg">{student.avatar}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{student.name}</div>
                      <div className="text-xs text-muted-foreground">{student.xp} XP</div>
                    </div>
                    {student.isMe && (
                      <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        You
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => navigate("/leaderboard")}
              >
                <Users size={14} className="mr-2" />
                View Full Leaderboard
              </Button>
            </DashboardCard>

            {/* Community */}
            <DashboardCard title="Community">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2">
                    <MessageSquare size={16} className="text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Help needed!</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        "How do I solve this force problem?"
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => navigate("/community")}
                      >
                        Answer & earn 10 XP
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 lg:hidden">
        <div className="flex justify-around">
          {[
            { id: "home", label: "Home", icon: "🏠", path: "/" },
            { id: "learn", label: "Learn", icon: "📚", path: "/skills" },
            { id: "quests", label: "Quests", icon: "🎯", path: "/quests" },
            { id: "community", label: "Community", icon: "👥", path: "/community" },
            { id: "profile", label: "Profile", icon: "👤", path: "/profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id);
                navigate(tab.path);
              }}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                selectedTab === tab.id ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}